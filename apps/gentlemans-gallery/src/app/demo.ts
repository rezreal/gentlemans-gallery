import { PurifyMetadata } from './purify';


export function loadDemoImages(): Promise<{imageFiles: File[], jsonFiles: { [_: string]: PurifyMetadata }}> {
  return Promise.all([
    fetch('assets/demo/woman.jpg')
      .then((r) => r.blob())
      .then((blob) => new File([blob], 'woman.jpg', {})),
    fetch('assets/demo/man.jpg')
      .then((r) => r.blob())
      .then((blob) => new File([blob], 'man.jpg', {})),
  ]).then((files) =>
    ({
      imageFiles: files,
      jsonFiles: {
        'man.jpg': {
          output: {
            nsfw_score: 1,
            detections: [
              {
                bounding_box: [185, 275, 225, 310],
                confidence: 1.0,
                name: 'FACE_MALE',
              },
              {
                bounding_box: [262, 257, 285, 335],
                confidence: 1.0,
                name: 'MALE_BREAST_EXPOSED',
              },
              {
                bounding_box: [368, 280, 400, 320],
                confidence: 1.0,
                name: 'MALE_GENITALIA_EXPOSED',
              },
            ],
          },
          file: 'man.jpg',
        },
        'woman.jpg': {
          output: {
            nsfw_score: 1,
            detections: [
              {
                bounding_box: [
                  288.84649658203125,
                  546.881103515625,
                  368.3436584472656,
                  625.3768310546875,
                ],
                confidence: 1.0,
                name: 'FACE_FEMALE',
              },
              {
                bounding_box: [447.0, 512.0, 514.0, 680.0],
                confidence: 1.0,
                name: 'FEMALE_BREAST_EXPOSED',
              },
              {
                bounding_box: [670.0, 562.0, 730.0, 626.0],
                confidence: 1.0,
                name: 'FEMALE_GENITALIA_EXPOSED',
              },
              {
                bounding_box: [550.0, 540.0, 645.0, 664.0],
                confidence: 1.0,
                name: 'BELLY_EXPOSED',
              },
            ],
          },
          file: 'woman.jpg',
        },
      },
    })
  );
}
