/**
 * see https://wicg.github.io/video-rvfc/#dictdef-videoframemetadata
 */
interface VideoFrameMetadata {
  presentationTime: DOMHighResTimeStamp;
  expectedDisplayTime: DOMHighResTimeStamp;

  width: number;
  height: number;
  mediaTime: number;

  presentedFrames: number;
  processingDuration?: number;

  captureTime?: number;
  receiveTime?: number;
  rtpTimestamp?: number;
}

export default VideoFrameMetadata;
