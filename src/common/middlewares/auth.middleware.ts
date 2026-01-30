import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../../types/auth-request";

export const requireAuth = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: "Authentication required",
      data: null,
    });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
     (req as AuthRequest).user = {
    _id: decoded.userId,
    role: decoded.role,
  };
    next();
  } catch {
    return res.status(401).json({
      statusCode: 401,
      message: "Invalid token",
      data: null,
    });
  }
};
