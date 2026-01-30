import { Request, Response } from "express";
import { ShareService } from "./share.service";
import { AuthRequest } from "../../types/auth-request";

export const ShareController = {
  async sharePost(req: Request, res: Response) {
     const authReq = req as AuthRequest;
    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { platform } = req.body;

    if (!platform) {
      return res.status(400).json({ message: "Platform is required" });
    }

    await ShareService.recordShare({
      postId: req.params.postId as string,
      platform,
      userId: authReq.user?._id, // nullable for guest
    });

    const totalShares = await ShareService.getTotalShares(req.params.postId as string);

    res.status(201).json({
      message: "Post shared successfully",
      totalShares,
    });
  },

  async getPostShareStats(req: Request, res: Response) {
    const stats = await ShareService.getPostShareStats(req.params.postId as string);
    res.json(stats);
  },
};
