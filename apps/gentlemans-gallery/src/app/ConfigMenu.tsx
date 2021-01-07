import {
  ChangeEvent,
  Component,
  ReactNode, RefObject
} from 'react';
import React from 'react';
import {defaultRules, RegionType} from "./rules";
import {loadDemoImages} from "./demo";
import {DetectionType} from "./purify";
import {Settings} from "./settings";
import './ConfigMenu.css';

interface State {
  files: { [P in RegionType]: readonly File[] };
}

interface Props {
  settings: Settings
  onSettingsChanged: (changed: Settings) => void
  handleFileSelection: (e: ChangeEvent<HTMLInputElement>) => void
  handleAlternativeSelection: (files: { [P in RegionType]: readonly File[] }) => void
  onSelectCoyoteDeviceClicked: () => void
  onForgetCoyoteDeviceClicked: () => void
}

export class ConfigMenu extends Component<Props, State> {

  private readonly fileSelector: RefObject<HTMLInputElement>;
  private readonly goodImageSelector: RefObject<HTMLInputElement>;
  private readonly badImageSelector: RefObject<HTMLInputElement>;
  private readonly punishImageSelector: RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.state = {files: { HARD_PUNISH:[], FOCUS: [], SOFT_PUNISH: [] }};
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
    return <div className="setupForms">
      <details open>
        <summary>Select local puri.fy gallery</summary>
        <p>
          This gallery uses the json metadata from the{' '}
          <a href="https://pury.fi/" target="_blank">
            pury.fi
          </a>{' '}
          NSFW model. To create a gallery, fetch the pury.fi offline tool{' '}
          <a href="https://discord.com/channels/347085342119297027/504704914568773670/629019675623424010">
            as described here
          </a>
          , start the detection for your images. Then select{' '}
          <em>Save JSON-Metadata</em> and run <em>Save Images</em>. Now
          copy all original images and all files from the{' '}
          <em>output/json</em> folder into a single directory and select
          it here.
        </p>
        <input
          ref={this.fileSelector}
          type="file"
          onChange={(e) => this.props.handleFileSelection(e)}
        />
        <p>
          Suggestions/PRs for a public domain sample gallery are welcome!
          <button
            onClick={() =>
              loadDemoImages().then((dis) =>
                this.props.onSettingsChanged({...this.props.settings, ...dis})
              )
            }
          >
            Load demo images
          </button>
        </p>
      </details>
      <details>
        <summary>Select alternative Mode gallery</summary>
        <p>
          This gallery uses images from two folders where one folder containers desireable images and
          other folders contains undesirable or forbidden images.
        </p>
        <fieldset>
          <label>Good images:<input
            ref={this.goodImageSelector}
            type="file"
            onChange={(e) => this.setState( state => ({...state, files: {...state.files, FOCUS: Array.from(e.target.files) }}))}
          /></label><br/>
          <label>Bad images:<input
            ref={this.badImageSelector}
            type="file"
            onChange={(e) => this.setState( state => ({...state, files: {...state.files, SOFT_PUNISH: Array.from(e.target.files) }}))}
          /></label><br/>
          <label>Forbidden images (harsh punishment):<input
            ref={this.punishImageSelector}
            type="file"
            onChange={(e) => this.setState( state => ({...state, files: {...state.files, HARD_PUNISH: Array.from(e.target.files) }}))}
          /></label>
          <button onClick={() => this.props.handleAlternativeSelection(this.state.files)}>Set Images</button>

        </fieldset>
      </details>

