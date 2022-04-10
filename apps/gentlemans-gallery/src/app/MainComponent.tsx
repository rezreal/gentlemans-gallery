import {
  PurifyMetadata,
  DetectionType,
  PurifyDetection,
  loadmodel,
  processImage,
  BoundingBox, toPurifyDetections,
} from './model';
import {
  Component,
  ChangeEvent,
  MouseEvent,
  RefObject,
  createRef,
} from 'react';

import * as React from 'react';
import {
  Subject,
  BehaviorSubject,
  interval,
  takeUntil,
  distinctUntilChanged,
  throttle,
  of,
  delay,
  map,
  tap,
  switchMap, throttleTime
} from 'rxjs';

import { Cursor } from './Cursor';
import './MainComponent.css';
import { CoyoteDevice, pairDevice } from './Coyote';
import { ConfigMenu } from './ConfigMenu';
import { DEFAULT_SETTINGS, Settings } from './Settings';
import { RegionType } from './rules';
import { censorImage, loadImage, readAsDataUrl } from './censorImage';
import * as tf from '@tensorflow/tfjs';
import { XToysClient } from './xtoys';

import { ProtocolFrame } from './TobiiClient';

type Props = Record<string, never>

interface SlideData {
  readonly dataUrl: string;
  readonly dataUrlCensored: string;
  readonly name: string;
  readonly detections: readonly PurifyDetection[];
  readonly naturalWidth: number;
  readonly naturalHeight: number;
}

interface State extends Settings {
  readonly slides: readonly { images: readonly File[] }[];

  readonly currentSlide: number;
  readonly currentSlideData: SlideData[];

  readonly cursorPosition: { x: number; y: number };
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
  cursorPosition: { x: -1000, y: -1000 },
  stats: { points: 0, failures: 0 },
  phase: 'SETUP',
  pauseUntil: 0,
};

export class MainComponent extends Component<Props, State> {
  constructor(props: Readonly<Props> | Props) {
    super(props);
    this.state = DEFAULT_STATE;
    this.startCoyote = this.startCoyote.bind(this);
    this.forgetCoyote = this.forgetCoyote.bind(this);
    this.handlePurifyFileSelection = this.handlePurifyFileSelection.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.handleMouseMoveOnPane = this.handleMouseMoveOnPane.bind(this);
    this.renderPane = createRef();
    this.audioDing = createRef();
    this.audioMistake = createRef();
  }

  gazeHits$: BehaviorSubject<DetectionType | undefined> = new BehaviorSubject<DetectionType | undefined>(
    undefined
  );
  eyesTracked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  presence$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  destroy$: Subject<unknown> = new Subject<unknown>();

  slideChanges$: BehaviorSubject<readonly string[] | undefined> =
    new BehaviorSubject<readonly string[] | undefined>(undefined);

  xtoys: XToysClient | undefined;
  tobiiWs: WebSocket | undefined;
  coyoteDevice: CoyoteDevice | undefined;
  tobiiScreenWidth: number = window.screen.width;
  tobiiScreenHeight: number = window.screen.height;

  private forgetCoyote() {
    this.setState((prev) => ({
      ...prev,
      coyote: { ...prev.coyote, pairedDeviceId: undefined },
    }));
  }

  private async startCoyote(): Promise<void> {
    const [coyoteState, coyoteDevice] = await pairDevice(
      (level) => {
        console.info(`Coyote at battery-level ${level}`);
      },
      ({ powerA, powerB }) =>
        console.info(`Coyote at power-level a:${powerA} ${powerB})`),
      this.state.coyote.pairedDeviceId
    );
    this.setState((prev) => ({
      ...prev,
      coyote: { ...prev.coyote, pairedDeviceId: coyoteDevice.id },
    }));
    this.coyoteDevice = coyoteDevice;
    await this.coyoteDevice!.writePower({
      powerA: this.state.coyote.powerLevel,
      powerB: 7,
    });
  }

