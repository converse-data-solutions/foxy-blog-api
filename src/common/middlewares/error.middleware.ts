import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  

  const statusCode =
    err instanceof HttpError ? err.statusCode : 500;

  const message =
    err instanceof HttpError ? err.message : err
  return res.status(statusCode).json({
    statusCode,
    message,
    data: null,
  });
};