      <details open>
        <summary>Rules</summary>
        <ul>
          <li>
            Making Progress by looking at{' '}<br />
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
                      FOCUS: (Array.from(
                        e.target.options
                      ) as HTMLOptionElement[])
                        .filter((i) => i.selected)
                        .map((i) => i.value) as DetectionType[]
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
            </select><br/>
            for{' '}
            <input
              type="number"
              value={this.props.settings.rules.focusDuration}
              min="1"
              max="20"
              onChange={(e) =>
                this.props.onSettingsChanged({
                  ...this.props.settings,
                  ...this.props,
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
            Do not stare at{' '}<br/>
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
                      SOFT_PUNISH: (Array.from(
                        e.target.options
                      ) as HTMLOptionElement[])
                        .filter((i) => i.selected)
                        .map((i) => i.value) as DetectionType[]
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
            Especially do not stare at (Hard punished){' '}<br />
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
                      HARD_PUNISH: (Array.from(
                        e.target.options
                      ) as HTMLOptionElement[])
                        .filter((i) => i.selected)
                        .map((i) => i.value) as DetectionType[]

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
        <button onClick={(e) => this.props.onSettingsChanged({...this.props.settings, rules: defaultRules})}>
          Reset to defaults
        </button>
      </details>

      <details>
        <summary>Configure MQTT</summary>
        <div className="form-group">
          <label>
            Use MQTT?
            <input
              type="checkbox"
              checked={this.props.settings.mqtt.use}
              onChange={(e) =>
                this.props.onSettingsChanged({
                  ...this.props.settings,
                  mqtt: {...this.props.settings.mqtt, use: e.target.checked},
                })
              }
            />
          </label>
        </div>
        {this.props.settings.mqtt.use ? (
          <div>
            <div className="form-group">
              <label>
                MQTT Server
                <input
                  type="text"
                  value={this.props.settings.mqtt.server}
                  onChange={(e) =>
                    this.props.onSettingsChanged({
                      ...this.props.settings,
                      mqtt: {...this.props.settings.mqtt, server: e.target.value},
                    })
                  }
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Auth?
                <input
                  type="checkbox"
                  checked={this.props.settings.mqtt.auth}
                  onChange={(e) =>
                    this.props.onSettingsChanged({
                      ...this.props.settings,
                      mqtt: {...this.props.settings.mqtt, auth: e.target.checked},
                    })
                  }
                />
              </label>
              {this.props.settings.mqtt.auth ? (
                <div>
                  <label>
                    Username
                    <input
                      type="text"
                      value={this.props.settings.mqtt.username}
                      onChange={(e) =>
                        this.props.onSettingsChanged({
                          ...this.props.settings,
                          mqtt: {
                            ...this.props.settings.mqtt,
                            username: e.target.value,
                          },
                        })
                      }
                    />
                  </label>
                  <label>
                    Password
                    <input
                      type="password"
                      value={this.props.settings.mqtt.password}
                      onChange={(e) =>
                        this.props.onSettingsChanged({
                          ...this.props.settings,
                          mqtt: {
                            ...this.props.settings.mqtt,
                            password: e.target.value,
                          },
                        })
                      }
                    />
                  </label>
                </div>
              ) : (
                ''
              )}
            </div>

            <div className="form-group">
              <legend>Tease</legend>
              <ul>
                <li>
                  <label>
                    Topic
                    <input
                      type="text"
                      value={this.props.settings.mqtt.topics.teaseTopic?.name}
                      onChange={(e) =>
                        this.props.onSettingsChanged({
                          ...this.props.settings,
                          mqtt: {
                            ...this.props.settings.mqtt,
                            topics: {
                              ...this.props.settings.mqtt.topics,
                              teaseTopic: {
                                ...(this.props.settings.mqtt.topics.teaseTopic || {
                                  name: '',
                                  message: '',
                                }),
                                name: e.target.value,
                              },
                            },
                          },
                        })
                      }
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Message
                    <input
                      type="text"
                      value={this.props.settings.mqtt.topics.teaseTopic?.message}
                      onChange={(e) =>
                        this.props.onSettingsChanged({
                          ...this.props.settings,
                          mqtt: {
                            ...this.props.settings.mqtt,
                            topics: {
                              ...this.props.settings.mqtt.topics,
                              teaseTopic: {
                                ...this.props.settings.mqtt.topics.teaseTopic,
                                message: e.target.value,
                              },
                            },
                          },
                        })
                      }
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Stop Message (optional)
                    <input
                      type="text"
                      value={this.props.settings.mqtt.topics.teaseTopic?.stopMessage}
                      onChange={(e) =>
                        this.props.onSettingsChanged({
                          ...this.props.settings,
                          mqtt: {
                            ...this.props.settings.mqtt,
                            topics: {
                              ...this.props.settings.mqtt.topics,
                              teaseTopic: {
                                ...this.props.settings.mqtt.topics.teaseTopic,
                                stopMessage: e.target.value?.trim(),
                              },
                            },
                          },
                        })
                      }
                    />
                  </label>
                </li>
              </ul>
            </div>
            <div className="form-group">
              <legend>Punishment</legend>
              <ul>
                <li>
                  <label>
                    Topic
                    <input
                      type="text"
                      value={this.props.settings.mqtt.topics.punishTopic?.name}
                      onChange={(e) =>
                        this.props.onSettingsChanged({
                          ...this.props.settings,
                          mqtt: {
                            ...this.props.settings.mqtt,
                            topics: {
                              ...this.props.settings.mqtt.topics,
                              punishTopic: {
                                ...(this.props.settings.mqtt.topics.punishTopic || {
                                  name: '',
                                  message: '',
                                }),
                                name: e.target.value,
                              },
                            },
                          },
                        })
                      }
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Message
                    <input
                      type="text"
                      value={this.props.settings.mqtt.topics.punishTopic?.message}
                      onChange={(e) =>
                        this.props.onSettingsChanged({
                          ...this.props.settings,
                          mqtt: {
                            ...this.props.settings.mqtt,
                            topics: {
                              ...this.props.settings.mqtt.topics,
                              punishTopic: {
                                ...this.props.settings.mqtt.topics.punishTopic,
                                message: e.target.value,
                              },
                            },
                          },
                        })
                      }
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Stop Message (optional)
                    <input
                      type="text"
                      value={
                        this.props.settings.mqtt.topics.punishTopic?.stopMessage
                      }
                      onChange={(e) =>
                        this.props.onSettingsChanged({
                          ...this.props.settings,
                          mqtt: {
                            ...this.props.settings.mqtt,
                            topics: {
                              ...this.props.settings.mqtt.topics,
                              punishTopic: {
                                ...this.props.settings.mqtt.topics.punishTopic,
                                stopMessage: e.target.value?.trim(),
                              },
                            },
                          },
                        })
                      }
                    />
                  </label>
                </li>
              </ul>
            </div>
            <div className="form-group">
              <legend>Restraints</legend>
              <ul>
                <li>
                  <label>
                    Renew Restraints
                    <input
                      type="text"
                      value={this.props.settings.mqtt.topics.renewRestraint?.name}
                      onChange={(e) =>
                        this.props.onSettingsChanged({
                          ...this.props.settings,
                          mqtt: {
                            ...this.props.settings.mqtt,
                            topics: {
                              ...this.props.settings.mqtt.topics,
                              renewRestraint: {
                                ...(this.props.settings.mqtt.topics
                                  .renewRestraint || {
                                  name: '',
                                  message: '',
                                }),
                                name: e.target.value,
                              },
                            },
                          },
                        })
                      }
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Message (this is posted every 15 seconds until the game
                    is won)
                    <input
                      type="text"
                      value={this.props.settings.mqtt.topics.renewRestraint?.message}
                      onChange={(e) =>
                        this.props.onSettingsChanged({
                          ...this.props.settings,
                          mqtt: {
                            ...this.props.settings.mqtt,
                            topics: {
                              ...this.props.settings.mqtt.topics,
                              renewRestraint: {
                                ...this.props.settings.mqtt.topics.renewRestraint,
                                message: e.target.value,
                              },
                            },
                          },
                        })
                      }
                    />
                  </label>
                </li>
                <li>
                  <label>
                    Open Message (sent when the game is won)
                    <input
                      type="text"
                      value={
                        this.props.settings.mqtt.topics.renewRestraint?.stopMessage
                      }
                      onChange={(e) =>
                        this.props.onSettingsChanged({
                          ...this.props.settings,
                          mqtt: {
                            ...this.props.settings.mqtt,
                            topics: {
                              ...this.props.settings.mqtt.topics,
                              renewRestraint: {
                                ...this.props.settings.mqtt.topics.renewRestraint,
                                stopMessage: e.target.value?.trim(),
                              },
                            },
                          },
                        })
                      }
                    />
                  </label>
                </li>
              </ul>
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
          with a eye tracking devices. Currently the Tobii Eye 4C is
          supported using the
          <a
            href="https://github.com/rezreal/Tobii-EyeX-Web-Socket-Server/releases"
            target="_blank"
          >
            Tobii-EyeX-Web-Socket-Server
          </a>
          . As a preparation, install your Tobii Tracking software and
          launch the <em>TobiiSocketServer.exe</em>.
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
                  tobii: {...this.props.settings.tobii, use: e.target.checked},
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
                value={this.props.settings.tobii.server}
                onChange={(e) => {
                  this.props.onSettingsChanged({
                    ...this.props.settings,
                    tobii: {...this.props.settings.tobii, server: e.target.value},
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
        <summary>DG-Labs Coyote</summary>
        <p>
          Punishments and teasing should be real! Link your DG-Labs Coyote EStim device to feel real punishments.
          Make sure you run a web-bluetooth compatible browser (e.g. Chrome or Edge).
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
                  coyote: {...this.props.settings.coyote, use: e.target.checked},
                })
              }
            />
          </label>
        </div>
        {this.props.settings.coyote.use ? (
          <div className="form-group">
            <button onClick={(e => this.props.onSelectCoyoteDeviceClicked())}>
                {!this.props.settings.coyote.pairedDeviceId ? ("Select device") : ("Reconnect device") }
            </button>
            {this.props.settings.coyote.pairedDeviceId ? (
             <div>
               <label>DeviceId: <input type="text" readOnly={true}
                                      value={this.props.settings.coyote.pairedDeviceId}/></label>
                <button onClick={() => this.props.onForgetCoyoteDeviceClicked()}>Forget Device</button>
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
                         coyote: {...this.props.settings.coyote, powerLevel: e.target.valueAsNumber},
                       });
                     }}
                   />
                 </label>
                </div>

             </div>
            ) : ('')}
          </div>) : (
          ''
        )}
      </details>

      <details>
        <summary>Buttplug.io (not yet implemented)</summary>
        <p>
          You can pair this gallery with buttplug.io to control your toys.
        </p>
        <div className="form-group">
          <label>
            Use Buttplug?
            <input
              disabled={true}
              type="checkbox"
              checked={this.props.settings.buttplug.use}
              onChange={(e) =>
                this.props.onSettingsChanged({
                  ...this.props.settings,
                  buttplug: {
                    ...this.props.settings.buttplug,
                    use: e.target.checked,
                  },
                })
              }
            />
          </label>
        </div>
        {this.props.settings.buttplug.use ? (
          <div className="form-group">
            <label>
              Buttplug server
              <input
                type="text"
                value={this.props.settings.buttplug.server}
                onChange={(e) => {
                  this.props.onSettingsChanged({
                    ...this.props.settings,
                    buttplug: {
                      ...this.props.settings.buttplug,
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

    </div>
  }

}

