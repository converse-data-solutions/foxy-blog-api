import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../../types/auth-request";
import { AuthJwtPayload } from "../interface/token-payload.interface";

export const optionalAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === "string") {
      throw new Error("Invalid token payload");
    }

    const payload = decoded as AuthJwtPayload;

    (req as AuthRequest).user = {
      _id: payload.userId,
      role: payload.role,
    };
  } catch {
    // Invalid token → still allow request as guest
  }

  next();
};
