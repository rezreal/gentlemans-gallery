import * as React from 'react';

import { DEFAULT_RULES, RegionType } from './rules';
import { DetectionType } from './PurifyModel';
import { Settings } from './Settings';
import './ConfigMenu.css';

interface Props {
  settings: Settings;
  onSettingsChanged: (changed: Settings) => void;
}

export const ConfigMenu: React.FC<Props> = (props: Props) => {
  return (
    <>
      <details open>
        <summary>Configure Pury.fi</summary>
        <p>
          This tool runs{' '}
          <a href="https://pury.fi/site/puryfi-for-firefox">
            with AI support from Pury.fi
            <img
              width="64"
              alt="Pury.fi"
              src="https://pury.fi/site/wp-content/uploads/2021/09/breast_round_black.png"
            />
          </a>
          .<br />
          This model is private. Please provide a url to the model (where it is
          accessible from your browser).
        </p>
        <div className="form-group">
          <label>
            Url to model
            <input
              type="url"
              value={props.settings.purify.modelUrl}
              onChange={(e) =>
                props.onSettingsChanged({
                  ...props.settings,
                  purify: {
                    ...props.settings.purify,
                    modelUrl: e.target.value,
                  },
                })
              }
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Model Confidence Threshold
            <input
              type="number"
              max={1}
              min={0}
              step={0.05}
              value={props.settings.purify.confidenceThreshold}
              onChange={(e) =>
                props.onSettingsChanged({
                  ...props.settings,
                  purify: {
                    ...props.settings.purify,
                    confidenceThreshold: e.target.valueAsNumber,
                  },
                })
              }
            />
          </label>
        </div>
      </details>

      <details open>
        <summary>Rules</summary>
        <ul>
          <li>
            Making Progress by looking at <br />
            <select
              multiple={true}
              value={props.settings.rules.regionMapping.FOCUS}
              onChange={(e) =>
                props.onSettingsChanged({
                  ...props.settings,
                  rules: {
                    ...props.settings.rules,
                    regionMapping: {
                      ...props.settings.rules.regionMapping,
                      FOCUS: (
                        Array.from(e.target.options) as HTMLOptionElement[]
                      )
                        .filter((i) => i.selected)
                        .map((i) => i.value) as DetectionType[],
                    },
                  },
                })
              }
            >
              <option value="FACE_FEMALE">female Face</option>
              <option value="FACE_MALE">male Face</option>
              <option value="ARMPITS_EXPOSED">armpits (exposed)</option>
              <option value="FEET_COVERED">feet (covered)</option>
              <option value="FEET_EXPOSED">feet (exposed)</option>
              <option value="BELLY_EXPOSED">belly (exposed)</option>
              <option value="BELLY_COVERED">belly (covered)</option>
              <option value="ANUS_EXPOSED">anus (exposed)</option>
              <option value="ANUS_COVERED">anus (covered)</option>
              <option value="BUTTOCKS_EXPOSED">buttocks (exposed)</option>
              <option value="MALE_GENITALIA_EXPOSED">
                male genitalia (exposed)
              </option>
              <option value="MALE_GENITALIA_COVERED">
                male genitalia (covered)
              </option>
              <option value="MALE_BREAST_EXPOSED">male breast (exposed)</option>
              <option value="MALE_BREAST_COVERED">male breast (covered)</option>
              <option value="FEMALE_BREAST_EXPOSED">
                female breast (exposed)
              </option>
              <option value="FEMALE_BREAST_COVERED">
                female breast (covered)
              </option>
              <option value="FEMALE_GENITALIA_EXPOSED">
                female genitalia (exposed)
              </option>
              <option value="FEMALE_GENITALIA_COVERED">
                female genitalia (covered)
              </option>
            </select>
            <br />
            for{' '}
            <input
              type="number"
              value={props.settings.rules.focusDuration}
              min="1"
              max="20"
              onChange={(e) =>
                props.onSettingsChanged({
                  ...props.settings,
                  rules: {
                    ...props.settings.rules,
                    focusDuration: e.target.valueAsNumber,
                  },
                })
              }
            />{' '}
            seconds
          </li>
          <li>
            Do not stare at <br />
            <select
              multiple={true}
              value={props.settings.rules.regionMapping.SOFT_PUNISH}
              onChange={(e) =>
                props.onSettingsChanged({
                  ...props.settings,
                  rules: {
                    ...props.settings.rules,
                    regionMapping: {
                      ...props.settings.rules.regionMapping,
                      SOFT_PUNISH: (
                        Array.from(e.target.options) as HTMLOptionElement[]
                      )
                        .filter((i) => i.selected)
                        .map((i) => i.value) as DetectionType[],
                    },
                  },
                })
              }
            >
              <option value="FACE_FEMALE">female Face</option>
              <option value="FACE_MALE">male Face</option>
              <option value="ARMPITS_EXPOSED">armpits (exposed)</option>
              <option value="FEET_COVERED">feet (covered)</option>
              <option value="FEET_EXPOSED">feet (exposed)</option>
              <option value="BELLY_EXPOSED">belly (exposed)</option>
              <option value="BELLY_COVERED">belly (covered)</option>
              <option value="ANUS_EXPOSED">anus (exposed)</option>
              <option value="ANUS_COVERED">anus (covered)</option>
              <option value="BUTTOCKS_EXPOSED">buttocks (exposed)</option>
              <option value="MALE_GENITALIA_EXPOSED">
                male genitalia (exposed)
              </option>
              <option value="MALE_GENITALIA_COVERED">
                male genitalia (covered)
              </option>
              <option value="MALE_BREAST_EXPOSED">male breast (exposed)</option>
              <option value="MALE_BREAST_COVERED">male breast (covered)</option>
              <option value="FEMALE_BREAST_EXPOSED">
                female breast (exposed)
              </option>
              <option value="FEMALE_BREAST_COVERED">
                female breast (covered)
              </option>
              <option value="FEMALE_GENITALIA_EXPOSED">
                female genitalia (exposed)
              </option>
              <option value="FEMALE_GENITALIA_COVERED">
                female genitalia (covered)
              </option>
            </select>{' '}
            !
          </li>
          <li>
            Especially do not stare at (Hard punished) <br />
            <select
              multiple={true}
              value={props.settings.rules.regionMapping.HARD_PUNISH}
              onChange={(e) =>
                props.onSettingsChanged({
                  ...props.settings,
                  rules: {
                    ...props.settings.rules,
                    regionMapping: {
                      ...props.settings.rules.regionMapping,
                      HARD_PUNISH: (
                        Array.from(e.target.options) as HTMLOptionElement[]
                      )
                        .filter((i) => i.selected)
                        .map((i) => i.value) as DetectionType[],
                    },
                  },
                })
              }
            >
              <option value="FACE_FEMALE">female Face</option>
              <option value="FACE_MALE">male Face</option>
              <option value="ARMPITS_EXPOSED">armpits (exposed)</option>
              <option value="FEET_COVERED">feet (covered)</option>
              <option value="FEET_EXPOSED">feet (exposed)</option>
              <option value="BELLY_EXPOSED">belly (exposed)</option>
              <option value="BELLY_COVERED">belly (covered)</option>
              <option value="ANUS_EXPOSED">anus (exposed)</option>
              <option value="ANUS_COVERED">anus (covered)</option>
              <option value="BUTTOCKS_EXPOSED">buttocks (exposed)</option>
              <option value="MALE_GENITALIA_EXPOSED">
                male genitalia (exposed)
              </option>
              <option value="MALE_GENITALIA_COVERED">
                male genitalia (covered)
              </option>
              <option value="MALE_BREAST_EXPOSED">male breast (exposed)</option>
              <option value="MALE_BREAST_COVERED">male breast (covered)</option>
              <option value="FEMALE_BREAST_EXPOSED">
                female breast (exposed)
              </option>
              <option value="FEMALE_BREAST_COVERED">
                female breast (covered)
              </option>
              <option value="FEMALE_GENITALIA_EXPOSED">
                female genitalia (exposed)
              </option>
              <option value="FEMALE_GENITALIA_COVERED">
                female genitalia (covered)
              </option>
            </select>{' '}
            !
          </li>
          <li>Not following these rules will be punished.</li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={props.settings.rules.showGaze}
                onChange={(e) =>
                  props.onSettingsChanged({
                    ...props.settings,
                    rules: {
                      ...props.settings.rules,
                      showGaze: e.target.checked,
                    },
                  })
                }
              />{' '}
              Gaze tracing
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={props.settings.rules.allowSkipImage}
                onChange={(e) =>
                  props.onSettingsChanged({
                    ...props.settings,
                    rules: {
                      ...props.settings.rules,
                      allowSkipImage: e.target.checked,
                    },
                  })
                }
              />{' '}
              Allow skip image
            </label>
          </li>
          <li>
            <label>
              Visual Warning{' '}
              <select
                value={props.settings.rules.softFilter}
                onChange={(e) =>
                  props.onSettingsChanged({
                    ...props.settings,
                    rules: {
                      ...props.settings.rules,
                      softFilter: e.target.value as any,
                    },
                  })
                }
              >
                {' '}
                <option value="saturate">Saturate</option>
                <option value="pixelate">Pixelate</option>
              </select>
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={props.settings.rules.playSounds}
                onChange={(e) =>
                  props.onSettingsChanged({
                    ...props.settings,
                    rules: {
                      ...props.settings.rules,
                      playSounds: e.target.checked,
                    },
                  })
                }
              />{' '}
              Play Sounds
            </label>
          </li>
          {document.fullscreenEnabled ? (
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={props.settings.rules.fullscreen}
                  onChange={(e) =>
                    props.onSettingsChanged({
                      ...props.settings,
                      rules: {
                        ...props.settings.rules,
                        fullscreen: e.target.checked,
                      },
                    })
                  }
                />{' '}
                Fullscreen
              </label>
            </li>
          ) : (
            ''
          )}
          <li>
            <label>
              <input
                type="checkbox"
                checked={props.settings.rules.shuffleGallery}
                onChange={(e) =>
                  props.onSettingsChanged({
                    ...props.settings,
                    rules: {
                      ...props.settings.rules,
                      shuffleGallery: e.target.checked,
                    },
                  })
                }
              />{' '}
              Shuffle Gallery
            </label>
          </li>
        </ul>
        <button
          onClick={(e) =>
            props.onSettingsChanged({
              ...props.settings,
              rules: DEFAULT_RULES,
            })
          }
        >
          Reset to defaults
        </button>
      </details>

      <details>
        <summary>XToys.app</summary>
        <div className="form-group">
          <label>
            Use XToys.app?
            <input
              type="checkbox"
              checked={props.settings.xtoys.use}
              onChange={(e) =>
                props.onSettingsChanged({
                  ...props.settings,
                  xtoys: {
                    ...props.settings.xtoys,
                    use: e.target.checked,
                  },
                })
              }
            />
          </label>
        </div>
        {props.settings.xtoys.use ? (
          <div>
            <div className="form-group">
              <p>
                You have to register a custom toy at{' '}
                <a href="https://xtoys.app/me/custom-toys">XToys.app</a>. Create
                a new toy of type XToys Webhook Toy, choose the type "Generic
                Input/Output". Choose a name and/or description as you prefer.
                Click "Generate Websocket Info". Then save your toy and add the
                generated websocket and token codes here:
              </p>
              <label>
                Websocket:
                <input
                  type="text"
                  value={props.settings.xtoys.websocket}
                  onChange={(e) =>
                    props.onSettingsChanged({
                      ...props.settings,
                      xtoys: {
                        ...props.settings.xtoys,
                        websocket: e.target.value,
                      },
                    })
                  }
                />
              </label>
              <label>
                Token:
                <input
                  type="text"
                  value={props.settings.xtoys.token}
                  onChange={(e) =>
                    props.onSettingsChanged({
                      ...props.settings,
                      xtoys: {
                        ...props.settings.xtoys,
                        token: e.target.value,
                      },
                    })
                  }
                />
              </label>
            </div>
          </div>
        ) : (
          ''
        )}
      </details>

      <details>
        <summary>Tobii EyeX</summary>
        <p>
          You can try this gallery via mouse but it is intended to be used with
          a eye tracking devices. Currently the Tobii Eye 4C is supported using
          the
          <a
            href="https://github.com/rezreal/Tobii-EyeX-Web-Socket-Server/releases"
            target="_blank"
          >
            Tobii-EyeX-Web-Socket-Server
          </a>
          . As a preparation, install your Tobii Tracking software and launch
          the <em>TobiiSocketServer.exe</em>.
        </p>
        <div className="form-group">
          <label>
            Use Tobii?
            <input
              type="checkbox"
              checked={props.settings.tobii.use}
              onChange={(e) =>
                props.onSettingsChanged({
                  ...props.settings,
                  tobii: {
                    ...props.settings.tobii,
                    use: e.target.checked,
                  },
                })
              }
            />
          </label>
        </div>
        {props.settings.tobii.use ? (
          <div className="form-group">
            <label>
              Disable mouse?
              <input
                type="checkbox"
                checked={props.settings.tobii.disableMouse}
                onChange={(e) =>
                  props.onSettingsChanged({
                    ...props.settings,
                    tobii: {
                      ...props.settings.tobii,
                      disableMouse: e.target.checked,
                    },
                  })
                }
              />
            </label>
          </div>
        ) : (
          ''
        )}
        {props.settings.tobii.use ? (
          <div className="form-group">
            <label>
              Tobii Websocket Server
              <input
                type="text"
                value={props.settings.tobii.server || ''}
                onChange={(e) => {
                  props.onSettingsChanged({
                    ...props.settings,
                    tobii: {
                      ...props.settings.tobii,
                      server: e.target.value,
                    },
                  });
                }}
              />
            </label>
          </div>
        ) : (
          ''
        )}
      </details>

      <details>
        <summary>WebGazer (not yet implemented)</summary>
        <p>
          You can use WebGazer to track your gaze via webcam. You must permit
          access to use of your camera. The video is only processed locally and
          not sent anywhere.
        </p>
        <div className="form-group">
          <label>
            Use Webgazer?
            <input
              disabled={true}
              type="checkbox"
              checked={props.settings.webgazer.use}
              onChange={async (e) => {
                props.onSettingsChanged({
                  ...props.settings,
                  webgazer: {
                    ...props.settings.webgazer,
                    use: e.target.checked,
                  },
                });
              }}
            />
          </label>
        </div>
      </details>
    </>
  );
};
