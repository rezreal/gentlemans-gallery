import {
  BoundingBox,
  DetectionType,
  loadmodel,
  processImage,
  PurifyDetection,
  PurifyMetadata,
  toPurifyDetections,
} from './PurifyModel';
import * as React from 'react';
import {ChangeEvent, Dispatch, MouseEvent, useEffect, useRef, useState} from 'react';
import {
  BehaviorSubject,
  delay,
  distinctUntilChanged,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  throttle,
  throttleTime
} from 'rxjs';

import {Cursor} from './Cursor';
import './MainComponent.css';
import {CoyoteDevice, pairDevice} from './Coyote';
import {ConfigMenu} from './ConfigMenu';
import {DEFAULT_SETTINGS, Settings} from './Settings';
import {RegionType, Rules} from './rules';
import {censorImage, loadImage, readAsDataUrl} from './censorImage';
import * as tf from '@tensorflow/tfjs';
import {XToysClient} from './xtoys';

import {
  EyePositionData,
  RelativeScreenCoordinates,
  TobiiClient,
  UserPresence
} from './TobiiClient';
import {SlideData} from "./GameState";

type Props = Record<string, never>


interface State extends Settings {
  readonly slides: readonly { images: readonly File[] }[];

  readonly currentSlide: number;
  readonly currentSlideData: SlideData[];

  readonly cursorPosition: { readonly x: number; readonly y: number };
  readonly cursorHint?: RegionType;
  readonly stats: {
    readonly points: number;
    readonly failures: number;
  };

  readonly phase: 'SETUP' | 'INGAME' | 'WON';
  readonly pauseUntil: number;
}

const DEFAULT_STATE: State = {
  ...DEFAULT_SETTINGS,
  slides: [],
  currentSlide: 0,
  currentSlideData: [],
  cursorPosition: {x: -1000, y: -1000},
  stats: {points: 0, failures: 0},
  phase: 'SETUP',
  pauseUntil: 0,
};

