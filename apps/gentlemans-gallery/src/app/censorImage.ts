import {DetectionType, PurifyDetection} from './PurifyModel';

export function readAsDataUrl(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = () => {
      resolve(fr.result as string);
    };
    fr.readAsDataURL(file);
  });
}

export function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

function blurRectangle(
  ctx: CanvasRenderingContext2D,
  h: number,
  w: number,
  blur: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.shadowBlur = blur;
  ctx.shadowColor = color;
  ctx.shadowOffsetX = w;
  ctx.shadowOffsetY = h;
  ctx.fillRect(-w + blur, -h + blur, w - blur * 2, h - blur * 2);
}

export async function censorImage(
  img: HTMLImageElement,
  detections: PurifyDetection[],
  censorRegionDecider?: (d:DetectionType) => boolean
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);

  const censorTargets = detections.filter(d => censorRegionDecider? censorRegionDecider(d.name) : true);


  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#fff';

  const numberFormat = new Intl.NumberFormat('en-GB', {
    maximumSignificantDigits: 2,
  });
  for (const ct of censorTargets) {
    // draw shape
    // ctx.fillStyle = "#F008";
    const x = ct.bounding_box[0] * canvas.width;
    const y = ct.bounding_box[1] * canvas.height;
    const width = ct.bounding_box[2] * canvas.width - x;
    const height = ct.bounding_box[3] * canvas.height - y;

    ctx.strokeRect(x, y, width, height);

    ctx.filter = 'blur(20px)';
    ctx.drawImage(canvas, x, y, width, height, x, y, width, height);
    ctx.filter = 'none';

    ctx.font = '48px';
    ctx.fillText(
      `${ct.name} (${numberFormat.format(ct.confidence)})`,
      x + 2,
      y + 12
    );
  }

  return canvas.toDataURL('image/png');
}
