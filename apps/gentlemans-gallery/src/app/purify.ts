export type NeutralDetections = "ARMPITS_EXPOSED" | "FEET_COVERED" | "FEET_EXPOSED" | "BELLY_EXPOSED" | "BELLY_COVERED" | 'ANUS_EXPOSED' | 'ANUS_COVERED' | 'BUTTOCKS_EXPOSED'
export type MaleDetections = "FACE_MALE" | "MALE_GENITALIA_EXPOSED" | "MALE_GENITALIA_COVERED" | "MALE_BREAST_EXPOSED" | "MALE_BREAST_COVERED"
export type FemaleDetections = "FACE_FEMALE" |"FEMALE_BREAST_EXPOSED" | "FEMALE_BREAST_COVERED" | "FEMALE_GENITALIA_EXPOSED" | "FEMALE_GENITALIA_COVERED"
export type DetectionType = MaleDetections | FemaleDetections | NeutralDetections

export interface PurifyDetection {
  /**
   * y1, x1, y2, x2
   */
  "bounding_box": [number,number,number,number],
  confidence: number,
  name: DetectionType
}

export interface PurifyMetadata {
  readonly output: {
    "nsfw_score": number,
    detections: ReadonlyArray<PurifyDetection>
  }
  file: string
};

