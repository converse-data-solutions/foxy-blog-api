import { Request, Response } from "express";
import { ReactionService } from "./reaction.service";
import { AuthRequest } from "../../types/auth-request";

export const ReactionController = {
  async react(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const result = await ReactionService.toggleReaction({
      targetType: req.body.targetType,
      targetId: req.body.targetId,
      userId: authReq.user!._id,
      reaction: req.body.reaction,
    });

    res.status(200).json(result);
  },

  async getReactionCounts(req: Request, res: Response) {
    const counts = await ReactionService.getCounts(
      req.params.targetType as "post" | "comment",
      req.params.targetId as string,
    );

    res.json(counts);
  },
};
