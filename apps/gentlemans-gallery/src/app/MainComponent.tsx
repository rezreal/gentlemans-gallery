import { loadmodel } from './PurifyModel';
import * as React from 'react';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { BehaviorSubject, Subject } from 'rxjs';

import './MainComponent.css';

import { ConfigMenu } from './ConfigMenu';
import { Settings } from './Settings';
import * as tf from '@tensorflow/tfjs';
import { XToysClient } from './xtoys';

import {
  EyePositionData,
  RelativeScreenCoordinates,
  TobiiClient,
  UserPresence,
} from './TobiiClient';
import { SlideGame, SlideGameResult } from './SlideGame';
import { SlideGameConfigurator } from './SlideGameConfigurator';
import { ABSlideGameConfigurator } from './ABSlideGameConfigurator';
import { loadSettings, saveSettings } from './persistence';
import { VideoGameConfigurator } from './VideoGameConfigurator';
import { VideoGame } from './VideoGame';

type Props = Record<string, never>;

interface State {
  readonly videoUrl: URL | string | undefined;
  readonly slides: readonly { images: readonly File[] }[];
  readonly url?: string;
  readonly lastGameStats: SlideGameResult | undefined;
  readonly phase: 'SETUP' | 'INGAME' | 'VIDEOGAME' | 'WON';
}

const DEFAULT_STATE: State = {
  videoUrl: undefined,
  slides: [],
  lastGameStats: undefined,
  phase: 'SETUP',
};

export const MainComponent: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState<State>(DEFAULT_STATE);
  const [settings, setSettings] = useState<Settings>(loadSettings());

  const gaze$ = useRef(new Subject<RelativeScreenCoordinates>());
  const eyesTracked$ = useRef(new BehaviorSubject<boolean>(false));
  const presence$ = useRef(new BehaviorSubject<boolean>(false));

  const xtoys = useRef<XToysClient | undefined>(undefined);
  const tobiiWs = useRef<TobiiClient | undefined>(undefined);
  const model = useRef<tf.GraphModel | undefined>(undefined);

  useEffect(() => saveSettings(settings), [settings]);

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

  async function startTobii(): Promise<void> {
    console.info('starting tobii');

    const onGaze: Dispatch<RelativeScreenCoordinates> = (clientPoint) => {
      gaze$.current.next(clientPoint);
    };
    const onPresence: Dispatch<UserPresence> = (presence) => {
      presence$.current.next(presence === 'Present');
    };
    const onEyeMovement: Dispatch<EyePositionData> = (ep) => {
      eyesTracked$.current.next(
        ep.HasLeftEyePosition && ep.HasRightEyePosition
      );
    };
    const tobii = new TobiiClient(
      settings.tobii,
      onGaze,
      onPresence,
      onEyeMovement
    );
    await tobii.start();
    tobiiWs.current = tobii;
  }

  async function win(result: SlideGameResult): Promise<void> {
    console.info('game won with result:', result);
    setState((prevState) => ({
      ...prevState,
      lastGameStats: result,
      phase: 'WON',
    }));
    xtoys.current?.sendXToys({ key: 'event', value: 'won' });
    if (document.fullscreenEnabled && settings.rules.fullscreen) {
      await document.exitFullscreen();
    }
  }

  async function startSlideGame(images: readonly File[]): Promise<void> {
    if (settings.tobii.use && settings.tobii.server) {
      await startTobii();
    }

    if (settings.xtoys.use) {
      if (!xtoys.current) {
        console.info('setting up xtoys');
        xtoys.current = new XToysClient(settings.xtoys);
      }
      xtoys.current?.start();
    }

    if (settings.tts.use) {
      const voice = window.speechSynthesis
        .getVoices()
        .filter((v) => v.localService)[0];

      // TODO: start TTS
      // window.speechSynthesis.speak(utterance);
    }

    if (model.current === undefined && !(window as any).puryFiImageByBlob) {
      console.info('loading nsfw model from assets');
      model.current = await loadmodel(settings.purify.modelUrl);
    }

    const slides = images.map((i) => ({ images: [i] }));

    setState((prevState) => ({
      ...prevState,
      phase: 'INGAME',
      slides: slides,
      pauseUntil: Date.now() + 1000,
    }));

    if (settings.rules.fullscreen) {
      await document
        .getElementsByClassName('app')[0]
        .requestFullscreen({ navigationUI: 'hide' });
    }
  }

  async function startVideoGame(videoUrl: string | URL): Promise<void> {
    if (settings.tobii.use && settings.tobii.server) {
      await startTobii();
    }

    if (settings.xtoys.use) {
      if (!xtoys.current) {
        console.info('setting up xtoys');
        xtoys.current = new XToysClient(settings.xtoys);
      }
      xtoys.current?.start();
    }

    if (settings.tts.use) {
      const voice = window.speechSynthesis
        .getVoices()
        .filter((v) => v.localService)[0];

      // TODO: start TTS
      // window.speechSynthesis.speak(utterance);
    }

    if (model.current === undefined && !(window as any).puryFiImageByBlob) {
      console.info('loading nsfw model from assets');
      model.current = await loadmodel(settings.purify.modelUrl);
    }

    setState((prevState) => ({
      ...prevState,
      phase: 'VIDEOGAME',
      videoUrl: videoUrl,
      pauseUntil: Date.now() + 1000,
    }));

    if (settings.rules.fullscreen) {
      await document
        .getElementsByClassName('app')[0]
        .requestFullscreen({ navigationUI: 'hide' });
    }
  }

  useEffect(() => {
    // Tear down
    return () => {
      console.info('tear down MainComponent');
      tobiiWs.current?.stop();
      xtoys.current?.stop();
    };
  }, []);

  return (
    <div className="app">
      <main>
        <h1>{state.phase}</h1>

        {state.phase === 'SETUP' ? (
          <div className="flex">
            <div className="setupForms">
              <SlideGameConfigurator
                onGameStart={startSlideGame}
              ></SlideGameConfigurator>
              <ABSlideGameConfigurator
                onGameStart={() => alert('not implemented')}
              ></ABSlideGameConfigurator>
              <VideoGameConfigurator
                onGameStart={startVideoGame}
              ></VideoGameConfigurator>

              <ConfigMenu
                settings={settings}
                onSettingsChanged={(settings) => {
                  console.log(settings);
                  setSettings((prev) => ({ ...prev, ...settings }));
                }}
              />
            </div>
          </div>
        ) : (
          ''
        )}

        {state.phase === 'WON' ? (
          <h1 className="won">
            You made it! Your score: {state.lastGameStats?.points}. Hit reload
            to start over.
            <button
              onClick={() => setState((old) => ({ ...old, phase: 'SETUP' }))}
            >
              Back to config
            </button>
          </h1>
        ) : (
          ''
        )}

        {state.phase === 'INGAME' ? (
          <SlideGame
            model={model.current!}
            settings={settings}
            slides={state.slides}
            gaze$={gaze$.current}
            onGameResult={win}
          ></SlideGame>
        ) : (
          ''
        )}

        {state.phase === 'VIDEOGAME' ? (
          <VideoGame
            model={model.current!}
            settings={settings}
            xtoys={xtoys.current}
            videoUrl={state.videoUrl!}
            gaze$={gaze$.current}
            onGameResult={win}
          ></VideoGame>
        ) : (
          ''
        )}
      </main>
    </div>
  );
};
