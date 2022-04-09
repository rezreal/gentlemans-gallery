export async function blobToImageData(blob: Blob): Promise<ImageData> {
  let blobUrl = URL.createObjectURL(blob);

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = err => reject(err);
    img.src = blobUrl;
  });

  URL.revokeObjectURL(blobUrl);
  // Limit to 256x256px while preserving aspect ratio
  let [w, h] = [img.width, img.height]

  let canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  let ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  return ctx.getImageData(0, 0, w, h);    // some browsers synchronously decode image here
}

