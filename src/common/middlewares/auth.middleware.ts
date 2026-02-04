import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../../types/auth-request";
import { AuthJwtPayload } from "../interface/token-payload.interface";
import { HttpError } from "../utils/httpError";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Authentication required",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === "string") {
      throw new HttpError("Invalid token payload", 401);
    }

    const payload = decoded as AuthJwtPayload;

    (req as AuthRequest).user = {
      _id: payload.userId,
      role: payload.role,
    };
    next();
  } catch {
    throw new HttpError("Invalid token", 401);
  }
};