  private startWebGazer(): void {
    alert('FIXME: startWebGazer()');
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

  private startTobii(): void {
    if (!this.state.tobii.use || this.state.tobii.server) {
      return;
    }
    const ws = new WebSocket(this.state.tobii.server!, ['Tobii.Interaction']);

    ws.onmessage = (m) => {
      const parsed = JSON.parse(m.data) as ProtocolFrame;
      if (parsed.type === 'state') {
        this.tobiiScreenWidth = parsed.data.screenBounds.Width;
        this.tobiiScreenHeight = parsed.data.screenBounds.Height;
        if (parsed.data.userPresence !== 'Unknown') {
          this.presence$.next(parsed.data.userPresence === 'Present');
        }
      } else if (parsed.type === 'gazePoint') {
        const gaze = parsed.data;
        const cutHeight = window.outerHeight - window.innerHeight;
        const cutWidth = window.outerWidth - window.innerWidth;
        const clientPoint = {
          x:
            (gaze.X * window.screen.width) / this.tobiiScreenWidth -
            window.screenX -
            cutWidth,
          y:
            (gaze.Y * window.screen.height) / this.tobiiScreenHeight -
            window.screenY -
            cutHeight,
        };

        this.moveToClient(clientPoint);
      } else if (parsed.type === 'eyePosition') {
        const eyePosition = parsed.data;
        this.eyesTracked$.next(
          eyePosition.HasLeftEyePosition && eyePosition.HasRightEyePosition
        );
      }
    };
    ws.onopen = () => {
      ws.send('state');
      ws.send('startGazePoint');
      //ws.send('startEyePosition');
    };
    this.tobiiWs = ws;
  }

  componentDidMount(): void {
     this.gazeHits$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        throttle(
          () => {
            const delayUntil = Math.max(0, this.state.pauseUntil - Date.now());
            return of().pipe(delay(delayUntil));
          },
          { leading: true, trailing: true }
        ),

        map((detection?: DetectionType) => {
          if (!detection) return undefined;
          const region = this.detectionToRegionType(detection);
          if (region && detection) {
            this.xtoys?.sendXToys({
              type: 'lookAt',
              region,
              detection,
            });
          }
          return region;
        }),
        tap((regionType?: RegionType) => {
          void this.renderPane?.current?.offsetWidth;
          switch (regionType) {
            case 'FOCUS':
              this.renderPane.current!.dataset.region = 'FOCUS';
              this.teaseShock();
              break;
            case 'HARD_PUNISH':
              this.renderPane.current!.dataset.region = 'HARD_PUNISH';
              this.punishShock();
              this.xtoys?.sendXToys({ type: 'punish', severity: 'hard' });

              break;
            case 'SOFT_PUNISH':
              this.renderPane.current!.dataset.region = 'SOFT_PUNISH';
              this.punishShock();
              this.xtoys?.sendXToys({ type: 'punish', severity: 'soft' });

              break;
            default:
              if (this.renderPane.current) {
                this.renderPane.current.dataset.region = '';
              }
          }
        }),
        switchMap((zone) =>
          of(zone).pipe(
            delay(
              zone === 'FOCUS' ? this.state.rules.focusDuration * 1000 : 200
            )
          )
        ),
        tap((regionType) => {
          if (this.renderPane.current) {
            this.renderPane.current.dataset.region = '';
          }
        }),
        // not entirely sure why this is needed, avoids double submits
        throttleTime(100)
      )
      .subscribe((regionType?: RegionType) => {
        switch (regionType) {
          case 'FOCUS':
            if (this.state.rules.playSounds) {
              if (this.audioDing.current) {
                this.audioDing.current.currentTime = 0;
                this.audioDing.current.play();
              }
            }

            this.nextSlide(false);
            break;
          case undefined:
            break;
          default:
            this.punish(regionType);
        }
        return;
      });
  }

  async teaseShock() {
    return this.coyoteDevice?.writePatternA(
      { amplitude: 8, pulseDuration: 20, pauseDuration: 20 },
      1000
    );
  }

  punishShock() {
    this.coyoteDevice?.writePatternA(
      { amplitude: 30, pulseDuration: 12, pauseDuration: 150 },
      200
    );
  }

  componentWillUnmount() {
    this.destroy$.next(undefined);

    if (this.tobiiWs) {
      this.tobiiWs.close();
    }

    this.xtoys?.stop();
  }

  private readonly renderPane: RefObject<HTMLImageElement>;
  private readonly audioDing: RefObject<HTMLAudioElement>;
  private readonly audioMistake: RefObject<HTMLAudioElement>;

