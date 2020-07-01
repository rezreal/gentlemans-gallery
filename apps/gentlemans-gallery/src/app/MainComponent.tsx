import { PurifyMetadata, DetectionType, PurifyDetection } from './purify';
import { Component, ChangeEvent, MouseEvent, RefObject } from 'react';
import React from 'react';
import { Subject, BehaviorSubject, of, timer, interval } from 'rxjs';
import {
  takeUntil,
  distinctUntilChanged,
  switchMap,
  tap,
  delay,
  throttle,
  map,
  filter,
  debounceTime,
  auditTime,
  throttleTime,
} from 'rxjs/operators';
import { Cursor } from './Cursor';
import './MainComponent.css';

/*import {
  ButtplugClient,
  ButtplugClientDevice,
  ButtplugDeviceMessage,
  ButtplugBrowserWebsocketClientConnector,
} from 'buttplug';
*/

import { connect } from './mqtt.min.js';
import { loadDemoImages } from './demo';
import { Rules, defaultRules } from './rules';

interface Props {}

type TopicWithMessage = {
  name: string;
  message: string;
  stopMessage?: string;
};

interface State {
  readonly mqtt: {
    readonly use: boolean;
    readonly server?: string;
    readonly clientId?: string;
    readonly auth: boolean;
    readonly username?: string;
    readonly password?: string;
    readonly topics: {
      readonly teaseTopic?: TopicWithMessage;
      readonly punishTopic?: TopicWithMessage;
      readonly renewRestraint?: TopicWithMessage;
    };
  };
  readonly buttplug: {
    readonly use: boolean;
    readonly server: string;
  };
  readonly tobii: {
    readonly use: boolean;
    readonly disableMouse: boolean;
    readonly server?: string;
  };
  readonly rules: Rules;
  readonly imageFiles: readonly File[];
  readonly jsonFiles: { [_: string]: PurifyMetadata };
  readonly currentImage?: number;
  readonly currentImageData?: string;
  readonly currentImageName?: string;
  readonly currentJson?: PurifyMetadata;
  readonly transitionDuration?: number;
  readonly cursorPosition: { x: number; y: number };
  readonly cursorHint?: 'NEXT' | 'SOFT' | 'HARD';
  readonly stats: {
    readonly points: number;
    readonly failures: number;
  };

  readonly phase: 'SETUP' | 'INGAME' | 'WON';
  readonly pauseUntil: number;
}

