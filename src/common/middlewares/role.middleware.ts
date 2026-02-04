import {  Response, NextFunction } from "express";
import { success } from "zod";

export const allowRoles =
  (...roles: string[]) =>
  (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Forbidden: insufficient permission",
      });
    }
    next();
  };
