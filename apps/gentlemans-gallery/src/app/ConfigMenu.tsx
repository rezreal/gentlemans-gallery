import * as React from 'react';
import {ChangeEvent, Component, ReactNode, RefObject} from 'react';

import {defaultRules, RegionType} from './rules';
import {loadDemoImages} from './demo';
import {DetectionType} from './PurifyModel';
import {Settings} from './Settings';
import './ConfigMenu.css';

interface State {
  files: { [P in RegionType]: readonly File[] };
}

interface Props {
  settings: Settings;
  onSettingsChanged: (changed: Settings) => void;
  handleFileSelection: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAlternativeSelection: (files: {
    [P in RegionType]: readonly File[];
  }) => void;
  onSelectCoyoteDeviceClicked: () => void;
  onForgetCoyoteDeviceClicked: () => void;
}

export class ConfigMenu extends Component<Props, State> {
  private readonly fileSelector: RefObject<HTMLInputElement>;
  private readonly goodImageSelector: RefObject<HTMLInputElement>;
  private readonly badImageSelector: RefObject<HTMLInputElement>;
  private readonly punishImageSelector: RefObject<HTMLInputElement>;

  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {files: {HARD_PUNISH: [], FOCUS: [], SOFT_PUNISH: []}};
    this.fileSelector = React.createRef();
    this.goodImageSelector = React.createRef();
    this.badImageSelector = React.createRef();
    this.punishImageSelector = React.createRef();
  }

  componentDidMount() {
    (this.fileSelector.current as any).webkitdirectory = 'true';
    (this.goodImageSelector.current as any).webkitdirectory = 'true';
    (this.badImageSelector.current as any).webkitdirectory = 'true';
    (this.punishImageSelector.current as any).webkitdirectory = 'true';
  }

  render(): ReactNode {
    return (
      <div className="setupForms">

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
            </a>.<br />
            This model is private. Please provide a url to the model (where it is accessible from your browser).
          </p>
          <div className="form-group">
            <label>
              Url to model
              <input
                type="url"
                value={this.props.settings.modelUrl}
                onChange={(e) =>
                  this.props.onSettingsChanged({
                    ...this.props.settings,
                    modelUrl: e.target.value,
                  })
                }
              />
            </label>
          </div>

        </details>

        <details open>
          <summary>Start with local gallery</summary>
          <p>Just select a directory that contains images. Yay.</p>
          <div className="form-group">
            <label>
              Select a gallery folder
              <input
                ref={this.fileSelector}
                type="file"
                onChange={(e) => this.props.handleFileSelection(e)}
              />
            </label>
          </div>
          <p>
            Suggestions/PRs for a public domain sample gallery are welcome!
            <button disabled={true} //fixme: implement
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
        </details>
        <details>
          <summary>Select alternative Mode gallery</summary>
          <p>
            This gallery uses images from two folders where one folder
            containers desireable images and other folders contains undesirable
            or forbidden images.
          </p>
          <fieldset>
            <label>
              Good images:
              <input
                ref={this.goodImageSelector}
                type="file"
                onChange={(e) =>
                  this.setState((state) => ({
                    ...state,
                    files: {
                      ...state.files,
                      FOCUS: Array.from(e.target.files as ArrayLike<File>),
                    },
                  }))
                }
              />
            </label>
            <br/>
            <label>
              Bad images:
              <input
                ref={this.badImageSelector}
                type="file"
                onChange={(e) =>
                  this.setState((state) => ({
                    ...state,
                    files: {
                      ...state.files,
                      SOFT_PUNISH: Array.from(e.target.files as ArrayLike<File>),
                    },
                  }))
                }
              />
            </label>
            <br/>
            <label>
              Forbidden images (harsh punishment):
              <input
                ref={this.punishImageSelector}
                type="file"
                onChange={(e) =>
                  this.setState((state) => ({
                    ...state,
                    files: {
                      ...state.files,
                      HARD_PUNISH: Array.from(e.target.files as ArrayLike<File>),
                    },
                  }))
                }
              />
            </label>
            <button
              onClick={() =>
                this.props.handleAlternativeSelection(this.state.files)
              }
            >
              Set Images
            </button>
          </fieldset>
        </details>

        <details open>
          <summary>Rules</summary>
          <ul>
            <li>
              Making Progress by looking at <br/>
              <select
                multiple={true}
                value={this.props.settings.rules.regionMapping.FOCUS}
                onChange={(e) =>
                  this.props.onSettingsChanged({
                    ...this.props.settings,
                    rules: {
                      ...this.props.settings.rules,
                      regionMapping: {
                        ...this.props.settings.rules.regionMapping,
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
                <option value="MALE_BREAST_EXPOSED">
                  male breast (exposed)
                </option>
                <option value="MALE_BREAST_COVERED">
                  male breast (covered)
                </option>
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
              <br/>
              for{' '}
              <input
                type="number"
                value={this.props.settings.rules.focusDuration}
                min="1"
                max="20"
                onChange={(e) =>
                  this.props.onSettingsChanged({
                    ...this.props.settings,
                    rules: {
                      ...this.props.settings.rules,
                      focusDuration: e.target.valueAsNumber,
                    },
                  })
                }
              />{' '}
              seconds
            </li>
            <li>
              Do not stare at <br/>
              <select
                multiple={true}
                value={this.props.settings.rules.regionMapping.SOFT_PUNISH}
                onChange={(e) =>
                  this.props.onSettingsChanged({
                    ...this.props.settings,
                    rules: {
                      ...this.props.settings.rules,
                      regionMapping: {
                        ...this.props.settings.rules.regionMapping,
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
                <option value="MALE_BREAST_EXPOSED">
                  male breast (exposed)
                </option>
                <option value="MALE_BREAST_COVERED">
                  male breast (covered)
                </option>
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
              Especially do not stare at (Hard punished) <br/>
              <select
                multiple={true}
                value={this.props.settings.rules.regionMapping.HARD_PUNISH}
                onChange={(e) =>
                  this.props.onSettingsChanged({
                    ...this.props.settings,
                    rules: {
                      ...this.props.settings.rules,
                      regionMapping: {
                        ...this.props.settings.rules.regionMapping,
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
                <option value="MALE_BREAST_EXPOSED">
                  male breast (exposed)
                </option>
                <option value="MALE_BREAST_COVERED">
                  male breast (covered)
                </option>
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
                  checked={this.props.settings.rules.showGaze}
                  onChange={(e) =>
                    this.props.onSettingsChanged({
                      ...this.props.settings,
                      rules: {
                        ...this.props.settings.rules,
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
                  checked={this.props.settings.rules.allowSkipImage}
                  onChange={(e) =>
                    this.props.onSettingsChanged({
                      ...this.props.settings,
                      rules: {
                        ...this.props.settings.rules,
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
                  value={this.props.settings.rules.softFilter}
                  onChange={(e) =>
                    this.props.onSettingsChanged({
                      ...this.props.settings,
                      rules: {
                        ...this.props.settings.rules,
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
                  checked={this.props.settings.rules.playSounds}
                  onChange={(e) =>
                    this.props.onSettingsChanged({
                      ...this.props.settings,
                      rules: {
                        ...this.props.settings.rules,
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
                    checked={this.props.settings.rules.fullscreen}
                    onChange={(e) =>
                      this.props.onSettingsChanged({
                        ...this.props.settings,
                        rules: {
                          ...this.props.settings.rules,
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
                  checked={this.props.settings.rules.shuffleGallery}
                  onChange={(e) =>
                    this.props.onSettingsChanged({
                      ...this.props.settings,
                      rules: {
                        ...this.props.settings.rules,
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
              this.props.onSettingsChanged({
                ...this.props.settings,
                rules: defaultRules,
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
                checked={this.props.settings.xtoys.use}
                onChange={(e) =>
                  this.props.onSettingsChanged({
                    ...this.props.settings,
                    xtoys: {
                      ...this.props.settings.xtoys,
                      use: e.target.checked,
                    },
                  })
                }
              />
            </label>
          </div>
          {this.props.settings.xtoys.use ? (
            <div>
              <div className="form-group">
                <p>
                  You have to register a custom toy at{' '}
                  <a href="https://xtoys.app/me/custom-toys">XToys.app</a>.
                  Create a new toy of type XToys Webhook Toy, choose the type "Generic
                  Input/Output". Choose a name and/or description as you prefer.
                  Click "Generate Websocket Info". Then save your toy and add
                  the generated websocket and token codes here:
                </p>
                <label>
                  Websocket:
                  <input
                    type="text"
                    value={this.props.settings.xtoys.websocket}
                    onChange={(e) =>
                      this.props.onSettingsChanged({
                        ...this.props.settings,
                        xtoys: {
                          ...this.props.settings.xtoys,
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
                    value={this.props.settings.xtoys.token}
                    onChange={(e) =>
                      this.props.onSettingsChanged({
                        ...this.props.settings,
                        xtoys: {
                          ...this.props.settings.xtoys,
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
            You can try this gallery via mouse but it is intended to be used
            with a eye tracking devices. Currently the Tobii Eye 4C is supported
            using the
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
                checked={this.props.settings.tobii.use}
                onChange={(e) =>
                  this.props.onSettingsChanged({
                    ...this.props.settings,
                    tobii: {
                      ...this.props.settings.tobii,
                      use: e.target.checked,
                    },
                  })
                }
              />
            </label>
          </div>
          {this.props.settings.tobii.use ? (
            <div className="form-group">
              <label>
                Disable mouse?
                <input
                  type="checkbox"
                  checked={this.props.settings.tobii.disableMouse}
                  onChange={(e) =>
                    this.props.onSettingsChanged({
                      ...this.props.settings,
                      tobii: {
                        ...this.props.settings.tobii,
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
          {this.props.settings.tobii.use ? (
            <div className="form-group">
              <label>
                Tobii Websocket Server
                <input
                  type="text"
                  value={this.props.settings.tobii.server || ''}
                  onChange={(e) => {
                    this.props.onSettingsChanged({
                      ...this.props.settings,
                      tobii: {
                        ...this.props.settings.tobii,
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
            access to use of your camera. The video is only processed locally
            and not sent anywhere.
          </p>
          <div className="form-group">
            <label>
              Use Webgazer?
              <input disabled={true}
                type="checkbox"
                checked={this.props.settings.webgazer.use}
                onChange={async (e) => {
                  this.props.onSettingsChanged({
                    ...this.props.settings,
                    webgazer: {
                      ...this.props.settings.webgazer,
                      use: e.target.checked,
                    },
                  });
                }}
              />
            </label>
          </div>
        </details>

        <details>
          <summary>DG-Labs Coyote</summary>
          <p>
            Punishments and teasing should be real! Link your DG-Labs Coyote
            EStim device to feel real punishments. Make sure you run a
            web-bluetooth compatible browser (e.g. Chrome or Edge).
          </p>
          <div className="form-group">
            <label>
              Use Coyote?
              <input
                type="checkbox"
                checked={this.props.settings.coyote.use}
                onChange={(e) =>
                  this.props.onSettingsChanged({
                    ...this.props.settings,
                    coyote: {
                      ...this.props.settings.coyote,
                      use: e.target.checked,
                    },
                  })
                }
              />
            </label>
          </div>
          {this.props.settings.coyote.use ? (
            <div className="form-group">
              <button onClick={(e) => this.props.onSelectCoyoteDeviceClicked()}>
                {!this.props.settings.coyote.pairedDeviceId
                  ? 'Select device'
                  : 'Reconnect device'}
              </button>
              {this.props.settings.coyote.pairedDeviceId ? (
                <div>
                  <label>
                    DeviceId:{' '}
                    <input
                      type="text"
                      readOnly={true}
                      value={this.props.settings.coyote.pairedDeviceId}
                    />
                  </label>
                  <button
                    onClick={() => this.props.onForgetCoyoteDeviceClicked()}
                  >
                    Forget Device
                  </button>
                  <div className="form-group">
                    <label>
                      Power Level (Channel A)
                      <input
                        type="number"
                        step="7"
                        value={this.props.settings.coyote.powerLevel}
                        onChange={(e) => {
                          this.props.onSettingsChanged({
                            ...this.props.settings,
                            coyote: {
                              ...this.props.settings.coyote,
                              powerLevel: e.target.valueAsNumber,
                            },
                          });
                        }}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </details>
      </div>
    );
  }
}
