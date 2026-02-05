import { Request, Response } from "express";
import { UserService } from "./user.service";
import { AuthRequest } from "../../types/auth-request";

export const UserController = {
  async getMe(req: Request, res: Response) {
    const authReq = req as AuthRequest;

    const userId = authReq.user._id;

    const user = await UserService.findById(userId);
    const profile = await UserService.getByUserId(userId);

    res.json({ user, profile });
  },

  async updateProfile(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const userId = authReq.user!._id;

    const profile = await UserService.upsert(userId, req.body);
    res.json(profile);
  },

  async getMyReactions(req: Request, res: Response) {
    const authReq = req as AuthRequest;

    const reactions = await UserService.getMyReactions(authReq.user._id);

    res.json({ data: reactions });
  },

  async getMyShares(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const shares = await UserService.getMyShares(authReq.user._id);

    res.json({ data: shares });
  },

    async updatePassword(req: Request, res: Response) {
        const authReq = req as AuthRequest;
        const { oldPassword, newPassword } = req.body;
  
        await UserService.updatePassword(
          authReq.user!._id,
          oldPassword,
          newPassword
        );
  
        res.json({ message: "Password updated successfully" });
      } ,
  
};
