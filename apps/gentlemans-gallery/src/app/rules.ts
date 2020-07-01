import { DetectionType } from "./purify";

export interface Rules {
  focusDuration: number;
  focusRegions: DetectionType[];
  softPunishRegions: DetectionType[];
  hardPunishRegions: DetectionType[];
  showGaze: boolean;
  allowSkipImage: boolean;
  softFilter: 'pixelate' | 'saturate';
  playSounds: boolean;
  fullscreen: boolean;
  shuffleGallery: boolean;
}

export const defaultRules: Rules = {
  focusDuration: 2,
  focusRegions: ['FACE_FEMALE', 'FACE_MALE'],
  softPunishRegions: [
    'FEMALE_BREAST_COVERED',
    'FEMALE_GENITALIA_COVERED',
    'MALE_BREAST_EXPOSED',
    'BUTTOCKS_EXPOSED',
  ],
  hardPunishRegions: [
    'MALE_GENITALIA_EXPOSED',
    'FEMALE_BREAST_EXPOSED',
    'FEMALE_GENITALIA_EXPOSED',
    'ANUS_EXPOSED',
  ],
  showGaze: true,
  allowSkipImage: true,
  softFilter: 'saturate',
  playSounds: true,
  fullscreen: false,
  shuffleGallery: false,
};
