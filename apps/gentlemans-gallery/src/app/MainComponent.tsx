import { PurifyMetadata, DetectionType } from './purify';
import { Component, ChangeEvent, MouseEvent, RefObject } from 'react';
import React from 'react';
import { Subject, BehaviorSubject, of } from 'rxjs';
import {
  takeUntil,
  distinctUntilChanged,
  switchMap,
  tap,
  delay,
  throttle,
  map,
} from 'rxjs/operators';
import { Cursor } from './Cursor';
import './MainComponent.css';

interface Props {}
interface State {
  imageFiles: File[];
  jsonFiles: { [_: string]: PurifyMetadata };
  currentImage?: number;
  currentImageData?: string;
  currentJson?: PurifyMetadata;
  cursorPosition: { x: number; y: number };
  cursorHint?: 'NEXT' | 'SOFT' | 'HARD';
  points: number;
}

export class MainComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      imageFiles: [],
      jsonFiles: {},
      cursorPosition: { x: 0, y: 0 },
      points: 0,
    };
    this.handleFileSelection = this.handleFileSelection.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.handleMouseMoveOnPane = this.handleMouseMoveOnPane.bind(this);
    this.renderPane = React.createRef();
  }

  gazeHits$: BehaviorSubject<DetectionType | undefined> = new BehaviorSubject(
    undefined
  );
  eyesTracked$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  destroy$: Subject<unknown> = new Subject<unknown>();
  pauseUntil: number = 0;

  componentDidMount(): void {
    (this.fileSelector.current as any).webkitdirectory="true";

    const ws = new WebSocket('ws://localhost:8887', ['Tobii.Interaction']);




    ws.onmessage = (m) => {
      const parsed = JSON.parse(m.data) as ProtocolFrame;
      if (parsed.type === 'gazePoint') {
        const gaze = parsed.data;
        const cutHeight = window.outerHeight - window.innerHeight;
        const cutWidth = window.outerWidth - window.innerWidth;

        const clientPoint = {
          x: gaze.X - window.screenX - cutWidth,
          y: gaze.Y - window.screenY - cutHeight,
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
      ws.send('startGazePoint');
      ws.send('startEyePosition');
    };


    this.gazeHits$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        throttle(
          () => {
            const delayUntil = Math.max(0, this.pauseUntil - Date.now());
            console.info(`delay until ${delayUntil}`);
            return of(false).pipe(delay(delayUntil));
          },
          { leading: true, trailing: false }
        ),
        map(MainComponent.detectionToZone),
        tap((zone) => {
          this.renderPane.current.classList.remove('fadeout');
          if (zone === 'NEXT') {
            void this.renderPane.current.offsetWidth;
            this.renderPane.current.classList.add('fadeout');
          }
        }),
        switchMap((zone) => of(zone).pipe(delay(zone === 'NEXT' ? 4500 : 250))),
        tap((zone) => {
          if (zone === 'NEXT') {
            this.renderPane.current.classList.remove('fadeout');
          }
        })
      )
      .subscribe((zone) => {
        switch (zone) {
          case 'NEXT':
            this.nextImage();
            break;
          default:
            this.punish(zone);
        }
        this.gazeHits$.next(undefined);
      });
  }

  componentWillUnmount() {
    this.destroy$.next();
  }

  private readonly renderPane: RefObject<HTMLImageElement>;
  private readonly fileSelector: RefObject<HTMLInputElement>;

  private static arrayBufferToJsonObject(data: ArrayBuffer): unknown {
    var dataView = new DataView(data);
    var decoder = new TextDecoder('utf8');
    return JSON.parse(decoder.decode(dataView));
  }

  private static extractImageFilename(path: String): string {
    return path.substring(path.lastIndexOf('\\') + 1);
  }

  private static detectionToZone(
    name: DetectionType
  ): 'NEXT' | 'SOFT' | 'HARD' | undefined {
    switch (name) {
      case 'FACE_FEMALE':
      case 'FACE_MALE':
        return 'NEXT';
      case 'FEMALE_BREAST_COVERED':
      case 'FEMALE_GENITALIA_COVERED':
      case 'BUTTOCKS_EXPOSED':
        return 'SOFT';
      case 'MALE_GENITALIA_EXPOSED':
      case 'MALE_BREAST_EXPOSED':
      case 'FEMALE_BREAST_EXPOSED':
      case 'FEMALE_GENITALIA_EXPOSED':
      case 'ANUS_EXPOSED':
        return 'HARD';
      default:
        return undefined;
    }
  }

  private punish(level: 'SOFT' | 'HARD') {
    const errorIncrease = level === 'SOFT' ? 5 : 10;

    if (level === 'HARD') {
      this.setState((prev) => ({
        ...prev,
        points: prev.points - errorIncrease,
        currentImage: Math.max(0, prev.currentImage - 1),
        currentImageData: window.URL.createObjectURL(
          prev.imageFiles[Math.max(0, prev.currentImage - 1)]
        ),
        currentJson:
          prev.jsonFiles[
            prev.imageFiles[Math.max(0, prev.currentImage - 1)].name
          ],
      }));
    } else {
      this.setState((prev) => ({
        ...prev,
        points: prev.points - errorIncrease,
      }));
    }
  }

  private nextImage() {
    const nextIndex = (this.state.currentImage ?? -1) + 1;
    this.setState((prev) => ({
      ...prev,
      points: prev.points + 5,
      currentImage: nextIndex,
      currentImageData: window.URL.createObjectURL(prev.imageFiles[nextIndex]),
      currentJson: prev.jsonFiles[prev.imageFiles[nextIndex].name],
    }));
    this.renderPane.current.classList.remove('fadein');
    void this.renderPane.current.offsetWidth;
    this.renderPane.current.classList.add('fadein');
    this.pauseUntil = Date.now() + 1000;
  }

  private handleMqttSubmit() {}

  private handleMouseMoveOnPane(evt: MouseEvent<HTMLImageElement>) {
    const nativeCoords = {
      x: evt.nativeEvent.clientX,
      y: evt.nativeEvent.clientY,
    };

    this.moveToClient(nativeCoords);
  }

  private moveToClient(clientCoordinates: { x: number; y: number }): void {
    const renderPane = this.renderPane.current;
    const imageCoords = renderPane.getBoundingClientRect();
    const r = {
      x: clientCoordinates.x - imageCoords.x,
      y: clientCoordinates.y - imageCoords.y,
    };
    const tolerance = MainComponent.imageSize(renderPane) * 0.05;
    const hit = this.state.currentJson.output.detections.find((detection) => {
      const rect = MainComponent.purifyBoundingBoxToRectangle(
        detection.bounding_box
      );
      return MainComponent.distance(rect, r) < tolerance;
    });

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

    this.setState((prev) => ({
      ...prev,
      cursorPosition: clientCoordinates,
      cursorHint: hit ? MainComponent.detectionToZone(hit.name) : undefined,
    }));
  }

  private static imageSize(element: HTMLImageElement) {
    return Math.max(element.width, element.height);
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
      (f) => f.type === 'image/jpeg' || f.type === 'image/png'
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
      const imageFile = imageFiles[0];
      const imageFilesWithFaces = imageFiles.filter((file) =>
        jsons[file.name]?.output.detections.some(
          // image must have at least one zone to continue
          (detection) =>
            MainComponent.detectionToZone(detection.name) === 'NEXT'
        )
      );

      this.setState((prev) => ({
        ...prev,
        imageFiles: imageFilesWithFaces,
        jsonFiles: jsons,
      }));

      this.nextImage();
    });
  }

  render() {
    return (
      <div className="app">
        <header>
          <h5>Points: {this.state.points}</h5>
        </header>
        <main>
          <div className="flex">
            <img
              id="renderPane"
              ref={this.renderPane}
              src={this.state.currentImageData}
              onMouseMove={this.handleMouseMoveOnPane}
            ></img>
            <Cursor
              size={200}
              position={this.state.cursorPosition}
              hint={this.state.cursorHint}
            ></Cursor>
            {this.state.imageFiles.length > 0 ? (
              <button onClick={() => this.nextImage()}>Skip Image</button>
            ) : (
              ''
            )}
          </div>
          <details open>
            <summary>Rules</summary>
            <ul>
              <li>Look into their eyes or faces!</li>
              <li>Do not stare at private body parts!</li>
              <li>Especially do not stare at naked private body parts!</li>
              <li>Not following these rules will be punished.</li>
            </ul>
          </details>
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
              <em>Save JSON-Metadata</em> and run <em>Save Images</em>. Now copy
              all original images and all files from the <em>output/json</em>{' '}
              folder into a single directory and select it here.
            </p>
            <input
            ref={this.fileSelector}
              type="file"
              onChange={(e) => this.handleFileSelection(e)}
            ></input>
            <p>Suggestions/PRs for a public domain sample gallery are welcome!</p>
          </details>
          <details>
            <summary>Configure MQTT</summary>
            <form onSubmit={this.handleMqttSubmit} noValidate={true}>
              <div className="form-group">
                <label>
                  MQTT Server
                  <input type="text" name="mqttServer"></input>
                </label>
              </div>
              <div className="form-group">
                <label>
                  Punishment Topic
                  <input type="text" name="mqttPunishmentTopic"></input>
                </label>
              </div>
              <div className="form-group">
                <label>
                  Punishment Payload
                  <input type="text" name="mqttPunishmentPayload"></input>
                </label>
              </div>
              <button>Save and connect (TBD)</button>
            </form>
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
            <form onSubmit={this.handleMqttSubmit} noValidate={true}>
              <div className="form-group">
                <label>
                  Tobii Websocket Server
                  <input type="text" name="mqttServer"></input>
                </label>
              </div>
            </form>
          </details>
          <details>
            <summary>Run affected commands</summary>
          </details>
        </main>
      </div>
    );
  }
}
