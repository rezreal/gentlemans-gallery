import {PurifyMetadata, DetectionType, PurifyDetection} from './purify';
import {Component, ChangeEvent, MouseEvent, RefObject} from 'react';
import React from 'react';
import {Subject, BehaviorSubject, of, interval} from 'rxjs';
import {
  takeUntil,
  distinctUntilChanged,
  switchMap,
  tap,
  delay,
  throttle,
  map,
  filter,
  throttleTime,
} from 'rxjs/operators';
import {Cursor} from './Cursor';
import './MainComponent.css';
import {connect} from './mqtt.min.js';
import {CoyoteDevice, pairDevice} from "./Coyote";
import {ConfigMenu} from "./ConfigMenu";
import {DEFAULT_SETTINGS, Settings} from "./settings";
import {RegionType} from "./rules";

interface Props {
}

interface State extends Settings {

  readonly slides: readonly { images: readonly File[] }[]

  readonly jsonFiles: { [_: string]: PurifyMetadata };
  readonly currentSlide: number;
  readonly currentSlideData: {
    readonly dataUrl: string;
    readonly name: string;
    readonly json: PurifyMetadata;
  }[];

  readonly cursorPosition: { x: number; y: number };
  readonly cursorHint?: RegionType;
  readonly stats: {
    readonly points: number;
    readonly failures: number;
  };

  readonly phase: 'SETUP' | 'INGAME' | 'WON';
  readonly pauseUntil: number;
}

const DEFAULT_STATE: State = {
  ...DEFAULT_SETTINGS,
  slides: [],
  currentSlide: 0,
  currentSlideData: [],
  jsonFiles: {},
  cursorPosition: {x: -1000, y: -1000},
  stats: {points: 0, failures: 0},
  phase: 'SETUP',
  pauseUntil: 0,
}


