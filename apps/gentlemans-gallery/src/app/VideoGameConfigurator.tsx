import * as React from 'react';
import { ChangeEvent, useRef, useState } from 'react';

import './ConfigMenu.css';

interface State {
  readonly videoUrl: URL | string | undefined;
}

const DEFAULT_STATE: State = {
  videoUrl:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
};

interface Props {
  readonly onGameStart: (videoUrl: URL | string) => unknown;
}

export const VideoGameConfigurator: React.FC<Props> = (props: Props) => {
  const fileSelector = useRef<HTMLInputElement>(null);
  const urlInput = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<State>(DEFAULT_STATE);

  function startGame() {
    if (state.videoUrl) props.onGameStart(state.videoUrl);
  }

  function handleUrlChange(e: ChangeEvent<HTMLInputElement>) {
    setState((old) => ({ ...old, videoUrl: e.target.value }));
  }

  async function handlePurifyFileSelection(e: ChangeEvent<HTMLInputElement>) {
    const nativeFiles: FileList = e.target.files!;
    const objectUrl = window.URL.createObjectURL(nativeFiles[0]);

    setState((old) => ({ ...old, videoUrl: objectUrl }));
  }

  return (
    <details open>
      <summary>Start with a video (local or URL)</summary>
      <p>Select a file from the input or provide a URL.</p>
      <fieldset>
        <div className="form-group">
          <label>
            Select a local video
            <input
              ref={fileSelector}
              accept="video/mp4,video/x-m4v,video/*"
              type="file"
              onChange={(e) => handlePurifyFileSelection(e)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Select a URL
            <input
              ref={urlInput}
              type="text"
              onChange={(e) => handlePurifyFileSelection(e)}
              value={typeof state.videoUrl == 'string' ? state.videoUrl : ''}
            />
          </label>
        </div>

        <button
          onClick={() => startGame()}
          disabled={state.videoUrl === undefined}
        >
          Start here!
        </button>
      </fieldset>
    </details>
  );
};
