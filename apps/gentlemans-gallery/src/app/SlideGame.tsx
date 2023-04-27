import * as React from 'react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import './SlideGame.css';
import { Settings } from './Settings';
import { Cursor } from './Cursor';
import { SlideData } from './GameState';
import { RegionType } from './rules';
import * as tf from '@tensorflow/tfjs';
import {
  DetectionType,
  processImage,
  PurifyDetection,
  toPurifyDetections,
} from './PurifyModel';
import {
  BehaviorSubject,
  delay,
  distinctUntilChanged,
  map,
  Observable,
  of,
  sampleTime,
  Subject,
  switchMap,
  takeUntil,
  tap,
  throttle,
  throttleTime,
} from 'rxjs';
import { distance, purifyBoundingBoxToRectangle } from './screenMath';
import { detectionToRegionType, sortByRelevance } from './purifyMath';
import { censorImage, loadImage, readAsDataUrl } from './censorImage';
import { XToysClient } from './xtoys';
import { RelativeScreenCoordinates } from './TobiiClient';

export interface SlideGameResult {
  readonly points: number;
  readonly failures: number;
}

interface State {
  readonly currentSlide: number;
  readonly currentSlideData: SlideData[];

  readonly stats: SlideGameResult;
}

interface CursorState {
  readonly cursorHint?: RegionType;
  readonly position: CursorPosition;
}

interface CursorPosition {
  readonly x: number;
  readonly y: number;
}

const DEFAULT_STATE: State = {
  currentSlide: 0,
  currentSlideData: [],
  stats: { points: 0, failures: 0 },
};

const DEFAULT_CURSOR_POSITION: CursorState = {
  position: {
    x: -1000,
    y: -1000,
  },
};

type Props = {
  readonly slides: readonly { images: readonly File[] }[];
  readonly settings: Settings;
  readonly model: tf.GraphModel;
  readonly xtoys?: XToysClient;
  onGameResult: (r: SlideGameResult) => Promise<unknown>;
  gaze$: Observable<RelativeScreenCoordinates>;
};

