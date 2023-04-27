import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import './SlideGameConfigurator.css';
import { RegionType } from './rules';

interface State {
  files: { [P in RegionType]: readonly File[] };
}

const DEFAULT_STATE = {
  shuffle: false,
  files: { FOCUS: [], SOFT_PUNISH: [], HARD_PUNISH: [] },
};

interface Props {
  readonly onGameStart: (files: {
    [P in RegionType]: readonly File[];
  }) => unknown;
}

export const ABSlideGameConfigurator: React.FC<Props> = (props: Props) => {
  const goodImageSelector = useRef<HTMLInputElement>(null);
  const badImageSelector = useRef<HTMLInputElement>(null);
  const punishImageSelector = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<State>(DEFAULT_STATE);

  const hasAnyImage = state.files.FOCUS.length > 0;

  useEffect(() => {
    (goodImageSelector.current as any).webkitdirectory = 'true';
    (badImageSelector.current as any).webkitdirectory = 'true';
    (punishImageSelector.current as any).webkitdirectory = 'true';
  }, []);

  function startGame() {
    props.onGameStart(state.files);
  }

  function filterFiles(nativeFiles: FileList | null): File[] {
    const allFiles = Array.from(nativeFiles || []);
    const imageFiles: File[] = allFiles.filter(isImage);
    // sort them by name
    imageFiles.sort((a, b) => a.name.localeCompare(b.name));
    return imageFiles;
  }

  return (
    <details open={true}>
      <summary>Start A/B Gallery Mode</summary>
      <p>
        This gallery uses images from two folders where one folder containers
        desireable images and other folders contains undesirable or forbidden
        images. Images are presented side by side and the user must only look at
        desireable images.
      </p>
      <fieldset>
        <label>
          Good images:
          <input
            ref={goodImageSelector}
            type="file"
            onChange={(e) =>
              setState((state) => ({
                ...state,
                files: {
                  ...state.files,
                  FOCUS: filterFiles(e.target.files),
                },
              }))
            }
          />
        </label>
        <br />
        <label>
          Bad images:
          <input
            ref={badImageSelector}
            type="file"
            onChange={(e) =>
              setState((state) => ({
                ...state,
                files: {
                  ...state.files,
                  SOFT_PUNISH: filterFiles(e.target.files),
                },
              }))
            }
          />
        </label>
        <br />
        <label>
          Forbidden images (harsh punishment):
          <input
            ref={punishImageSelector}
            type="file"
            onChange={(e) =>
              setState((state) => ({
                ...state,
                files: {
                  ...state.files,
                  HARD_PUNISH: filterFiles(e.target.files),
                },
              }))
            }
          />
        </label>

        <button disabled={!hasAnyImage} onClick={startGame}>
          Start Game
        </button>
      </fieldset>
    </details>
  );
};

function isImage(f: File): boolean {
  return (
    f.type === 'image/jpeg' || f.type === 'image/png' || f.type === 'image/webp'
  );
}
