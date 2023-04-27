import * as React from 'react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import './SlideGame.css';
import { Settings } from './Settings';
import { RegionType } from './rules';
import * as tf from '@tensorflow/tfjs';
import { processImage, PurifyDetection } from './PurifyModel';
import './VideoGame.css';
import {
  bufferTime,
  filter,
  interval,
  map,
  mergeWith,
  Observable,
  sampleTime,
  Subject,
  takeUntil,
} from 'rxjs';
import { distance, purifyBoundingBoxToRectangle } from './screenMath';
import { detectionToRegionType, sortByRelevance } from './purifyMath';
import { XToysClient } from './xtoys';

import { RelativeScreenCoordinates } from './TobiiClient';
import VideoFrameMetadata from './VideoFrameMetadata';
import { Cursor } from './Cursor';

export interface VideoGameResult {
  readonly points: number;
  readonly failures: number;
}

interface State {
  readonly stats: VideoGameResult;
  // -100 to 100
  readonly currentBar: number;
}

interface CursorPosition {
  readonly x: number;
  readonly y: number;
}

const FOCUS_LIMIT = 250;
const NEUTRAL = 0;
const SOFT_PUNISH_LIMIT = -150;
const HARD_PUNISH_LIMIT = -200;

const DEFAULT_STATE: State = {
  stats: { points: 0, failures: 0 },
  currentBar: 0,
};

type Props = {
  readonly videoUrl: string | URL;
  readonly settings: Settings;
  readonly model: tf.GraphModel;
  readonly xtoys?: XToysClient;
  readonly onGameResult: (r: VideoGameResult) => Promise<unknown>;
  readonly gaze$: Observable<RelativeScreenCoordinates>;
};

type PurifyDetectionWithRegion = PurifyDetection & {
  rect: DOMRect;
  regionType: RegionType | undefined;
};