export class MainComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
    this.startCoyote = this.startCoyote.bind(this)
    this.handlePurifyFileSelection = this.handlePurifyFileSelection.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.handleMouseMoveOnPane = this.handleMouseMoveOnPane.bind(this);
    this.renderPane = React.createRef();
    this.audioDing = React.createRef();
    this.audioError = React.createRef();
  }

  gazeHits$: BehaviorSubject<DetectionType | undefined> = new BehaviorSubject(
    undefined
  );
  eyesTracked$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  presence$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  ttsSpeaking$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  destroy$: Subject<unknown> = new Subject<unknown>();

  tobiiWs: WebSocket | undefined;
  coyoteDevice: CoyoteDevice | undefined;
  tobiiScreenWidth: number = window.screen.width;
  tobiiScreenHeight: number = window.screen.height;

  mqttClient: any | undefined;

  private async startCoyote(): Promise<void> {
    const [coyoteState, coyoteDevice] = await pairDevice((level) => {
        console.info(`Coyote at battery-level ${level}`)
      },
      (power) => console.info(`Coyote at power-level ${power})`))
    this.coyoteDevice = coyoteDevice;
  }

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
      this.mqttClient.publish(topic, message, {qos: qos ?? 0});
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
          {leading: true, trailing: true}
        ),
        map((z) => this.detectionToRegionType(z)),
        tap((regionType) => {
          this.renderPane.current.dataset.region = null;
          if (regionType === 'FOCUS') {
            void this.renderPane.current.offsetWidth;
            this.renderPane.current.dataset.region = 'FOCUS';
            if (this.state.mqtt.topics.teaseTopic) {
              this.sendMqtt(
                this.state.mqtt.topics.teaseTopic.name,
                this.state.mqtt.topics.teaseTopic.message
              );
            }
          } else if (regionType === undefined) {
            if (this.state.mqtt.topics.teaseTopic?.stopMessage) {
              this.sendMqtt(
                this.state.mqtt.topics.teaseTopic.name,
                this.state.mqtt.topics.teaseTopic.stopMessage,
                1
              );
            }
          }
          if (regionType === 'HARD_PUNISH') {
            void this.renderPane.current.offsetWidth;
            this.renderPane.current.dataset.region = 'HARD_PUNISH';
          }
          if (regionType === 'SOFT_PUNISH') {
            this.renderPane.current.dataset.region = 'SOFT_PUNISH';
          }

        }),
        switchMap((zone) =>
          of(zone).pipe(
            delay(zone === 'FOCUS' ? this.state.rules.focusDuration * 1000 : 200)
          )
        ),
        tap((regionType) => {
          this.renderPane.current.dataset.region = null;
        }),
        // not entirely sure why this is needed, avoids double submits
        throttleTime(100)
      )
      .subscribe((regionType) => {
        switch (regionType) {
          case 'FOCUS':
            if (this.state.rules.playSounds) {
              this.audioDing.current.play();
            }
            if (this.state.mqtt.topics.teaseTopic?.stopMessage) {
              this.sendMqtt(
                this.state.mqtt.topics.teaseTopic.name,
                this.state.mqtt.topics.teaseTopic?.stopMessage
              );
            }

            this.nextSlide(false);
            break;
          case undefined:
            break;
          default:
            this.punish(regionType);
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
  private readonly audioDing: RefObject<HTMLAudioElement>;
  private readonly audioError: RefObject<HTMLAudioElement>;

  private detectionToRegionType(
    name: DetectionType
  ): RegionType | undefined {
    if (this.state.rules.regionMapping.FOCUS.some((e) => e === name)) {
      return 'FOCUS';
    }

    if (this.state.rules.regionMapping.HARD_PUNISH.some((e) => e === name)) {
      return 'HARD_PUNISH';
    }

    if (this.state.rules.regionMapping.SOFT_PUNISH.some((e) => e === name)) {
      return 'SOFT_PUNISH';
    }
    return undefined;
  }

  private countHardPunishedZones(meta: PurifyMetadata): number {
    return meta.output.detections.filter((detection) =>
      this.state.rules.regionMapping.HARD_PUNISH.includes(detection.name)
    ).length;
  }

  private punish(level: 'SOFT_PUNISH' | 'HARD_PUNISH') {
    if (this.state.mqtt.topics.punishTopic) {
      this.sendMqtt(
        this.state.mqtt.topics.punishTopic.name,
        this.state.mqtt.topics.punishTopic.message
      );
    }
    if (this.state.rules.playSounds) {
      this.audioError.current.play();
    }
    if (level === 'HARD_PUNISH') {

      const nextSlideIndex = Math.max(0, this.state.currentSlide -1)
      this.setState({
        stats: {
          ...this.state.stats,
          points: this.state.stats.points - 10,
          failures: this.state.stats.failures + 1,
        },
        currentSlide: nextSlideIndex,
        currentSlideData: this.loadSlide(nextSlideIndex),
      });
      this.setState({pauseUntil: Date.now() + 1500});
    } else if (level === 'SOFT_PUNISH') {
      this.setState((prev) => ({
        ...prev,
        stats: {...prev.stats, points: prev.stats.points - 1},
      }));
    }
  }

  private loadSlide(index:number) {
    const images = this.state.slides[index ].images;
    return images.map(imgFile => ({
      name: imgFile.name,
      json: this.state.jsonFiles[imgFile.name],
      dataUrl: window.URL.createObjectURL(imgFile),
    }));
  }

  private nextSlide(skipped: boolean) {
    const nextSlideIndex = this.state.currentSlide + 1;

    if (nextSlideIndex >= this.state.slides.length) {
      this.setState({phase: 'WON'});
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

    this.setState({
      stats: {
        ...this.state.stats,
        points: this.state.stats.points + (skipped ? -10 : 20),
      },
      currentSlide: nextSlideIndex,
      currentSlideData: this.loadSlide(nextSlideIndex)
    });
    this.renderPane.current.classList.remove('fadein');
    void this.renderPane.current.offsetWidth;
    this.renderPane.current.classList.add('fadein');
    this.setState({pauseUntil: Date.now() + 1000});
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
    if (this.state.rules.regionMapping.FOCUS.includes(dt)) return 0;
    if (this.state.rules.regionMapping.HARD_PUNISH.includes(dt)) return 1;
    if (this.state.rules.regionMapping.SOFT_PUNISH.includes(dt)) return 2;
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

    const hit: PurifyDetection | undefined = this.state.currentSlideData
      .map(imgData => imgData.json.output.detections.filter((detection) =>
        MainComponent.distance(
          MainComponent.purifyBoundingBoxToRectangle(detection.bounding_box), rScaledToBoundingBox) < tolerance)
        // pick the most relevant detection in case we are hitting multiple of them
        .sort((a, b) => this.sortByRelevance(a.name, b.name))[0])[0];


    if (hit) {
      // translate the zoom around the center of the detection
      const hitRect = MainComponent.purifyBoundingBoxToRectangle(hit.bounding_box);
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
          ? this.detectionToRegionType(hit.name)
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

  private handlePurifyFileSelection(e: ChangeEvent<HTMLInputElement>) {
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
      jsonFiles.map((file) =>
        file
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
          (detection) => this.detectionToRegionType(detection.name) === 'FOCUS'
        )
      );
      this.setState({
        slides: imageFilesWithFaces.map(f => ({images: [f]})),
        jsonFiles: jsons,
      });
    });
  }

  private createUtterance(text: String, voice: SpeechSynthesisVoice): SpeechSynthesisUtterance {
    const utterance = new SpeechSynthesisUtterance('hi');
    utterance.lang = 'en-US';
    utterance.voice = voice;
    utterance.onstart = () => this.ttsSpeaking$.next(true)
    utterance.onend = () => this.ttsSpeaking$.next(false)
    utterance.onresume = () => this.ttsSpeaking$.next(true)
    utterance.onpause = () => this.ttsSpeaking$.next(false)
    return utterance;
  }

  async startGame(): Promise<void> {
    if (
      this.state.mqtt.topics.renewRestraint?.name &&
      this.mqttClient?.connected
    ) {
      this.sendMqtt(
        this.state.mqtt.topics.renewRestraint.name,
        this.state.mqtt.topics.renewRestraint.message,
        1
      );
    }

    if (this.state.rules.shuffleGallery) {
      let gallery = [...this.state.slides];

      for (let i = gallery.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gallery[i], gallery[j]] = [gallery[j], gallery[i]];
      }
      this.setState({
        slides: gallery,
      });
    }

    localStorage.setItem('tobii', JSON.stringify(this.state.tobii));
    if (this.state.tobii.use) {
      this.startTobii();
    }

    localStorage.setItem('mqtt', JSON.stringify(this.state.mqtt));
    if (this.state.mqtt.use) {
      this.startMqtt();
    }

    localStorage.setItem('buttplug', JSON.stringify(this.state.buttplug));
    if (this.state.buttplug.use) {
      this.startButtplug();
    }

    localStorage.setItem('tts', JSON.stringify(this.state.tts));
    if (this.state.tts.use) {
      const voice = window.speechSynthesis.getVoices().filter(v => v.localService)[0];

      // TODO: start TTS
      // window.speechSynthesis.speak(utterance);
    }

    localStorage.setItem('coyote', JSON.stringify(this.state.coyote));

    localStorage.setItem('rules', JSON.stringify(this.state.rules));

    this.setState({phase: 'INGAME', pauseUntil: Date.now() + 1000});

    if (this.state.rules.fullscreen) {
      await document.getElementsByClassName('app')[0].requestFullscreen({navigationUI: 'hide'});
    }
    this.nextSlide(false);
  }

  render() {
    return (
      <div className="app">
        {this.state.phase === 'INGAME' ? (
          <header>
            <h5>
              Points: {this.state.stats.points}{' '}
              {this.state.rules.allowSkipImage &&
              this.state.slides.length > 0 ? (
                <button onClick={() => this.nextSlide(true)}>Skip Image</button>
              ) : (
                ''
              )}
            </h5>
          </header>
        ) : (
          ''
        )}
        <main>
          <audio
            src="assets/ding.mp3"
            ref={this.audioDing}
            autoPlay={false}
            preload={this.state.rules.playSounds ? 'auto' : 'none'}
          />
          <audio
            src="assets/beep-03.mp3"
            ref={this.audioError}
            autoPlay={false}
            preload={this.state.rules.playSounds ? 'auto' : 'none'}
          />

          {this.state.phase === 'SETUP' ? (

            <div className='flex'><ConfigMenu settings={this.state}
                                              onSettingsChanged={(settings) => this.setState(settings)}
                                              handleFileSelection={this.handlePurifyFileSelection}
                                              onSelectCoyoteDeviceClicked={this.startCoyote}
            /></div>) : ('')}


          {this.state.slides.length > 0 && this.state.phase === 'SETUP' ? (
            <button onClick={() => this.startGame()}>Start here ({this.state.slides.length} slides)!</button>
          ) : (
            ''
          )}


          {this.state.phase === 'WON' ? (
            <h1 className='won'>You made it! Your score: {this.state.stats.points}. Hit reload to start over.</h1>
          ) : this.state.phase === 'INGAME' ? (
            ''
          ) : (
            ''
          )}

          {this.state.phase !== 'WON' ? ( // must be present in order to bind renderPane in ctor

            <div className='renderContainer'>
              <img
                ref={this.renderPane}
                src={this.state.currentSlideData[0]?.dataUrl}
                data-imagename={this.state.currentSlideData[0]?.name}
                onMouseMove={this.handleMouseMoveOnPane}
                className={`${this.state.rules.softFilter} renderPane`}
                style={{
                  transitionDuration: `${this.state.rules.focusDuration}s`,
                }}
              />
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0">
                <defs>
                  <filter id="pixelate" x="0" y="0">
                    <feFlood x="8" y="8" height="4" width="4"/>

                    <feComposite width="20" height="20"/>

                    <feTile result="a"/>

                    <feComposite in="SourceGraphic" in2="a" operator="in"/>

                    <feMorphology operator="dilate" radius="10"/>
                  </filter>
                </defs>
              </svg>
            </div>

          ) : ('')}

          {this.state.rules.showGaze && this.state.phase == 'INGAME' ? (
            <Cursor
              size={200}
              position={this.state.cursorPosition}
              hint={this.state.cursorHint}
            />
          ) : (
            ''
          )}


        </main>
      </div>
    );
  }
}
