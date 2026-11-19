import multer from "multer";

export const notFoundHandler = (req, res) =>
  res.status(404).json({
    success: false,
    message: "Route not found",
  });

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body",
    });
  }

  if (error.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      message: "Request body exceeds the 1 MB limit",
    });
  }

  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      success: false,
      message: "Image exceeds the 10 MB limit",
    });
  }

  if (error.code === "UNSUPPORTED_IMAGE_TYPE") {
    return res.status(415).json({
      success: false,
      message: "Only PNG, JPG, and WEBP images are supported",
    });
  }

  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: "Invalid image upload",
    });
  }

  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Origin is not allowed",
    });
  }

  console.error("Unhandled request error:", error);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
