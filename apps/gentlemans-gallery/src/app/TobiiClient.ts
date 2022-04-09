type UserPresence = 'Unknown' | 'Present' | 'NotPresent';
type EyeTrackingDeviceStatus =
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

type GazeTracking = 'GazeNotTracked' | 'GazeTracked';

interface Vector3 {
  readonly X: number;
  readonly Y: number;
  readonly Z: number;
}

interface HeadPoseHasRotation {
  readonly HasRotationX: boolean;
  readonly HasRotationY: boolean;
  readonly HasRotationZ: boolean;
}

interface GazePointData {
  readonly X: number;
  readonly Y: number;
  readonly Timestamp: number;
  readonly EngineTimestamp: number;
}

interface EyePositionData {
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

interface GazePointDataFrame {
  readonly type: 'gazePoint';
  readonly data: GazePointData;
}

interface EyePositionDataFrame {
  readonly type: 'eyePosition';
  readonly data: EyePositionData;
}
interface HeadPoseDataFrame {
  readonly type: 'headPose';
  readonly data: HeadPoseData;
}

interface TobiiStateFrame {
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

export class TobiiClient {}
