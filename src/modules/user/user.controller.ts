import { Request, Response } from "express";
import { UserService } from "./user.service";
import { AuthRequest } from "../../types/auth-request";

export const UserController = {
  async getMe(req: Request, res: Response) {
    const authReq = req as AuthRequest;

    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = authReq.user._id;

    const user = await UserService.findById(userId);
    const profile = await UserService.getByUserId(userId);

    res.json({ user, profile });
  },

  async updateProfile(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = authReq.user!._id;

    const profile = await UserService.upsert(userId, req.body);
    res.json(profile);
  },
};
