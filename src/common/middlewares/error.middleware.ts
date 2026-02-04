import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError";
import { logger } from "../../config/winston.logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // log once (replace with Winston later)
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
