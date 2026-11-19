const MAX_IMAGE_EDGE = 2560;
const IMAGE_OPTIMIZATION_THRESHOLD = 2 * 1024 * 1024;
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;
const WEBP_QUALITY = 0.9;
const preparedImages = new WeakMap();

const encodeCanvas = (canvas) =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Browser could not encode the image"));
          return;
        }

        resolve(blob);
      },
      "image/webp",
      WEBP_QUALITY,
    );
  });

const createOptimizedImage = async (file) => {
  if (file.size <= IMAGE_OPTIMIZATION_THRESHOLD) return file;

  if (typeof createImageBitmap !== "function") {
    console.warn("Image resizing is not supported in this browser; using the original image.");
    return file;
  }

  const bitmap = await createImageBitmap(file);

  try {
    const longestEdge = Math.max(bitmap.width, bitmap.height);
    const scale = Math.min(1, MAX_IMAGE_EDGE / longestEdge);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Browser could not prepare the image canvas");
    }

    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await encodeCanvas(canvas);
    canvas.width = 0;
    canvas.height = 0;

    if (blob.type !== "image/webp") {
      console.warn("WebP encoding is not supported in this browser; using the original image.");
      return file;
    }

    if (blob.size > MAX_UPLOAD_SIZE) {
      console.warn("Optimized image exceeds the upload limit; using the original image.");
      return file;
    }

    if (longestEdge <= MAX_IMAGE_EDGE && blob.size >= file.size) {
      return file;
    }

    const baseName = file.name.replace(/\.[^.]+$/, "");
    const preparedFile = new File([blob], `${baseName}.webp`, {
      type: "image/webp",
      lastModified: file.lastModified,
    });

    preparedImages.set(preparedFile, Promise.resolve(preparedFile));
    return preparedFile;
  } finally {
    bitmap.close();
  }
};

export const prepareImageForUpload = (file) => {
  const cachedImage = preparedImages.get(file);
  if (cachedImage) return cachedImage;

  const preparation = createOptimizedImage(file).catch((error) => {
    preparedImages.delete(file);
    throw error;
  });
  preparedImages.set(file, preparation);

  return preparation;
};
