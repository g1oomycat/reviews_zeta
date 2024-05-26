export const ASPECT_RATIO = 1;
export const MIN_DIMENSION = 100;

// export const resizeAndCompressImage = (canvas) => {
//   // Reducing image size by changing its dimensions

//   let { width, height } = canvas;

//   if (width > height) {
//     if (width > MIN_DIMENSION) {
//       height *= MIN_DIMENSION / width;
//       width = MIN_DIMENSION;
//     }
//   } else {
//     if (height > MIN_DIMENSION) {
//       width *= MIN_DIMENSION / height;
//       height = MIN_DIMENSION;
//     }
//   }

//   // Create a new canvas to resize and compress the image
//   const outputCanvas = document.createElement("canvas");
//   outputCanvas.width = width;
//   outputCanvas.height = height;
//   const outputCtx = outputCanvas.getContext("2d");
//   outputCtx.drawImage(canvas, 0, 0, width, height);

//   return outputCanvas.toDataURL("image/jpeg", 1); // Compress image to 70% quality
// };

// export const setCanvasPreview = (
//   image, // HTMLImageElement
//   canvas, // HTMLCanvasElement
//   crop // PixelCrop
// ) => {
//   const ctx = canvas.getContext("2d");
//   if (!ctx) {
//     throw new Error("No 2d context");
//   }

//   // devicePixelRatio slightly increases sharpness on retina devices
//   // at the expense of slightly slower render times and needing to
//   // size the image back down if you want to download/upload and be
//   // true to the images natural size.
//   const pixelRatio = window.devicePixelRatio;
//   const scaleX = image.naturalWidth / image.width;
//   const scaleY = image.naturalHeight / image.height;

//   canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
//   canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

//   ctx.scale(pixelRatio, pixelRatio);
//   ctx.imageSmoothingQuality = "high";
//   ctx.save();

//   const cropX = crop.x * scaleX;
//   const cropY = crop.y * scaleY;

//   // Move the crop origin to the canvas origin (0,0)
//   ctx.translate(-cropX, -cropY);
//   ctx.drawImage(
//     image,
//     0,
//     0,
//     image.naturalWidth,
//     image.naturalHeight,
//     0,
//     0,
//     image.naturalWidth,
//     image.naturalHeight
//   );

//   ctx.restore();
// };
export function processAndSetImage(
  imgRef,
  previewCanvasRef,
  crop,

  quality
) {
  const img = imgRef.current;
  const canvas = previewCanvasRef.current;
  const ctx = canvas.getContext("2d");

  if (!crop || !img) {
    return;
  }

  // Рассчитываем область пиксельной обрезки
  const scale = img.naturalWidth / img.width;
  const pixelCrop = {
    x: crop.x * scale,
    y: crop.y * scale,
    width: crop.width * scale,
    height: crop.height * scale,
  };

  // Настройка размера холста для обрезки
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Отрисовка обрезанного изображения на холсте
  ctx.drawImage(
    img,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Проверка необходимости изменения размера
  let width = canvas.width;
  let height = canvas.height;

  if (width > MIN_DIMENSION || height > MIN_DIMENSION) {
    const scalingFactor = Math.min(
      MIN_DIMENSION / width,
      MIN_DIMENSION / height
    );
    width = width * scalingFactor;
    height = height * scalingFactor;
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(canvas, 0, 0, width, height);
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(tempCanvas, 0, 0, width, height);
  }

  // Компрессия изображения и получение данных в формате URL
  const finalImage = canvas.toDataURL("image/jpeg", quality);
  return finalImage;
}