export const SlideGame: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState<State>({ ...DEFAULT_STATE });
  const [cursorState, setCursorState] = useState<CursorState>({
    ...DEFAULT_CURSOR_POSITION,
  });

  const renderPane = useRef<HTMLImageElement>(null);
  const audioDing = useRef<HTMLAudioElement>(null);
  const audioMistake = useRef<HTMLAudioElement>(null);

  const destroy$ = useRef(new Subject<unknown>());
  const pauseUntil = useRef(0);

  // Emit destroy on component unmount
  useEffect(() => () => destroy$.current.next(undefined), []);

  // Load first slide on start
  useEffect(() => {
    nextSlide(true);
  }, []);

  const gazeHits$ = useRef(
    new BehaviorSubject<DetectionType | undefined>(undefined)
  );

  function toFocuses(
    o: Observable<DetectionType | undefined>
  ): Observable<RegionType | undefined> {
    return o.pipe(
      takeUntil(destroy$.current),
      distinctUntilChanged(),
      throttle(
        () => {
          const delayUntil = Math.max(0, pauseUntil.current - Date.now());
          return of().pipe(delay(delayUntil));
        },
        { leading: true, trailing: true }
      ),

      map((detection?: DetectionType) => {
        if (!detection) return undefined;
        props.xtoys?.sendXToys({
          key: 'gazeAt',
          value: detection,
        });
        return detectionToRegionType(
          detection,
          props.settings.rules.regionMapping
        );
      }),
      tap((regionType?: RegionType) => {
        void renderPane?.current?.offsetWidth; // wtf?
        if (!renderPane.current) {
          return;
        }
        switch (regionType) {
          case 'FOCUS':
            renderPane.current.dataset.region = 'FOCUS';
            props.xtoys?.sendXToys({ key: 'gaze', value: 'FOCUS' });
            break;
          case 'HARD_PUNISH':
            renderPane.current.dataset.region = 'HARD_PUNISH';
            props.xtoys?.sendXToys({ key: 'gaze', value: 'HARD_PUNISH' });
            break;
          case 'SOFT_PUNISH':
            renderPane.current.dataset.region = 'SOFT_PUNISH';
            props.xtoys?.sendXToys({ key: 'gaze', value: 'SOFT_PUNISH' });
            break;
          default:
            renderPane.current.dataset.region = '';
        }
      }),
      switchMap((zone) =>
        of(zone).pipe(
          delay(
            zone === 'FOCUS' ? props.settings.rules.focusDuration * 1000 : 200
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
    );
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
            .sort((a, b) =>
              sortByRelevance(
                a.name,
                b.name,
                props.settings.rules.regionMapping
              )
            )[0],
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

    setCursorState({
      position: clientCoordinates,
      cursorHint:
        pauseUntil.current < Date.now() && hit?.detection.name
          ? detectionToRegionType(
              hit.detection.name!,
              props.settings.rules.regionMapping
            )
          : undefined,
    });
  }

  function handleMouseMoveOnPane(evt: MouseEvent<HTMLImageElement>) {
    if (props.settings.tobii.disableMouse) {
      return;
    }
    const nativeCoords = {
      x: evt.nativeEvent.clientX,
      y: evt.nativeEvent.clientY,
    };

    moveToClient(nativeCoords);
  }

  async function loadSlide(index: number): Promise<SlideData[]> {
    console.info('Loading slide ' + index);

    const m = props.model; // TODO: fail if model is not loaded
    const rules = props.settings.rules;

    const images = props.slides[index].images;

    async function imgToSlideData(img: File): Promise<SlideData> {
      const htmlImage = await loadImage(await readAsDataUrl(img));

      const detections = await processImage(
        m!,
        htmlImage,
        props.settings.purify.confidenceThreshold
      );

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

  useEffect(() => {
    const subscription = props.gaze$
      .pipe(sampleTime(10), takeUntil(destroy$.current))
      .subscribe((o) => {
        if (o) moveToClient(o);
      });
    return () => subscription.unsubscribe();
  }, [state]);

  useEffect(() => {
    const subscription = gazeHits$.current
      .pipe(takeUntil(destroy$.current), toFocuses)
      .subscribe((regionType?: RegionType) => {
        switch (regionType) {
          case 'FOCUS':
            if (props.settings.rules.playSounds) {
              if (audioDing.current) {
                audioDing.current.currentTime = 0;
                audioDing.current.play();
              }
            }
            console.info('beforeNextSlide');
            nextSlide(false);
            props.xtoys?.sendXToys({ key: 'event', value: 'nextSlide' });
            break;
          case undefined:
            break;
          default:
            punish(regionType);
        }
        return;
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [state]);

  function puryFiExtension(blob: Blob): Promise<PurifyDetection[]> {
    return new Promise((resolve, reject) => {
      (window as any).puryFiImageByBlob(blob, (ret: any) => {
        resolve(toPurifyDetections(ret));
      });
    });
  }

  async function punish(level: 'SOFT_PUNISH' | 'HARD_PUNISH') {
    if (props.settings.xtoys.use) {
      props.xtoys?.sendXToys({
        key: 'event',
        value: level === 'SOFT_PUNISH' ? 'punish-soft' : 'punish-hard',
      });
    }

    if (props.settings.rules.playSounds) {
      audioMistake.current?.play();
    }
    if (level === 'HARD_PUNISH') {
      const previousSlideIndex = Math.max(0, state.currentSlide - 1);
      const currentSlideData = await loadSlide(previousSlideIndex);
      setState((prevState) => ({
        ...prevState,
        stats: {
          ...prevState.stats,
          points: prevState.stats.points - 10,
          failures: prevState.stats.failures + 1,
        },
        currentSlide: previousSlideIndex,
        currentSlideData,
      }));
      pauseUntil.current = Date.now() + 2000;
    } else if (level === 'SOFT_PUNISH') {
      setState((prev) => ({
        ...prev,
        stats: { ...prev.stats, points: prev.stats.points - 1 },
      }));
    }
  }

  async function nextSlide(skipped: boolean) {
    const nextSlideIndex = state.currentSlide + 1;
    if (nextSlideIndex >= props.slides.length) {
      await props.onGameResult(state.stats);
      return;
    }

    const currentSlideData = await loadSlide(nextSlideIndex);
    setState((prevState) => ({
      ...prevState,
      stats: {
        ...prevState.stats,
        points: prevState.stats.points + (skipped ? 0 : 20),
      },
      currentSlide: nextSlideIndex,
      currentSlideData,
      pauseUntil: Date.now() + 1000,
    }));

    renderPane.current?.classList.remove('fadein');
    void renderPane.current?.offsetWidth;
    renderPane.current?.classList.add('fadein');
  }

  return (
    <>
      <audio
        src="assets/ding.mp3"
        ref={audioDing}
        autoPlay={false}
        preload={props.settings.rules.playSounds ? 'auto' : 'none'}
      />
      <audio
        src="assets/beep-03.mp3"
        ref={audioMistake}
        autoPlay={false}
        preload={props.settings.rules.playSounds ? 'auto' : 'none'}
      />
      <header>
        <h5>
          Points: {state.stats.points}{' '}
          {props.settings.rules.allowSkipImage && props.slides.length > 0 ? (
            <button onClick={() => nextSlide(true)}>Skip Image</button>
          ) : (
            ''
          )}
        </h5>
      </header>
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
              className={`${props.settings.rules.softFilter} renderPane`}
              style={{
                transitionDuration: `${props.settings.rules.focusDuration}s`,
              }}
            />
          </div>
        ))}
      </div>

      {props.settings.rules.showGaze ? (
        <Cursor
          size={200}
          position={cursorState.position}
          hint={cursorState.cursorHint}
        />
      ) : (
        ''
      )}
    </>
  );
};

function imageSize(element: HTMLImageElement) {
  return Math.max(element.naturalWidth, element.naturalHeight);
}