  private detectionToRegionType(name: DetectionType): RegionType | undefined {
    if (this.state.rules.regionMapping.FOCUS.some((e) => e === name)) {
      return 'FOCUS';
    }

    if (this.state.rules.regionMapping.HARD_PUNISH.some((e) => e === name)) {
      return 'HARD_PUNISH';
    }

    if (this.state.rules.regionMapping.SOFT_PUNISH.some((e) => e === name)) {
      return 'SOFT_PUNISH';
    }
    return undefined;
  }

  private countHardPunishedZones(meta: PurifyMetadata): number {
    return meta.output.detections.filter((detection) =>
      this.state.rules.regionMapping.HARD_PUNISH.includes(detection.name)
    ).length;
  }

  private async punish(level: 'SOFT_PUNISH' | 'HARD_PUNISH') {

    if (this.state.xtoys.use) {
      this.xtoys?.sendXToys({type: "punish", severity: level === 'SOFT_PUNISH' ? 'soft' : 'hard'});
    }

    if (this.state.rules.playSounds) {
      this.audioMistake.current?.play();
    }
    if (level === 'HARD_PUNISH') {
      const nextSlideIndex = Math.max(0, this.state.currentSlide - 1);
      const currentSlideData = await this.loadSlide(nextSlideIndex);
      this.setState(() => ({
        stats: {
          ...this.state.stats,
          points: this.state.stats.points - 10,
          failures: this.state.stats.failures + 1,
        },
        currentSlide: nextSlideIndex,
        currentSlideData,
      }));
      this.setState(() => ({ pauseUntil: Date.now() + 1500 }));
    } else if (level === 'SOFT_PUNISH') {
      this.setState((prev) => ({
        ...prev,
        stats: { ...prev.stats, points: prev.stats.points - 1 },
      }));
    }
  }

  private static puryFiExtension(blob: Blob) : Promise<PurifyDetection[]> {
    return new Promise((resolve, reject) =>  {
      (window as any).puryFiImageByBlob(blob, (ret : any) => {
        resolve(toPurifyDetections(ret));
      });
    })
  }