export const VideoGame: React.FC<Props> = (props: Props) => {
  const destroy$ = useRef(new Subject<unknown>());
  const [state, setState] = useState<State>({ ...DEFAULT_STATE });

  const video = useRef<HTMLVideoElement | null>(null);
  const latestGaze = useRef<RelativeScreenCoordinates>({ x: -1000, y: -1000 });

  const [lastRenderedGaze, setLastRenderedGaze] = useState({
    x: -1000,
    y: -1000,
  });
  const [lastRenderedRegion, setLastRenderedRegion] = useState<
    PurifyDetectionWithRegion | undefined
  >(undefined);

  const gazeHits$ = useRef(
    new Subject<PurifyDetectionWithRegion | undefined>()
  );

  // gaze to ref
  useEffect(() => {
    const subscription = props.gaze$
      .pipe(sampleTime(10), takeUntil(destroy$.current))
      .subscribe((o) => {
        if (o) latestGaze.current = o;
      });
    return () => subscription.unsubscribe();
  }, [destroy$]);

  // events to ref
  useEffect(() => {
    const subscription = gazeHits$.current
      .pipe(
        // best confidence in 100ms
        bufferTime(100),
        map((ts) =>
          ts.reduce(
            (prev, curr) =>
              (prev?.confidence || 1000) < (curr?.confidence || 0)
                ? prev
                : curr,
            undefined
          )
        ),
        filter((b) => !!b), // filter out empty hits
        mergeWith(interval(200).pipe(map((i) => undefined))),
        takeUntil(destroy$.current)
      )
      .subscribe((hit) => {
        setState((p) => ({
          ...p,
          currentBar: calculateNewBar(p.currentBar, hit?.regionType),
        }));

        if (state.currentBar > NEUTRAL && Date.now() - lastSend.current > 200) {
          props.xtoys?.sendXToys({
            key: 'vibrate',
            value: ((state.currentBar * 100) / FOCUS_LIMIT).toString(),
          });
          lastSend.current = Date.now();
        } else if (
          state.currentBar < NEUTRAL &&
          state.currentBar >= SOFT_PUNISH_LIMIT &&
          Date.now() - lastSend.current > 200
        ) {
          props.xtoys?.sendXToys({
            key: 'shock',
            value: ((state.currentBar * 100) / SOFT_PUNISH_LIMIT).toString(),
          });
          lastSend.current = Date.now();
        } else if (
          state.currentBar < SOFT_PUNISH_LIMIT &&
          Date.now() - lastSend.current > 200
        ) {
          props.xtoys?.sendXToys({ key: 'punish', value: 'true' });
          lastSend.current = Date.now();
        }
      });
    return () => subscription.unsubscribe();
  }, [state]);

  const lastSend = useRef(0);

  function calculateNewBar(
    oldBar: number,
    regionHit: RegionType | undefined
  ): number {
    const cooldownDelta = Math.min(1, Math.abs(oldBar * 0.02));
    switch (regionHit) {
      case undefined:
        return (
          (Math.abs(oldBar) -
            (oldBar < SOFT_PUNISH_LIMIT ? cooldownDelta * 2 : cooldownDelta)) *
          Math.sign(oldBar)
        ); // cooldown
      case 'FOCUS':
        return Math.min(
          FOCUS_LIMIT,
          oldBar < NEUTRAL ? oldBar + 10 : oldBar + 5
        );
      case 'SOFT_PUNISH':
        return Math.min(Math.max(SOFT_PUNISH_LIMIT, oldBar - 10), oldBar);
      case 'HARD_PUNISH':
        return Math.max(HARD_PUNISH_LIMIT, oldBar - 20);
    }
  }

  // Emit destroy on component unmount
  useEffect(() => () => destroy$.current.next(undefined), []);

  // register video callback
  useEffect(() => {
    if (video.current) {
      console.info('registering video callback');
      const id = (video.current as any).requestVideoFrameCallback(
        videoFrameCallback
      );
      return () => {
        console.info('unregistering video callback');
        (video.current as any).cancelVideoFrameCallback(id);
      };
    }
  }, [video.current]);

  const videoFrameCallback = (
    now: DOMHighResTimeStamp,
    metadata: VideoFrameMetadata
  ) => {
    const v = video.current;
    const d = props.model;
    const process = async () => {
      if (v && v.readyState === 4 && d && metadata.presentedFrames) {
        const rawDetections = await processImage(
          props.model,
          v,
          props.settings.purify.confidenceThreshold
        );
        const gazeOnVideo = {
          x: latestGaze.current!.x - v.clientLeft,
          y: latestGaze.current!.y - v.clientTop,
        };

        const detectionsWithRect: PurifyDetectionWithRegion[] =
          rawDetections.map((d) => ({
            ...d,
            rect: purifyBoundingBoxToRectangle(
              d.bounding_box,
              v.clientWidth,
              v.clientHeight
            ),
            regionType: detectionToRegionType(
              d.name,
              props.settings.rules.regionMapping
            ),
          }));

        const tolerance = videoSize(v) * 0.04;

        const hit = detectionsWithRect
          .map((d) => ({ ...d, distance: distance(d.rect, gazeOnVideo) }))
          .filter((d) => d.distance < tolerance)
          .filter((d) => !!d.regionType) // keep hits with relevant regions
          .sort((a, b) =>
            sortByRelevance(a.name, b.name, props.settings.rules.regionMapping)
          )[0];

        setLastRenderedGaze(gazeOnVideo);

        if (hit) {
          setLastRenderedRegion(hit);
          gazeHits$.current.next(hit);
        }
      }
      // check if we really want to wait to the scan result for every frame
      (v as any).requestVideoFrameCallback(videoFrameCallback);
    };
    process().catch((e) => console.error(e));
  };

  function handleMouseMoveOnPane(evt: MouseEvent<HTMLVideoElement>) {
    if (props.settings.tobii.disableMouse) {
      return;
    }

    latestGaze.current = {
      x: evt.nativeEvent.clientX,
      y: evt.nativeEvent.clientY,
    };
  }

  return (
    <>
      <header>
        <h5>
          Points: {state.currentBar} (last seen: {lastRenderedRegion?.name} (
          {lastRenderedRegion?.confidence}))
          <br />
          {state.currentBar >= 0 ? (
            <progress
              value={state.currentBar}
              max={FOCUS_LIMIT}
              style={{
                width: '100%',
                height: '10px',
                color: 'green',
                backgroundColor: '#0e0',
              }}
            ></progress>
          ) : (
            <progress
              className={'bad'}
              value={-state.currentBar}
              max={Math.abs(HARD_PUNISH_LIMIT)}
              style={{
                width: '100%',
                height: '10px',
                color: 'red',
                backgroundColor: '#e00',
              }}
            ></progress>
          )}
        </h5>
      </header>
      <div
        className="renderContainer"
        style={{
          boxShadow: `${state.currentBar / 10}px ${
            state.currentBar > 0 ? 'green' : 'red'
          }`,
        }}
      >
        <video
          autoPlay={true}
          ref={video}
          width="100%"
          preload="auto"
          crossOrigin="anonymous"
          controlsList="nodownload pause"
          onContextMenu={() => false}
          controls={true}
          src={props.videoUrl.toString()}
          onMouseMove={handleMouseMoveOnPane}
        />
      </div>

      {props.settings.rules.showGaze ? (
        <Cursor
          size={200}
          position={lastRenderedGaze}
          //hint={lastRenderedHint}
        />
      ) : (
        ''
      )}
    </>
  );
};

function videoSize(element: HTMLVideoElement) {
  return Math.max(element.videoWidth, element.videoHeight);
}
