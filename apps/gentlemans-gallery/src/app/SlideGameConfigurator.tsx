import * as React from 'react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { loadDemoImages } from './demo';

import './ConfigMenu.css';

interface State {
  readonly files: File[];
  readonly shuffle: boolean;
}

const DEFAULT_STATE = { shuffle: false, files: [] };

interface Props {
  readonly onGameStart: (images: readonly File[]) => unknown;
}

export const SlideGameConfigurator: React.FC<Props> = (props: Props) => {
  const fileSelector = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<State>(DEFAULT_STATE);

  useEffect(() => {
    (fileSelector.current as any).webkitdirectory = 'true';
  }, []);

  function startGame() {
    props.onGameStart(state.shuffle ? shuffleArray(state.files) : state.files);
  }

  async function handlePurifyFileSelection(e: ChangeEvent<HTMLInputElement>) {
    const nativeFiles: FileList = e.target.files!;
    const allFiles = Array.from(nativeFiles);
    const imageFiles: File[] = allFiles.filter(isImage);
    // sort them by name
    imageFiles.sort((a, b) => a.name.localeCompare(b.name));

    setState((prevState) => ({
      ...prevState,
      files: imageFiles,
    }));
  }

  return (
    <details open>
      <summary>Start with local gallery</summary>
      <p>Just select a directory that contains images. Yay.</p>
      <div className="form-group">
        <label>
          Select a gallery folder
          <input
            ref={fileSelector}
            type="file"
            onChange={(e) => handlePurifyFileSelection(e)}
          />
        </label>
      </div>
      <p>
        Suggestions/PRs for a public domain sample gallery are welcome!
        <button
          disabled={true} //fixme: implement
          onClick={() =>
            loadDemoImages().then((dis) =>
              //this.props.handleAlternativeSelection(dis)
              alert('FIXME! need to be reimplemented')
            )
          }
        >
          Load demo images (to be implemented)
        </button>
      </p>
      <label>
        <input
          type="checkbox"
          checked={state.shuffle}
          onChange={(e) =>
            setState((s) => ({ ...s, shuffle: e.target.checked || false }))
          }
        />{' '}
        Shuffle Gallery
      </label>

      <button onClick={() => startGame()} disabled={state.files.length == 0}>
        Start here ({state.files.length} slides)!
      </button>
    </details>
  );
};

function isImage(f: File): boolean {
  return (
    f.type === 'image/jpeg' || f.type === 'image/png' || f.type === 'image/webp'
  );
}
function shuffleArray<T>(arr: ReadonlyArray<T>): ReadonlyArray<T> {
  const mut = [...arr];
  for (let i = mut.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mut[i], mut[j]] = [mut[j], mut[i]];
  }
  return mut;
}
