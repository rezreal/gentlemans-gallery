import {PurifyDetection} from "./PurifyModel";

export interface SlideData {
  readonly dataUrl: string;
  readonly dataUrlCensored: string;
  readonly name: string;
  readonly detections: readonly PurifyDetection[];
  readonly naturalWidth: number;
  readonly naturalHeight: number;
}
