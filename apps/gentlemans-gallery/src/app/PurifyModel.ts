import * as tf from '@tensorflow/tfjs';
import { PixelData } from '@tensorflow/tfjs';

export const [modelWeight, modelHeight] = [320, 320];

export async function loadmodel(modelUrl: string): Promise<tf.GraphModel> {
  console.info('loading model');
  return await tf.loadGraphModel(modelUrl);
}

export type NeutralDetections =
  | 'ARMPITS_COVERED'
  | 'ARMPITS_EXPOSED'
  | 'FEET_COVERED'
  | 'FEET_EXPOSED'
  | 'BELLY_EXPOSED'
  | 'BELLY_COVERED'
  | 'ANUS_EXPOSED'
  | 'ANUS_COVERED'
  | 'BUTTOCKS_EXPOSED'
  | 'BUTTOCKS_COVERED';
export type MaleDetections =
  | 'FACE_MALE'
  | 'MALE_GENITALIA_EXPOSED'
  | 'MALE_GENITALIA_COVERED'
  | 'MALE_BREAST_EXPOSED'
  | 'MALE_BREAST_COVERED';
export type FemaleDetections =
  | 'FACE_FEMALE'
  | 'FEMALE_BREAST_EXPOSED'
  | 'FEMALE_BREAST_COVERED'
  | 'FEMALE_GENITALIA_EXPOSED'
  | 'FEMALE_GENITALIA_COVERED';
export type DetectionType =
  | MaleDetections
  | FemaleDetections
  | NeutralDetections;

const names: Array<DetectionType> = [
  'BELLY_EXPOSED',
  'BELLY_COVERED',
  'BUTTOCKS_EXPOSED',
  'BUTTOCKS_COVERED',
  'FEMALE_BREAST_EXPOSED',
  'FEMALE_BREAST_COVERED',
  'FEMALE_GENITALIA_EXPOSED',
  'FEMALE_GENITALIA_COVERED',
  'MALE_GENITALIA_COVERED',
  'MALE_GENITALIA_EXPOSED',
  'MALE_BREAST_EXPOSED',
  'MALE_BREAST_COVERED',
  'FACE_FEMALE',
  'FACE_MALE',
  'FEET_COVERED',
  'FEET_EXPOSED',
  'ARMPITS_COVERED',
  'ARMPITS_EXPOSED',
  'ANUS_COVERED',
  'ANUS_EXPOSED',
];

/**
 * x1, y1, x2, y2
 */
export type BoundingBox = [number, number, number, number];

export interface PurifyDetection {
  readonly bounding_box: BoundingBox;
  readonly confidence: number;
  readonly name: DetectionType;
}

export interface PurifyMetadata {
  readonly output: {
    nsfw_score: number;
    readonly detections: readonly PurifyDetection[];
  };
  readonly file: string;
}

export function toPurifyDetections(data: {
  valid_detections: Int32Array;
  classes: Float32Array;
  boxes: Float32Array;
  scores: Float32Array;
}): PurifyDetection[] {
  const valid_detections_count = data.valid_detections[0];
  const classes = data.classes.slice(0, valid_detections_count);
  const boxes = data.boxes;
  const scores = data.scores.slice(0, valid_detections_count);

  return Array.from(scores).map((e, i) => ({
    bounding_box: Array.from(boxes.slice(i * 4, (i + 1) * 4)) as [
      number,
      number,
      number,
      number
    ],
    name: names[classes[i]],
    confidence: e,
  }));
}

export async function processImage(
  model: tf.GraphModel,
  pixels:
    | PixelData
    | ImageData
    | HTMLImageElement
    | HTMLCanvasElement
    | HTMLVideoElement
    | ImageBitmap,
  confidenceThreshold: number
): Promise<PurifyDetection[]> {
  const tfObj = tf.browser.fromPixels(pixels);
  const input = tf.image.resizeBilinear(tfObj, [modelWeight, modelHeight]);
  const inputDiv = input.div(255);
  const expandDims = inputDiv.expandDims(0);
  const res = await model.executeAsync(expandDims);
  const [boxes_res, scores_res, classes_res, valid_detections_res] = res as [
    tf.Tensor,
    tf.Tensor,
    tf.Tensor,
    tf.Tensor
  ];
  const valid_detections_count = valid_detections_res.dataSync()[0];
  const classes = classes_res.dataSync().slice(0, valid_detections_count);
  const boxes = boxes_res.dataSync();
  const scores = scores_res.dataSync().slice(0, valid_detections_count);

  boxes_res.dispose();
  scores_res.dispose();
  classes_res.dispose();
  valid_detections_res.dispose();
  tfObj.dispose();
  input.dispose();
  inputDiv.dispose();
  expandDims.dispose();

  return Array.from(scores)
    .map((e, i) => ({
      bounding_box: Array.from(boxes.slice(i * 4, (i + 1) * 4)) as [
        number,
        number,
        number,
        number
      ],
      name: names[classes[i]],
      confidence: e,
    }))
    .filter((d) => d.confidence >= (confidenceThreshold || 0));
}