export const MainComponent: React.FC<Props> = (props: Props) => {

  const [state, setState] = useState<State>(DEFAULT_STATE);

  const gazeHits$ = useRef(new BehaviorSubject<DetectionType | undefined>(
    undefined
  ));
  const eyesTracked$ = useRef(new BehaviorSubject<boolean>(false));
  const presence$ = useRef(new BehaviorSubject<boolean>(false));
  const destroy$ = useRef(new Subject<unknown>());


  const xtoys = useRef<XToysClient | undefined>(undefined);
  const tobiiWs = useRef<TobiiClient | undefined>(undefined);
  let coyoteDevice: CoyoteDevice | undefined;

  let model: tf.GraphModel | undefined = undefined;

  const renderPane = useRef<HTMLImageElement>(null);
  const audioDing = useRef<HTMLAudioElement>(null);
  const audioMistake = useRef<HTMLAudioElement>(null);

  function forgetCoyote() {
    setState((prev) => ({
      ...prev,
      coyote: {...prev.coyote, pairedDeviceId: undefined},
    }));
  }

  async function startCoyote(): Promise<void> {
    const [coyoteState, newCoyoteDevice] = await pairDevice(
      (level) => {
        console.info(`Coyote at battery-level ${level}`);
      },
      ({powerA, powerB}) =>
        console.info(`Coyote at power-level a:${powerA} ${powerB})`),
      state.coyote.pairedDeviceId
    );
    setState((prev) => ({
      ...prev,
      coyote: {...prev.coyote, pairedDeviceId: newCoyoteDevice.id},
    }));
    coyoteDevice = newCoyoteDevice;
    await coyoteDevice.writePower({
      powerA: state.coyote.powerLevel,
      powerB: 7,
    });
  }

  function startWebGazer(): void {
    alert('FIXME IMPLEMENT: startWebGazer()');
    //TODO: fixme
    /*webgazer.setGazeListener(function(data, elapsedTime) {
      if (data == null) {
        return;
      }
      var xprediction = data.x; //these x coordinates are relative to the viewport
      var yprediction = data.y; //these y coordinates are relative to the viewport
      console.log(elapsedTime); //elapsed time is based on time since begin was called
    }).begin();
    */
  }

  function startTobii(): void {
    console.info("starting tobii")
    const currentState = state;

    const onGaze: Dispatch<RelativeScreenCoordinates> = (clientPoint) => {
      moveToClient(clientPoint)
    }
    const onPresence: Dispatch<UserPresence> = (presence) => {
      presence$.current.next(presence === 'Present')
    }
    const onEyeMovement: Dispatch<EyePositionData> = (ep) => {
      eyesTracked$.current.next(ep.HasLeftEyePosition && ep.HasRightEyePosition)
    }
    const tobii = new TobiiClient(currentState.tobii as any, onGaze, onPresence, onEyeMovement);
    tobii.start();
    tobiiWs.current = tobii;
  }

  useEffect(() => {
    console.info("use effect")
    const subscription = gazeHits$.current
      .pipe(
        takeUntil(destroy$.current),
        distinctUntilChanged(),
        throttle(
          () => {
            const delayUntil = Math.max(0, state.pauseUntil - Date.now());
            return of().pipe(delay(delayUntil));
          },
          {leading: true, trailing: true}
        ),

        map((detection?: DetectionType) => {
          if (!detection) return undefined;
          xtoys.current?.sendXToys({
            key: 'gazeAt',
            value: detection
          });
          return detectionToRegionType(detection);
        }),
        tap((regionType?: RegionType) => {

          void renderPane?.current?.offsetWidth; // wtf?
          if (!renderPane.current) {
            return;
          }
          switch (regionType) {
            case 'FOCUS':
              renderPane.current.dataset.region = 'FOCUS';
              teaseShock();
              xtoys.current?.sendXToys({key: 'gaze', value: 'FOCUS'});
              break;
            case 'HARD_PUNISH':
              renderPane.current.dataset.region = 'HARD_PUNISH';
              punishShock();
              xtoys.current?.sendXToys({key: 'gaze', value: 'HARD_PUNISH'});
              break;
            case 'SOFT_PUNISH':
              renderPane.current.dataset.region = 'SOFT_PUNISH';
              punishShock();
              xtoys.current?.sendXToys({key: 'gaze', value: 'SOFT_PUNISH'});
              break;
            default:
              renderPane.current.dataset.region = '';
          }
        }),
        switchMap((zone) =>
          of(zone).pipe(
            delay(
              zone === 'FOCUS' ? state.rules.focusDuration * 1000 : 200
            )
          )
        ),
        tap((regionType) => {
          if (renderPane.current) {
            renderPane.current.dataset.region = '';
          }
        }),
        // not entirely sure why this is needed, avoids double submits
        throttleTime(100)
      )
      .subscribe((regionType?: RegionType) => {
        switch (regionType) {
          case 'FOCUS':
            if (state.rules.playSounds) {
              if (audioDing.current) {
                audioDing.current.currentTime = 0;
                audioDing.current.play();
              }
            }

            nextSlide(false);
            xtoys.current?.sendXToys({key: 'event', value: 'nextSlide'});
            break;
          case undefined:
            break;
          default:
            punish(regionType);
        }
        return;
      });

    const rememberDestroy = destroy$.current;

    return () => {
      console.info("unuse effect")
      subscription.unsubscribe();
      rememberDestroy.next(undefined);

      tobiiWs.current?.stop();
      xtoys.current?.stop();
    }

  }, [gazeHits$, destroy$])


  async function teaseShock() {
    return coyoteDevice?.writePatternA(
      {amplitude: 8, pulseDuration: 20, pauseDuration: 20},
      1000
    );
  }

  function punishShock() {
    coyoteDevice?.writePatternA(
      {amplitude: 30, pulseDuration: 12, pauseDuration: 150},
      200
    );
  }

  function detectionToRegionType(name: DetectionType): RegionType | undefined {
    if (state.rules.regionMapping.FOCUS.some((e) => e === name)) {
      return 'FOCUS';
    }

    if (state.rules.regionMapping.HARD_PUNISH.some((e) => e === name)) {
      return 'HARD_PUNISH';
    }

    if (state.rules.regionMapping.SOFT_PUNISH.some((e) => e === name)) {
      return 'SOFT_PUNISH';
    }
    return undefined;
  }

  async function punish(level: 'SOFT_PUNISH' | 'HARD_PUNISH') {

    if (state.xtoys.use) {
      xtoys.current?.sendXToys({key: "event", value: level === 'SOFT_PUNISH' ? 'punish-soft' : 'punish-hard'});
    }

    if (state.rules.playSounds) {
      audioMistake.current?.play();
    }
    if (level === 'HARD_PUNISH') {
      const nextSlideIndex = Math.max(0, state.currentSlide - 1);
      const currentSlideData = await loadSlide(nextSlideIndex);
      setState((prevState) => ({
        ...prevState,
        stats: {
          ...state.stats,
          points: state.stats.points - 10,
          failures: state.stats.failures + 1,
        },
        currentSlide: nextSlideIndex,
        currentSlideData,
        pauseUntil: Date.now() + 2000,
      }));

    } else if (level === 'SOFT_PUNISH') {
      setState((prev) => ({
        ...prev,
        stats: {...prev.stats, points: prev.stats.points - 1},
      }));
    }
  }

  function puryFiExtension(blob: Blob): Promise<PurifyDetection[]> {
    return new Promise((resolve, reject) => {
      (window as any).puryFiImageByBlob(blob, (ret: any) => {
        resolve(toPurifyDetections(ret));
      });
    })
  }

  async function loadSlide(index: number): Promise<SlideData[]> {

    const m = model; // TODO: fail if model is not loaded
    const rules = state.rules;

    const images = state.slides[index].images;

    async function imgToSlideData(img: File): Promise<SlideData> {
      const htmlImage = await loadImage(await readAsDataUrl(img));

      const detections = (typeof (window as any).puryFiImageByBlob == 'function') ?
        await puryFiExtension(img)
        : await processImage(m!, htmlImage);

      const censored = censorImage(
        htmlImage,
        detections,
        (region) =>
          rules.regionMapping['HARD_PUNISH'].includes(region) ||
          rules.regionMapping['SOFT_PUNISH'].includes(region)
      );

      return {
        name: img.name,
        detections,
        dataUrl: URL.createObjectURL(img),
        dataUrlCensored: await censored,
        naturalWidth: htmlImage.naturalWidth,
        naturalHeight: htmlImage.naturalHeight,
      };
    }

    return Promise.all(images.map(imgToSlideData));
  }

  async function win(): Promise<void> {
    setState((prevState) => ({...prevState, phase: 'WON'}));

    xtoys.current?.sendXToys({key: "event", value: "won"});

    if (document.fullscreenEnabled) {
      await document.exitFullscreen();
    }

  }

  async function nextSlide(skipped: boolean) {
    const nextSlideIndex = state.currentSlide + 1;
    if (nextSlideIndex >= state.slides.length) {
      await win();
      return;
    }

    const currentSlideData = await loadSlide(nextSlideIndex);
    setState(() => ({
      ...state,
      stats: {
        ...state.stats,
        points: state.stats.points + (skipped ? -10 : 20),
      },
      currentSlide: nextSlideIndex,
      currentSlideData,
    }));
    renderPane.current?.classList.remove('fadein');
    void renderPane.current?.offsetWidth;
    renderPane.current?.classList.add('fadein');
    setState((prevState) => ({...prevState, pauseUntil: Date.now() + 1000}));
  }

  function handleMouseMoveOnPane(evt: MouseEvent<HTMLImageElement>) {
    if (state.tobii.disableMouse) {
      return;
    }

    const nativeCoords = {
      x: evt.nativeEvent.clientX,
      y: evt.nativeEvent.clientY,
    };

    moveToClient(nativeCoords);
  }

  function sortByRelevance(a: DetectionType, b: DetectionType): number {
    return toPriority(a) - toPriority(b);
  }

  function toPriority(dt: DetectionType): number {
    if (state.rules.regionMapping.FOCUS.includes(dt)) return 0;
    if (state.rules.regionMapping.HARD_PUNISH.includes(dt)) return 1;
    if (state.rules.regionMapping.SOFT_PUNISH.includes(dt)) return 2;
    return 3;
  }

  function moveToClient(clientCoordinates: { x: number; y: number }): void {
    const rp = renderPane.current;
    if (rp == null) {
      return;
    }

    const imageCoords = rp.getBoundingClientRect();
    const p = {
      x: clientCoordinates.x - imageCoords.x,
      y: clientCoordinates.y - imageCoords.y,
    };
    const rScaledToNaturalImageSize = {
      x: (p.x * rp.naturalWidth) / imageCoords.width,
      y: (p.y * rp.naturalHeight) / imageCoords.height,
    };

    const tolerance = imageSize(rp) * 0.04;

    const hit: { imgData: SlideData; detection: PurifyDetection } | undefined =
      state.currentSlideData
        .map((imgData) => ({
          imgData: imgData,
          detection: imgData.detections
            .filter(
              (detection) =>
                distance(
                  purifyBoundingBoxToRectangle(
                    detection.bounding_box,
                    imgData.naturalWidth,
                    imgData.naturalHeight
                  ),
                  rScaledToNaturalImageSize
                ) < tolerance
            )
            // pick the most relevant detection in case we are hitting multiple of them
            .sort((a, b) => sortByRelevance(a.name, b.name))[0],
        }))
        .filter((d) => !!d.detection)[0];

    if (hit) {
      // translate the zoom around the center of the detection
      const hitRect = purifyBoundingBoxToRectangle(
        hit.detection.bounding_box,
        hit.imgData.naturalWidth,
        hit.imgData.naturalHeight
      );
      const hitCenter = {
        x: hitRect.x + hitRect.width / 2,
        y: hitRect.y + hitRect.height / 2,
      };
      rp.style.transformOrigin = `${hitCenter.x}px ${hitCenter.y}px`;
    }

    gazeHits$.current.next(hit?.detection.name);

    setState((prevState) => ({
      ...prevState,
      cursorPosition: clientCoordinates,
      cursorHint:
        state.pauseUntil < Date.now() && hit?.detection.name
          ? detectionToRegionType(hit.detection.name!)
          : undefined,
    }));
  }



  async function handlePurifyFileSelection(e: ChangeEvent<HTMLInputElement>) {
    const nativeFiles: FileList = e.target.files!;
    const allFiles = Array.from(nativeFiles);
    const imageFiles: File[] = allFiles.filter(isImage);
    // sort them by name
    imageFiles.sort((a, b) => a.name.localeCompare(b.name));

    setState((prevState) => ({
      ...prevState,
      slides: imageFiles.map((f) => ({images: [f]})),
    }));
  }

  function imagesWithFocusRegions(images: SlideData[]) {
    return images.filter((file) =>
      file.detections.some(
        // image must have at least one zone to continue
        (detection) => detectionToRegionType(detection.name) === 'FOCUS'
      )
    );
  }

  function shuffleArray<T>(arr: ReadonlyArray<T>): ReadonlyArray<T> {
    const mut = [...arr];
    for (let i = mut.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mut[i], mut[j]] = [mut[j], mut[i]];
    }
    return mut
  }

  async function startGame(): Promise<void> {


    localStorage.setItem('tobii', JSON.stringify(state.tobii));
    if (state.tobii.use && state.tobii.server) {
      startTobii();
    }

    localStorage.setItem('xtoys', JSON.stringify(state.xtoys));
    if (state.xtoys.use) {
      if (!xtoys.current) {
        console.info('setting up xtoys')
        xtoys.current = (new XToysClient(state.xtoys));
      }
      xtoys.current?.start();
    }

    localStorage.setItem('tts', JSON.stringify(state.tts));
    if (state.tts.use) {
      const voice = window.speechSynthesis
        .getVoices()
        .filter((v) => v.localService)[0];

      // TODO: start TTS
      // window.speechSynthesis.speak(utterance);
    }

    localStorage.setItem('coyote', JSON.stringify(state.coyote));

    localStorage.setItem('rules', JSON.stringify(state.rules));

    if (model === undefined && !(window as any).puryFiImageByBlob) {
      console.info('loading nsfw model');
      model = await loadmodel(state.modelUrl);
    }

    setState((prevState) => ({...prevState,
      phase: 'INGAME',
      slides: prevState.rules.shuffleGallery ? shuffleArray(prevState.slides) : prevState.slides,
      pauseUntil: Date.now() + 1000}));

    if (state.rules.fullscreen) {
      await document
        .getElementsByClassName('app')[0]
        .requestFullscreen({navigationUI: 'hide'});
    }
    await nextSlide(false);
  }


  return (
    <div className="app">
      {state.phase === 'INGAME' ? (
        <header>
          <h5>
            Points: {state.stats.points}{' '}
            {state.rules.allowSkipImage &&
            state.slides.length > 0 ? (
              <button onClick={() => nextSlide(true)}>Skip Image</button>
            ) : (
              ''
            )}
          </h5>
        </header>
      ) : (
        ''
      )}
      <main>
        <audio
          src="assets/ding.mp3"
          ref={audioDing}
          autoPlay={false}
          preload={state.rules.playSounds ? 'auto' : 'none'}
        />
        <audio
          src="assets/beep-03.mp3"
          ref={audioMistake}
          autoPlay={false}
          preload={state.rules.playSounds ? 'auto' : 'none'}
        />

        {state.phase === 'SETUP' ? (
          <div className="flex">
            <ConfigMenu
              settings={state}
              onSettingsChanged={(settings) => {
                console.log(settings);
                setState((prevState) => ({...prevState, ...settings}));
              }}
              handleFileSelection={handlePurifyFileSelection}
              onSelectCoyoteDeviceClicked={startCoyote}
              onForgetCoyoteDeviceClicked={forgetCoyote}
              handleAlternativeSelection={
                handleAlternativePurifyFileSelection
              }
            />
          </div>
        ) : (
          ''
        )}

        {state.slides.length > 0 && state.phase === 'SETUP' ? (
          <button onClick={() => startGame()}>
            Start here ({state.slides.length} slides)!
          </button>
        ) : (
          ''
        )}

        {state.phase === 'WON' ? (
          <h1 className="won">
            You made it! Your score: {state.stats.points}. Hit reload to
            start over.
          </h1>
        ) : state.phase === 'INGAME' ? (
          ''
        ) : (
          ''
        )}

        {state.phase !== 'WON' ? ( // must be present in order to bind renderPane in ctor
          <div className="renderContainer">
            {state.currentSlideData.map((slideData, index) => (
              <div key={`${slideData.name}${index}`}>
                <img
                  ref={renderPane}
                  key={`${slideData.name}${index}`}
                  alt="Current Slide"
                  src={slideData.dataUrlCensored}
                  data-imagename={slideData.name}
                  draggable={false}
                  onMouseMove={handleMouseMoveOnPane}
                  className={`${state.rules.softFilter} renderPane`}
                  style={{
                    transitionDuration: `${state.rules.focusDuration}s`,
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          []
        )}

        {state.rules.showGaze && state.phase === 'INGAME' ? (
          <Cursor
            size={200}
            position={state.cursorPosition}
            hint={state.cursorHint}
          />
        ) : (
          ''
        )}
      </main>
    </div>
  );

}


function purifyBoundingBoxToRectangle(
  boundingBox: BoundingBox,
  naturalWidth: number,
  naturalHeight: number
): DOMRect {
  return new DOMRect(
    boundingBox[0] * naturalWidth,
    boundingBox[1] * naturalHeight,
    (boundingBox[2] - boundingBox[0]) * naturalWidth,
    (boundingBox[3] - boundingBox[1]) * naturalHeight
  );
}


function isImage(f: File): boolean {
  return (
    f.type === 'image/jpeg' ||
    f.type === 'image/png' ||
    f.type === 'image/webp'
  );
}

function handleAlternativePurifyFileSelection(files: {
  [P in RegionType]: readonly File[];
}) {
  const imageFiles = {
    FOCUS: files.FOCUS.filter(isImage),
    SOFT_PUNISH: files.SOFT_PUNISH.filter(isImage),
    HARD_PUNISH: files.HARD_PUNISH.filter(isImage),
  };

  const focusJsons = imageFiles.FOCUS.map((image) => ({
    output: {
      nsfw_score: 0.999,
      detections: [
        {
          bounding_box: [0, 0],
          confidence: 1,
          name: 'ARMPITS_EXPOSED',
        },
      ],
    },
    file: image.name,
  }));
}

function countHardPunishedZones(meta: PurifyMetadata, rules: Rules): number {
  return meta.output.detections.filter((detection) =>
    rules.regionMapping.HARD_PUNISH.includes(detection.name)
  ).length;
}

function imageSize(element: HTMLImageElement) {
  return Math.max(element.naturalWidth, element.naturalHeight);
}

function distance(r: DOMRect, p: { x: number; y: number }) {
  const cx = Math.max(Math.min(p.x, r.x + r.width), r.x);
  const cy = Math.max(Math.min(p.y, r.y + r.height), r.y);
  return Math.sqrt((p.x - cx) * (p.x - cx) + (p.y - cy) * (p.y - cy));
}
