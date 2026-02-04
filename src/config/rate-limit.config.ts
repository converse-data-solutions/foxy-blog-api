import rateLimit from "express-rate-limit";


const baseLimiter = (
  windowMs: number,
  max: number,
  message: string
) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({ message });
    },
  });

export const authLimiter = baseLimiter(
  15 * 60 * 1000, // 15 min
  10,
  "Too many login attempts. Try again later."
);

export const commentLimiter = baseLimiter(
  60 * 1000, // 1 min
  30,
  "Too many comments. Slow down."
);

export const reactionLimiter = baseLimiter(
  60 * 1000,// 1 min
  60,
  "Too many reactions."
);

export const bookmarkLimiter = baseLimiter(
  60 * 1000,// 1 min
  40,
  "Too many bookmark requests."
);

export const uploadLimiter = baseLimiter(
  60 * 60 * 1000, // 1 hour
  50,
  "Upload limit exceeded."
);

export const readLimiter = baseLimiter(
  60 * 1000, // 1 min
  3,
  "Too many requests."
);

export const adminLimiter = baseLimiter(
  15 * 60 * 1000,// 15 min
  100,
  "Admin rate limit exceeded."
);
