import {Dispatch} from "react";

export type UserPresence = 'Unknown' | 'Present' | 'NotPresent';
export type EyeTrackingDeviceStatus =
  | 'Configuring'
  | 'ConnectionError'
  | 'DeviceNotConnected'
  | 'Initializing'
  | 'InvalidConfiguration'
  | 'NotAvailable'
  | 'Tracking'
  | 'TrackingPaused'
  | 'TrackingUnavailable'
  | 'UnknownError';

export type GazeTracking = 'GazeNotTracked' | 'GazeTracked';

export interface Vector3 {
  readonly X: number;
  readonly Y: number;
  readonly Z: number;
}

export interface HeadPoseHasRotation {
  readonly HasRotationX: boolean;
  readonly HasRotationY: boolean;
  readonly HasRotationZ: boolean;
}

export interface GazePointData {
  readonly X: number;
  readonly Y: number;
  readonly Timestamp: number;
  readonly EngineTimestamp: number;
}

export interface EyePositionData {
  readonly HasLeftEyePosition: boolean;
  readonly HasRightEyePosition: boolean;
  readonly LeftEye: boolean;
  readonly LeftEyeNormalized: Vector3;
  readonly RightEye: Vector3;
  readonly RightEyeNormalized: Vector3;
  readonly Timestamp: number;
  readonly EngineTimestamp: number;
}

interface HeadPoseData {
  readonly HasHeadPosition: boolean;
  readonly HeadPosition: Vector3;
  readonly HasRotation: HeadPoseHasRotation;
  readonly HeadRotation: Vector3;
  readonly Timestamp: number;
  readonly EngineTimestamp: number;
}

export interface GazePointDataFrame {
  readonly type: 'gazePoint';
  readonly data: GazePointData;
}

export interface EyePositionDataFrame {
  readonly type: 'eyePosition';
  readonly data: EyePositionData;
}
export interface HeadPoseDataFrame {
  readonly type: 'headPose';
  readonly data: HeadPoseData;
}

export interface TobiiStateFrame {
  readonly type: 'state';
  readonly data: {
    readonly userPresence: UserPresence;
    readonly userProfileName: string;
    readonly eyeTrackingDeviceStatus: EyeTrackingDeviceStatus;
    readonly gazeTracking: GazeTracking;
    readonly screenBounds: {
      readonly X: number;
      readonly Y: number;
      readonly Width: number;
      readonly Height: number;
    };
    readonly displaySize: {
      readonly Height: number;
      readonly Width: number;
    };
  };
}

export type ProtocolFrame =
  | GazePointDataFrame
  | EyePositionDataFrame
  | HeadPoseDataFrame
  | TobiiStateFrame;

export type ProtocolCommand =
  | 'state'
  | 'startGazePoint'
  | 'startEyePosition'
  | 'startHeadPose'
  | 'stopGazePoint'
  | 'stopEyePosition'
  | 'stopEyePose';

export interface TobiiConfig {
  readonly use: boolean;
  readonly disableMouse: boolean;
  readonly server?: string;
}

export interface RelativeScreenCoordinates {
  readonly x: number,
  readonly y: number
}


export class TobiiClient {
  private ws?: WebSocket;
  public constructor(private readonly config: Required<TobiiConfig>,
                     private readonly gazePointTracker?: Dispatch<RelativeScreenCoordinates>,
                      private readonly presenceChange?: Dispatch<UserPresence>,
                     private readonly eyePositionChange?: Dispatch<EyePositionData>
                     ) {}

  private tobiiScreenWidth = window.screen.width;
  private tobiiScreenHeight = window.screen.height;

  public stop(): void {
    if (this.ws)
      this.ws?.close(1001, "Going Away")
  }

  public start(): void {
    if (!this.ws) {
      this.ws = new WebSocket(this.config.server, ['Tobii.Interaction']);
    }

    this.ws.onopen = () => {
      this.ws?.send('state');
      this.ws?.send('startGazePoint');
      this.ws?.send('startEyePosition');
    };

    this.ws.onmessage = (m) => {

      const parsed = JSON.parse(m.data) as ProtocolFrame;
      if (parsed.type === 'state') {
        this.tobiiScreenWidth = parsed.data.screenBounds.Width;
        this.tobiiScreenHeight = parsed.data.screenBounds.Height;
        this.presenceChange?.(parsed.data.userPresence);

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
        this.gazePointTracker?.(clientPoint);


      } else if (parsed.type === 'eyePosition') {
        const eyePosition = parsed.data;
        this.eyePositionChange?.(eyePosition);
      }
    }
  }
}