  private async loadSlide(index: number): Promise<SlideData[]> {

    const m = this.model; // TODO: fail if model is not loaded
    const rules = this.state.rules;

    const images = this.state.slides[index].images;

    async function imgToSlideData(img: File): Promise<SlideData> {
      const htmlImage = await loadImage(await readAsDataUrl(img));

      const detections = (typeof (window as any).puryFiImageByBlob == 'function') ?
        await MainComponent.puryFiExtension(img)
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

  private async win(): Promise<void> {
    this.setState(() => ({ phase: 'WON' }));

    this.xtoys?.sendXToys({ "type": "won"});

    await document.exitFullscreen();

  }

  private async nextSlide(skipped: boolean) {
    const nextSlideIndex = this.state.currentSlide + 1;

    if (nextSlideIndex >= this.state.slides.length) {
      await this.win();
      return;
    }

    const currentSlideData = await this.loadSlide(nextSlideIndex);
    this.setState(() => ({
      ...this.state,
      stats: {
        ...this.state.stats,
        points: this.state.stats.points + (skipped ? -10 : 20),
      },
      currentSlide: nextSlideIndex,
      currentSlideData,
    }));
    this.renderPane.current?.classList.remove('fadein');
    void this.renderPane.current?.offsetWidth;
    this.renderPane.current?.classList.add('fadein');
    this.setState(() => ({ pauseUntil: Date.now() + 1000 }));
  }

  private handleMouseMoveOnPane(evt: MouseEvent<HTMLImageElement>) {
    if (this.state.tobii.disableMouse) {
      return;
    }

    const nativeCoords = {
      x: evt.nativeEvent.clientX,
      y: evt.nativeEvent.clientY,
    };

    this.moveToClient(nativeCoords);
  }

  private sortByRelevance(a: DetectionType, b: DetectionType): number {
    return this.toPriority(a) - this.toPriority(b);
  }

  private toPriority(dt: DetectionType): number {
    if (this.state.rules.regionMapping.FOCUS.includes(dt)) return 0;
    if (this.state.rules.regionMapping.HARD_PUNISH.includes(dt)) return 1;
    if (this.state.rules.regionMapping.SOFT_PUNISH.includes(dt)) return 2;
    return 3;
  }

  private moveToClient(clientCoordinates: { x: number; y: number }): void {
    const renderPane = this.renderPane.current!; // TODO: fail if ot does not exist

    const imageCoords = renderPane.getBoundingClientRect();
    const p = {
      x: clientCoordinates.x - imageCoords.x,
      y: clientCoordinates.y - imageCoords.y,
    };
    const rScaledToNaturalImageSize = {
      x: (p.x * renderPane.naturalWidth) / imageCoords.width,
      y: (p.y * renderPane.naturalHeight) / imageCoords.height,
    };

    const tolerance = MainComponent.imageSize(renderPane) * 0.04;

    const hit: { imgData: SlideData; detection: PurifyDetection } | undefined =
      this.state.currentSlideData
        .map((imgData) => ({
          imgData: imgData,
          detection: imgData.detections
            .filter(
              (detection) =>
                MainComponent.distance(
                  MainComponent.purifyBoundingBoxToRectangle(
                    detection.bounding_box,
                    imgData.naturalWidth,
                    imgData.naturalHeight
                  ),
                  rScaledToNaturalImageSize
                ) < tolerance
            )
            // pick the most relevant detection in case we are hitting multiple of them
            .sort((a, b) => this.sortByRelevance(a.name, b.name))[0],
        }))
        .filter((d) => !!d.detection)[0];

    if (hit) {
      // translate the zoom around the center of the detection
      const hitRect = MainComponent.purifyBoundingBoxToRectangle(
        hit.detection.bounding_box,
        hit.imgData.naturalWidth,
        hit.imgData.naturalHeight
      );
      const hitCenter = {
        x: hitRect.x + hitRect.width / 2,
        y: hitRect.y + hitRect.height / 2,
      };
      renderPane.style.transformOrigin = `${hitCenter.x}px ${hitCenter.y}px`;
    }

    this.gazeHits$.next(hit?.detection.name);

    this.setState({
      ...this.state,
      cursorPosition: clientCoordinates,
      cursorHint:
        this.state.pauseUntil < Date.now() && hit?.detection.name
          ? this.detectionToRegionType(hit.detection.name!)
          : undefined,
    });
  }

  private static imageSize(element: HTMLImageElement) {
    return Math.max(element.naturalWidth, element.naturalHeight);
  }

  private static distance(r: DOMRect, p: { x: number; y: number }) {
    const cx = Math.max(Math.min(p.x, r.x + r.width), r.x);
    const cy = Math.max(Math.min(p.y, r.y + r.height), r.y);
    return Math.sqrt((p.x - cx) * (p.x - cx) + (p.y - cy) * (p.y - cy));
  }

  private static purifyBoundingBoxToRectangle(
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

  private static isImage(f: File): boolean {
    return (
      f.type === 'image/jpeg' ||
      f.type === 'image/png' ||
      f.type === 'image/webp'
    );
  }

  private handleAlternativePurifyFileSelection(files: {
    [P in RegionType]: readonly File[];
  }) {
    const imageFiles = {
      FOCUS: files.FOCUS.filter(MainComponent.isImage),
      SOFT_PUNISH: files.SOFT_PUNISH.filter(MainComponent.isImage),
      HARD_PUNISH: files.HARD_PUNISH.filter(MainComponent.isImage),
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

  private model: tf.GraphModel | undefined = undefined;

  private async handlePurifyFileSelection(e: ChangeEvent<HTMLInputElement>) {
    const nativeFiles: FileList = e.target.files!;
    const allFiles = Array.from(nativeFiles);
    const imageFiles: File[] = allFiles.filter(MainComponent.isImage);
    // sort them by name
    imageFiles.sort((a, b) => a.name.localeCompare(b.name));

    this.setState(() => ({
      slides: imageFiles.map((f) => ({ images: [f] })),
    }));
  }

  private imagesWithFocusRegions(images: SlideData[]) {
    return images.filter((file) =>
      file.detections.some(
        // image must have at least one zone to continue
        (detection) => this.detectionToRegionType(detection.name) === 'FOCUS'
      )
    );
  }


  async startGame(): Promise<void> {

    if (this.state.rules.shuffleGallery) {
      const gallery = [...this.state.slides];

      for (let i = gallery.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gallery[i], gallery[j]] = [gallery[j], gallery[i]];
      }
      this.setState(() => ({
        slides: gallery,
      }));
    }

    localStorage.setItem('tobii', JSON.stringify(this.state.tobii));
    if (this.state.tobii.use) {
      this.startTobii();
    }

    localStorage.setItem('xtoys', JSON.stringify(this.state.xtoys));
    if (this.state.xtoys.use) {
      if (!this.xtoys) {
        this.xtoys = new XToysClient(this.state.xtoys);
      }
      this.xtoys.start();
    }

    localStorage.setItem('tts', JSON.stringify(this.state.tts));
    if (this.state.tts.use) {
      const voice = window.speechSynthesis
        .getVoices()
        .filter((v) => v.localService)[0];

      // TODO: start TTS
      // window.speechSynthesis.speak(utterance);
    }

    localStorage.setItem('coyote', JSON.stringify(this.state.coyote));

    localStorage.setItem('rules', JSON.stringify(this.state.rules));

    if (this.model === undefined && !(window as any).puryFiImageByBlob) {
      console.info('loading nsfw model');
      this.model = await loadmodel(this.state.modelUrl);
    }

    this.setState(() => ({ phase: 'INGAME', pauseUntil: Date.now() + 1000 }));

    if (this.state.rules.fullscreen) {
      await document
        .getElementsByClassName('app')[0]
        .requestFullscreen({ navigationUI: 'hide' });
    }
    await this.nextSlide(false);
  }

  render(): JSX.Element {
    return (
      <div className="app">
        {this.state.phase === 'INGAME' ? (
          <header>
            <h5>
              Points: {this.state.stats.points}{' '}
              {this.state.rules.allowSkipImage &&
              this.state.slides.length > 0 ? (
                <button onClick={() => this.nextSlide(true)}>Skip Image</button>
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
            ref={this.audioDing}
            autoPlay={false}
            preload={this.state.rules.playSounds ? 'auto' : 'none'}
          />
          <audio
            src="assets/beep-03.mp3"
            ref={this.audioMistake}
            autoPlay={false}
            preload={this.state.rules.playSounds ? 'auto' : 'none'}
          />

          {this.state.phase === 'SETUP' ? (
            <div className="flex">
              <ConfigMenu
                settings={this.state}
                onSettingsChanged={(settings) => {
                  console.log(settings);
                  this.setState(() => settings);
                }}
                handleFileSelection={this.handlePurifyFileSelection}
                onSelectCoyoteDeviceClicked={this.startCoyote}
                onForgetCoyoteDeviceClicked={this.forgetCoyote}
                handleAlternativeSelection={
                  this.handleAlternativePurifyFileSelection
                }
              />
            </div>
          ) : (
            ''
          )}

          {this.state.slides.length > 0 && this.state.phase === 'SETUP' ? (
            <button onClick={() => this.startGame()}>
              Start here ({this.state.slides.length} slides)!
            </button>
          ) : (
            ''
          )}

          {this.state.phase === 'WON' ? (
            <h1 className="won">
              You made it! Your score: {this.state.stats.points}. Hit reload to
              start over.
            </h1>
          ) : this.state.phase === 'INGAME' ? (
            ''
          ) : (
            ''
          )}

          {this.state.phase !== 'WON' ? ( // must be present in order to bind renderPane in ctor
            <div className="renderContainer">
              {this.state.currentSlideData.map((slideData, index) => (
                <div key={`${slideData.name}${index}`}>
                  <img
                    ref={this.renderPane}
                    key={`${slideData.name}${index}`}
                    alt="Current Slide"
                    src={slideData.dataUrlCensored}
                    data-imagename={slideData.name}
                    draggable={false}
                    onMouseMove={this.handleMouseMoveOnPane}
                    className={`${this.state.rules.softFilter} renderPane`}
                    style={{
                      transitionDuration: `${this.state.rules.focusDuration}s`,
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            []
          )}

          {this.state.rules.showGaze && this.state.phase == 'INGAME' ? (
            <Cursor
              size={200}
              position={this.state.cursorPosition}
              hint={this.state.cursorHint}
            />
          ) : (
            ''
          )}
        </main>
      </div>
    );
  }
}
