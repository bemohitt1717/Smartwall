import { rateLimit } from "express-rate-limit";

const createJsonRateLimit = (limit, message) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) =>
      res.status(429).json({
        success: false,
        message,
      }),
  });

export const authRateLimit = createJsonRateLimit(
  10,
  "Too many authentication attempts. Please try again in 15 minutes.",
);

export const imageUploadRateLimit = createJsonRateLimit(
  20,
  "Too many image uploads. Please try again in 15 minutes.",
);