export class MainComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      buttplug: {
        use: false,
        server: 'wss://localhost',
      },
      mqtt: {
        use: false,
        server: 'wss://test.mosquitto.org:8081',
        topics: {},
        auth: false,
        ...JSON.parse(localStorage.getItem('mqtt') || '{}'),
      },
      rules: {
        ...defaultRules,
        ...JSON.parse(localStorage.getItem('rules') || '{}'),
      },
      tobii: {
        use: false,
        disableMouse: false,
        server: 'ws://localhost:8887',
      },
      imageFiles: [],
      jsonFiles: {},
      cursorPosition: { x: 0, y: 0 },
      stats: { points: 0, failures: 0 },
      phase: 'SETUP',
      pauseUntil: 0,
    };
    this.handleFileSelection = this.handleFileSelection.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.handleMouseMoveOnPane = this.handleMouseMoveOnPane.bind(this);
    this.renderPane = React.createRef();
    this.fileSelector = React.createRef();
    this.audioDing = React.createRef();
    this.audioError = React.createRef();
  }

  gazeHits$: BehaviorSubject<DetectionType | undefined> = new BehaviorSubject(
    undefined
  );
  eyesTracked$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  presence$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  destroy$: Subject<unknown> = new Subject<unknown>();

  tobiiWs: WebSocket | undefined;
  tobiiScreenWidth: number = window.screen.width;
  tobiiScreenHeight: number = window.screen.height;

  mqttClient: any | undefined;

  private startTobii(): void {
    if (!this.state.tobii.use) {
      return;
    }
    const ws = new WebSocket(this.state.tobii.server, ['Tobii.Interaction']);

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

  startButtplug() {
    /*
    const client = new ButtplugClient('Gentlemans Library');
    client.addListener('disconnect', this.buttplugDisconnected);

    client.Connect(
      new ButtplugBrowserWebsocketClientConnector(this.state.buttplug.server)
    );
    */
  }

  buttplugDisconnected() {
    // todo: reconnect
  }

  sendMqtt(topic: string, message: string, qos?: 0 | 1 | 2) {
    if (this.mqttClient && this.mqttClient.connected) {
      this.mqttClient.publish(topic, message, { qos: qos ?? 0 });
    }
  }

  startMqtt() {
    if (this.mqttClient) {
      this.mqttClient.end(true);
      this.mqttClient = undefined;
    }
    this.mqttClient = connect(this.state.mqtt.server, {
      username: this.state.mqtt.auth ? this.state.mqtt.username : undefined,
      password: this.state.mqtt.auth ? this.state.mqtt.password : undefined,
      clean: true,
      clientId: 'gentlemans-gallery_' + Math.random().toString(16).substr(2, 8),
      /*will: {
        topic: 'gentlemans-gallery/$state',
        payload: 'lost',
        retain: true,
        qos: 1,
      },*/
    });

    this.mqttClient.on('connect', () => {
      //console.info(`connected to ${this.state.mqtt.server}`);
      this.mqttClient.publish('gentlemans-gallery/$state', 'ready', {
        qos: 1,
        retain: true,
      });
    });
    this.mqttClient.on('message', (topic, payload) => {
      this.onCommandFromMqtt(topic);
    });

    this.mqttClient.on('error', (c) => {
      console.error(`mqtt error:`, c);
    });

    this.mqttClient.on('packetsend', (sent) => {
      console.info('mqtt packet sent: ', sent);
    });
    this.mqttClient.on('packetreceive', (sent) => {
      console.info('mqtt packet received: ', sent);
    });
  }

  onCommandFromMqtt(cmd: string): void {
    console.info('cmd from mqtt: ', cmd);
  }

  componentDidMount(): void {
    (this.fileSelector.current as any).webkitdirectory = 'true';

    interval(15000)
      .pipe(
        takeUntil(this.destroy$),
        filter(
          () =>
            this.mqttClient?.connected &&
            this.state.phase === 'INGAME' &&
            this.state.mqtt.topics.renewRestraint !== undefined
        )
      )
      .subscribe(() =>
        this.sendMqtt(
          this.state.mqtt.topics.renewRestraint.name,
          this.state.mqtt.topics.renewRestraint.message,
          1
        )
      );

    this.gazeHits$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        throttle(
          () => {
            const delayUntil = Math.max(0, this.state.pauseUntil - Date.now());
            return of(false).pipe(delay(delayUntil));
          },
          { leading: true, trailing: true }
        ),
        map((z) => this.detectionToZone(z)),
        tap((zone) => {
          this.renderPane.current.classList.remove('fadeout');
          this.renderPane.current.classList.remove('hardfocus');
          if (zone === 'NEXT') {
            void this.renderPane.current.offsetWidth;
            this.renderPane.current.classList.add('fadeout');
            if (this.state.mqtt.topics.teaseTopic) {
              this.sendMqtt(
                this.state.mqtt.topics.teaseTopic.name,
                this.state.mqtt.topics.teaseTopic.message
              );
            }
          } else if (zone === undefined) {
            if (this.state.mqtt.topics.teaseTopic?.stopMessage) {
              this.sendMqtt(
                this.state.mqtt.topics.teaseTopic.name,
                this.state.mqtt.topics.teaseTopic.stopMessage,
                1
              );
            }
          }
          if (zone === 'HARD') {
            void this.renderPane.current.offsetWidth;
            this.renderPane.current.classList.add('hardfocus');
          }
          if (zone === 'SOFT') {
            this.renderPane.current.classList.add('softfocus');
          } else {
            this.renderPane.current.classList.remove('softfocus');
          }
        }),
        switchMap((zone) =>
          of(zone).pipe(
            delay(zone === 'NEXT' ? this.state.transitionDuration : 200)
          )
        ),
        tap((zone) => {
          if (zone === 'NEXT') {
            this.renderPane.current.classList.remove('fadeout');
          } else if (zone === 'HARD') {
            this.renderPane.current.classList.remove('hardfocus');
          }
        }),
        // not entirely sure why this is needed, avoids double submits
        throttleTime(100)
      )
      .subscribe((zone) => {
        switch (zone) {
          case 'NEXT':
            if (this.state.rules.playSounds) {
              this.audioDing.current.play();
            }
            if (this.state.mqtt.topics.teaseTopic?.stopMessage) {
              this.sendMqtt(
                this.state.mqtt.topics.teaseTopic.name,
                this.state.mqtt.topics.teaseTopic?.stopMessage
              );
            }

            this.nextImage(false);
            break;
          case undefined:
            break;
          default:
            this.punish(zone);
        }
      });
  }

  componentWillUnmount() {
    this.destroy$.next();

    if (this.tobiiWs) {
      this.tobiiWs.close();
    }
  }

  private readonly renderPane: RefObject<HTMLImageElement>;
  private readonly fileSelector: RefObject<HTMLInputElement>;
  private readonly audioDing: RefObject<HTMLAudioElement>;
  private readonly audioError: RefObject<HTMLAudioElement>;

  private static arrayBufferToJsonObject(data: ArrayBuffer): unknown {
    var dataView = new DataView(data);
    var decoder = new TextDecoder('utf8');
    return JSON.parse(decoder.decode(dataView));
  }

  private static extractImageFilename(path: String): string {
    if (path.startsWith('/')) {
      return path.substring(path.lastIndexOf('/') + 1);
    } else {
      // assuming a windows path separator
      return path.substring(path.lastIndexOf('\\') + 1);
    }
  }

  private detectionToZone(
    name: DetectionType
  ): 'NEXT' | 'SOFT' | 'HARD' | undefined {
    if (this.state.rules.focusRegions.some((e) => e === name)) {
      return 'NEXT';
    }

    if (this.state.rules.hardPunishRegions.some((e) => e === name)) {
      return 'HARD';
    }

    if (this.state.rules.softPunishRegions.some((e) => e === name)) {
      return 'SOFT';
    }
    return undefined;
  }

  private countHardPunishedZones(meta: PurifyMetadata): number {
    return meta.output.detections.filter((detection) =>
      this.state.rules.hardPunishRegions.includes(detection.name)
    ).length;
  }

  private punish(level: 'SOFT' | 'HARD') {
    if (this.state.mqtt.topics.punishTopic) {
      this.sendMqtt(
        this.state.mqtt.topics.punishTopic.name,
        this.state.mqtt.topics.punishTopic.message
      );
    }
    if (this.state.rules.playSounds) {
      this.audioError.current.play();
    }
    if (level === 'HARD') {
      const nextJsonFile = this.state.jsonFiles[
        this.state.imageFiles[Math.max(0, this.state.currentImage - 1)].name
      ];
      this.setState({
        stats: {
          ...this.state.stats,
          points: this.state.stats.points - 10,
          failures: this.state.stats.failures + 1,
        },
        currentImage: Math.max(0, this.state.currentImage - 1),
        currentImageName: this.state.imageFiles[
          Math.max(0, this.state.currentImage - 1)
        ].name,
        currentImageData: window.URL.createObjectURL(
          this.state.imageFiles[Math.max(0, this.state.currentImage - 1)]
        ),
        currentJson: nextJsonFile,
        transitionDuration:
          (this.countHardPunishedZones(nextJsonFile) + 2) *
          1000 *
          this.state.rules.focusDuration,
      });
      this.setState({ pauseUntil: Date.now() + 1500 });
    } else if (level === 'SOFT') {
      this.setState((prev) => ({
        ...prev,
        stats: { ...prev.stats, points: prev.stats.points - 1 },
      }));
    }
  }

  private nextImage(skipped: boolean) {
    const nextIndex = (this.state.currentImage ?? -1) + 1;

    if (nextIndex >= this.state.imageFiles.length) {
      this.setState({ phase: 'WON' });
      if (
        this.mqttClient?.connected &&
        this.state.mqtt.topics.renewRestraint?.stopMessage
      ) {
        this.sendMqtt(
          this.state.mqtt.topics.renewRestraint.name,
          this.state.mqtt.topics.renewRestraint.stopMessage,
          1
        );
      }
      document.exitFullscreen();
      return;
    }
    const nextImageFile = this.state.imageFiles[nextIndex];
    const nextJsonFile = this.state.jsonFiles[nextImageFile.name];
    this.setState({
      stats: {
        ...this.state.stats,
        points: this.state.stats.points + (skipped ? -10 : 20),
      },
      currentImage: nextIndex,
      currentImageName: this.state.imageFiles[nextIndex].name,
      currentImageData: window.URL.createObjectURL(nextImageFile),
      currentJson: nextJsonFile,
      transitionDuration:
        (this.countHardPunishedZones(nextJsonFile) + 2) *
        1000 *
        this.state.rules.focusDuration,
    });
    this.renderPane.current.classList.remove('fadein');
    void this.renderPane.current.offsetWidth;
    this.renderPane.current.classList.add('fadein');
    this.setState({ pauseUntil: Date.now() + 1000 });
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
    if (this.state.rules.focusRegions.includes(dt)) return 0;
    if (this.state.rules.hardPunishRegions.includes(dt)) return 1;
    if (this.state.rules.softPunishRegions.includes(dt)) return 2;
    return 3;
  }

  private moveToClient(clientCoordinates: { x: number; y: number }): void {
    const renderPane = this.renderPane.current;
    const imageCoords = renderPane.getBoundingClientRect();
    const r = {
      x: clientCoordinates.x - imageCoords.x,
      y: clientCoordinates.y - imageCoords.y,
    };
    const rScaledToBoundingBox = {
      x: (r.x * renderPane.naturalWidth) / imageCoords.width,
      y: (r.y * renderPane.naturalHeight) / imageCoords.height,
    };

    const tolerance = MainComponent.imageSize(renderPane) * 0.04;
    const hit:
      | PurifyDetection
      | undefined = this.state.currentJson?.output.detections
      .filter((detection) => {
        const rect = MainComponent.purifyBoundingBoxToRectangle(
          detection.bounding_box
        );
        return MainComponent.distance(rect, rScaledToBoundingBox) < tolerance;
      })
      .sort((a, b) => this.sortByRelevance(a.name, b.name))[0];

    if (hit) {
      // translate the zoom around the center of the detection
      const hitRect = MainComponent.purifyBoundingBoxToRectangle(
        hit.bounding_box
      );
      const hitCenter = {
        x: hitRect.x + hitRect.width / 2,
        y: hitRect.y + hitRect.height / 2,
      };
      (renderPane.style as any).transformOrigin = `${hitCenter.x}px ${hitCenter.y}px`;
    }

    this.gazeHits$.next(hit?.name);

    this.setState({
      cursorPosition: clientCoordinates,
      cursorHint:
        this.state.pauseUntil < Date.now() && hit
          ? this.detectionToZone(hit.name)
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
    boundingBox: [number, number, number, number]
  ): DOMRect {
    return new DOMRect(
      boundingBox[1],
      boundingBox[0],
      boundingBox[3] - boundingBox[1],
      boundingBox[2] - boundingBox[0]
    );
  }

  private handleFileSelection(e: ChangeEvent<HTMLInputElement>) {
    const nativeFiles: FileList = e.target.files;
    const allFiles = Array.from(nativeFiles);
    const imageFiles: File[] = allFiles.filter(
      (f) =>
        f.type === 'image/jpeg' ||
        f.type === 'image/png' ||
        f.type === 'image/webp'
    );
    // sort them by name
    imageFiles.sort((a, b) => a.name.localeCompare(b.name));

    const jsonFiles: File[] = allFiles.filter(
      (f) => f.type === 'application/json'
    );

    const loadedJsons: Promise<{ [_: string]: PurifyMetadata }> = Promise.all(
      jsonFiles.map((jf) =>
        jf
          .arrayBuffer()
          .then(
            (data) =>
              MainComponent.arrayBufferToJsonObject(data) as PurifyMetadata
          )
      )
    ).then((arr) =>
      arr.reduce(function (akku, next) {
        akku[MainComponent.extractImageFilename(next.file)] = next;
        return akku;
      }, {})
    );

    loadedJsons.then((jsons) => {
      const imageFilesWithFaces = imageFiles.filter((file) =>
        jsons[file.name]?.output.detections.some(
          // image must have at least one zone to continue
          (detection) => this.detectionToZone(detection.name) === 'NEXT'
        )
      );
      this.setState({
        imageFiles: imageFilesWithFaces,
        jsonFiles: jsons,
      });
    });
  }

  startGame(): void {
    if (
      this.state.mqtt.topics.renewRestraint?.name &&
      this.mqttClient?.connected
    )
      this.sendMqtt(
        this.state.mqtt.topics.renewRestraint.name,
        this.state.mqtt.topics.renewRestraint.message,
        1
      );

    if (this.state.rules.shuffleGallery) {
      let gallery = [...this.state.imageFiles];

      for (let i = gallery.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gallery[i], gallery[j]] = [gallery[j], gallery[i]];
      }
      this.setState({
        imageFiles: gallery,
      });
    }

    if (this.state.tobii.use) {
      localStorage.setItem('tobiiServer', this.state.tobii.server);
      this.startTobii();
    }

    if (this.state.mqtt.use) {
      localStorage.setItem('mqtt', JSON.stringify(this.state.mqtt));
      this.startMqtt();
    }

    localStorage.setItem('buttplug', JSON.stringify(this.state.buttplug));
    if (this.state.buttplug.use) {
      this.startButtplug();
    }

    localStorage.setItem('rules', JSON.stringify(this.state.rules));

    this.setState({ phase: 'INGAME', pauseUntil: Date.now() + 1000 });
    this.nextImage(false);
  }

  render() {
    return (
      <div className="app">
        {this.state.phase === 'INGAME' ? (
          <header>
            <h5>
              Points: {this.state.stats.points}{' '}
              {this.state.rules.allowSkipImage &&
              this.state.imageFiles.length > 0 ? (
                <button onClick={() => this.nextImage(true)}>Skip Image</button>
              ) : (
                ''
              )}
            </h5>
          </header>
        ) : (
          ''
        )}
        <main>
          <div className="flex">
            {this.state.phase === 'WON' ? (
              <h1>You won! Your score: {this.state.stats.points}</h1>
            ) : this.state.phase === 'INGAME' ? (
              ''
            ) : (
              ''
            )}

            <img
              id="renderPane"
              ref={this.renderPane}
              src={this.state.currentImageData}
              data-imagename={this.state.currentImageName}
              onMouseMove={this.handleMouseMoveOnPane}
              className={this.state.rules.softFilter}
              style={{
                transitionDuration: `${this.state.transitionDuration}ms`,
              }}
            ></img>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0">
              <defs>
                <filter id="pixelate" x="0" y="0">
                  <feFlood x="8" y="8" height="4" width="4" />

                  <feComposite width="20" height="20" />

                  <feTile result="a" />

                  <feComposite in="SourceGraphic" in2="a" operator="in" />

                  <feMorphology operator="dilate" radius="10" />
                </filter>
              </defs>
            </svg>
            <audio
              src="assets/ding.mp3"
              ref={this.audioDing}
              autoPlay={false}
              preload={this.state.rules.playSounds ? 'auto' : 'none'}
            ></audio>
            <audio
              src="assets/beep-03.mp3"
              ref={this.audioError}
              autoPlay={false}
              preload={this.state.rules.playSounds ? 'auto' : 'none'}
            ></audio>

            {this.state.rules.showGaze ? (
              <Cursor
                size={200}
                position={this.state.cursorPosition}
                hint={this.state.cursorHint}
              ></Cursor>
            ) : (
              ''
            )}
          </div>

          {this.state.phase === 'SETUP' ? (
            <details open>
              <summary>Rules</summary>
              <ul>
                <li>
                  Look into{' '}
                  <select
                    multiple={true}
                    value={this.state.rules.focusRegions}
                    onChange={(e) =>
                      this.setState({
                        rules: {
                          ...this.state.rules,
                          focusRegions: (Array.from(
                            e.target.options
                          ) as HTMLOptionElement[])
                            .filter((i) => i.selected)
                            .map((i) => i.value) as DetectionType[],
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
                  for{' '}
                  <input
                    type="number"
                    value={this.state.rules.focusDuration}
                    min="1"
                    max="20"
                    onChange={(e) =>
                      this.setState({
                        rules: {
                          ...this.state.rules,
                          focusDuration: e.target.valueAsNumber,
                        },
                      })
                    }
                  ></input>{' '}
                  seconds
                </li>
                <li>
                  Do not stare at{' '}
                  <select
                    multiple={true}
                    value={this.state.rules.softPunishRegions}
                    onChange={(e) =>
                      this.setState({
                        rules: {
                          ...this.state.rules,
                          softPunishRegions: (Array.from(
                            e.target.options
                          ) as HTMLOptionElement[])
                            .filter((i) => i.selected)
                            .map((i) => i.value) as DetectionType[],
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
                  Especially do not stare at{' '}
                  <select
                    multiple={true}
                    value={this.state.rules.hardPunishRegions}
                    onChange={(e) =>
                      this.setState({
                        rules: {
                          ...this.state.rules,
                          hardPunishRegions: (Array.from(
                            e.target.options
                          ) as HTMLOptionElement[])
                            .filter((i) => i.selected)
                            .map((i) => i.value) as DetectionType[],
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
                      checked={this.state.rules.showGaze}
                      onChange={(e) =>
                        this.setState({
                          rules: {
                            ...this.state.rules,
                            showGaze: e.target.checked,
                          },
                        })
                      }
                    ></input>{' '}
                    Gaze tracing
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={this.state.rules.allowSkipImage}
                      onChange={(e) =>
                        this.setState({
                          rules: {
                            ...this.state.rules,
                            allowSkipImage: e.target.checked,
                          },
                        })
                      }
                    ></input>{' '}
                    Allow skip image
                  </label>
                </li>
                <li>
                  <label>
                    Visual Warning{' '}
                    <select
                      value={this.state.rules.softFilter}
                      onChange={(e) =>
                        this.setState({
                          rules: {
                            ...this.state.rules,
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
                      checked={this.state.rules.playSounds}
                      onChange={(e) =>
                        this.setState({
                          rules: {
                            ...this.state.rules,
                            playSounds: e.target.checked,
                          },
                        })
                      }
                    ></input>{' '}
                    Play Sounds
                  </label>
                </li>
                {document.fullscreenEnabled ? (
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        checked={this.state.rules.fullscreen}
                        onChange={(e) =>
                          this.setState({
                            rules: {
                              ...this.state.rules,
                              fullscreen: e.target.checked,
                            },
                          })
                        }
                      ></input>{' '}
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
                      checked={this.state.rules.shuffleGallery}
                      onChange={(e) =>
                        this.setState({
                          rules: {
                            ...this.state.rules,
                            shuffleGallery: e.target.checked,
                          },
                        })
                      }
                    ></input>{' '}
                    Shuffle Gallery
                  </label>
                </li>
              </ul>
              <button onClick={(e) => this.setState({ rules: defaultRules })}>
                Reset to defaults
              </button>
            </details>
          ) : (
            ''
          )}

          {this.state.phase === 'SETUP' ? (
            <details open>
              <summary>Select local gallery</summary>
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
                onChange={(e) => this.handleFileSelection(e)}
              ></input>
              <p>
                Suggestions/PRs for a public domain sample gallery are welcome!
                <button
                  onClick={() =>
                    loadDemoImages().then((dis) =>
                      this.setState({ ...this.state, ...dis })
                    )
                  }
                >
                  Load demo images
                </button>
              </p>
            </details>
          ) : (
            ''
          )}

          <details>
            <summary>Configure MQTT</summary>
            <div className="form-group">
              <label>
                Use MQTT?
                <input
                  type="checkbox"
                  checked={this.state.mqtt.use}
                  onChange={(e) =>
                    this.setState({
                      mqtt: { ...this.state.mqtt, use: e.target.checked },
                    })
                  }
                ></input>
              </label>
            </div>
            {this.state.mqtt.use ? (
              <div>
                <div className="form-group">
                  <label>
                    MQTT Server
                    <input
                      type="text"
                      value={this.state.mqtt.server}
                      onChange={(e) =>
                        this.setState({
                          mqtt: { ...this.state.mqtt, server: e.target.value },
                        })
                      }
                    ></input>
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    Auth?
                    <input
                      type="checkbox"
                      checked={this.state.mqtt.auth}
                      onChange={(e) =>
                        this.setState({
                          mqtt: { ...this.state.mqtt, auth: e.target.checked },
                        })
                      }
                    ></input>
                  </label>
                  {this.state.mqtt.auth ? (
                    <div>
                      <label>
                        Username
                        <input
                          type="text"
                          value={this.state.mqtt.username}
                          onChange={(e) =>
                            this.setState({
                              mqtt: {
                                ...this.state.mqtt,
                                username: e.target.value,
                              },
                            })
                          }
                        ></input>
                      </label>
                      <label>
                        Password
                        <input
                          type="password"
                          value={this.state.mqtt.password}
                          onChange={(e) =>
                            this.setState({
                              mqtt: {
                                ...this.state.mqtt,
                                password: e.target.value,
                              },
                            })
                          }
                        ></input>
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
                          value={this.state.mqtt.topics.teaseTopic?.name}
                          onChange={(e) =>
                            this.setState({
                              mqtt: {
                                ...this.state.mqtt,
                                topics: {
                                  ...this.state.mqtt.topics,
                                  teaseTopic: {
                                    ...(this.state.mqtt.topics.teaseTopic || {
                                      name: '',
                                      message: '',
                                    }),
                                    name: e.target.value,
                                  },
                                },
                              },
                            })
                          }
                        ></input>
                      </label>
                    </li>
                    <li>
                      <label>
                        Message
                        <input
                          type="text"
                          value={this.state.mqtt.topics.teaseTopic?.message}
                          onChange={(e) =>
                            this.setState({
                              mqtt: {
                                ...this.state.mqtt,
                                topics: {
                                  ...this.state.mqtt.topics,
                                  teaseTopic: {
                                    ...this.state.mqtt.topics.teaseTopic,
                                    message: e.target.value,
                                  },
                                },
                              },
                            })
                          }
                        ></input>
                      </label>
                    </li>
                    <li>
                      <label>
                        Stop Message (optional)
                        <input
                          type="text"
                          value={this.state.mqtt.topics.teaseTopic?.stopMessage}
                          onChange={(e) =>
                            this.setState({
                              mqtt: {
                                ...this.state.mqtt,
                                topics: {
                                  ...this.state.mqtt.topics,
                                  teaseTopic: {
                                    ...this.state.mqtt.topics.teaseTopic,
                                    stopMessage: e.target.value?.trim(),
                                  },
                                },
                              },
                            })
                          }
                        ></input>
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
                          value={this.state.mqtt.topics.punishTopic?.name}
                          onChange={(e) =>
                            this.setState({
                              mqtt: {
                                ...this.state.mqtt,
                                topics: {
                                  ...this.state.mqtt.topics,
                                  punishTopic: {
                                    ...(this.state.mqtt.topics.punishTopic || {
                                      name: '',
                                      message: '',
                                    }),
                                    name: e.target.value,
                                  },
                                },
                              },
                            })
                          }
                        ></input>
                      </label>
                    </li>
                    <li>
                      <label>
                        Message
                        <input
                          type="text"
                          value={this.state.mqtt.topics.punishTopic?.message}
                          onChange={(e) =>
                            this.setState({
                              mqtt: {
                                ...this.state.mqtt,
                                topics: {
                                  ...this.state.mqtt.topics,
                                  punishTopic: {
                                    ...this.state.mqtt.topics.punishTopic,
                                    message: e.target.value,
                                  },
                                },
                              },
                            })
                          }
                        ></input>
                      </label>
                    </li>
                    <li>
                      <label>
                        Stop Message (optional)
                        <input
                          type="text"
                          value={
                            this.state.mqtt.topics.punishTopic?.stopMessage
                          }
                          onChange={(e) =>
                            this.setState({
                              mqtt: {
                                ...this.state.mqtt,
                                topics: {
                                  ...this.state.mqtt.topics,
                                  punishTopic: {
                                    ...this.state.mqtt.topics.punishTopic,
                                    stopMessage: e.target.value?.trim(),
                                  },
                                },
                              },
                            })
                          }
                        ></input>
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
                          value={this.state.mqtt.topics.renewRestraint?.name}
                          onChange={(e) =>
                            this.setState({
                              mqtt: {
                                ...this.state.mqtt,
                                topics: {
                                  ...this.state.mqtt.topics,
                                  renewRestraint: {
                                    ...(this.state.mqtt.topics
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
                        ></input>
                      </label>
                    </li>
                    <li>
                      <label>
                        Message (this is posted every 15 seconds until the game
                        is won)
                        <input
                          type="text"
                          value={this.state.mqtt.topics.renewRestraint?.message}
                          onChange={(e) =>
                            this.setState({
                              mqtt: {
                                ...this.state.mqtt,
                                topics: {
                                  ...this.state.mqtt.topics,
                                  renewRestraint: {
                                    ...this.state.mqtt.topics.renewRestraint,
                                    message: e.target.value,
                                  },
                                },
                              },
                            })
                          }
                        ></input>
                      </label>
                    </li>
                    <li>
                      <label>
                        Open Message (sent when the game is won)
                        <input
                          type="text"
                          value={
                            this.state.mqtt.topics.renewRestraint?.stopMessage
                          }
                          onChange={(e) =>
                            this.setState({
                              mqtt: {
                                ...this.state.mqtt,
                                topics: {
                                  ...this.state.mqtt.topics,
                                  renewRestraint: {
                                    ...this.state.mqtt.topics.renewRestraint,
                                    stopMessage: e.target.value?.trim(),
                                  },
                                },
                              },
                            })
                          }
                        ></input>
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
            <summary>Buttplug.io</summary>
            <p>
              You can pair this gallery with buttplug.io to control your toys.
            </p>
            <div className="form-group">
              <label>
                Use Buttplug?
                <input
                  type="checkbox"
                  checked={this.state.buttplug.use}
                  onChange={(e) =>
                    this.setState({
                      buttplug: {
                        ...this.state.buttplug,
                        use: e.target.checked,
                      },
                    })
                  }
                ></input>
              </label>
            </div>
            {this.state.buttplug.use ? (
              <div className="form-group">
                <label>
                  Buttplug server
                  <input
                    type="text"
                    value={this.state.buttplug.server}
                    onChange={(e) => {
                      this.setState({
                        buttplug: {
                          ...this.state.buttplug,
                          server: e.target.value,
                        },
                      });
                    }}
                  ></input>
                </label>
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
                  checked={this.state.tobii.use}
                  onChange={(e) =>
                    this.setState({
                      tobii: { ...this.state.tobii, use: e.target.checked },
                    })
                  }
                ></input>
              </label>
            </div>
            {this.state.tobii.use ? (
              <div className="form-group">
                <label>
                  Disable mouse?
                  <input
                    type="checkbox"
                    checked={this.state.tobii.disableMouse}
                    onChange={(e) =>
                      this.setState({
                        tobii: {
                          ...this.state.tobii,
                          disableMouse: e.target.checked,
                        },
                      })
                    }
                  ></input>
                </label>
              </div>
            ) : (
              ''
            )}
            {this.state.tobii.use ? (
              <div className="form-group">
                <label>
                  Tobii Websocket Server
                  <input
                    type="text"
                    value={this.state.tobii.server}
                    onChange={(e) => {
                      this.setState({
                        tobii: { ...this.state.tobii, server: e.target.value },
                      });
                    }}
                  ></input>
                </label>
              </div>
            ) : (
              ''
            )}
          </details>

          {this.state.imageFiles.length > 0 && this.state.phase === 'SETUP' ? (
            <button onClick={() => this.startGame()}>Start here!</button>
          ) : (
            ''
          )}
        </main>
      </div>
    );
  }
}
