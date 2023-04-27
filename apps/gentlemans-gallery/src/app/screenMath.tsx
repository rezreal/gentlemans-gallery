import { BoundingBox } from './PurifyModel';

export function imageSize(element: HTMLImageElement): number {
  return Math.max(element.naturalWidth, element.naturalHeight);
}

export function distance(r: DOMRect, p: { x: number; y: number }): number {
  const cx = Math.max(Math.min(p.x, r.x + r.width), r.x);
  const cy = Math.max(Math.min(p.y, r.y + r.height), r.y);
  return Math.sqrt((p.x - cx) * (p.x - cx) + (p.y - cy) * (p.y - cy));
}

export function purifyBoundingBoxToRectangle(
  boundingBox: BoundingBox,
  naturalWidth: number,
  naturalHeight: number
): DOMRect {
  return new DOMRect(
    boundingBox[0] * naturalWidth,
    boundingBox[1] * naturalHeight,
    (boundingBox[2] - boundingBox[0]) * naturalWidth,
    (boundingBox[3] - boundingBox[1]) * naturalHeight
  );
}
