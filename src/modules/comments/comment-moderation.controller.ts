import { Request, Response } from "express";
import { CommentService } from "./comment.service";

export const CommentModerationController = {
  async hideComment(req: Request, res: Response) {
    const comment = await CommentService.updateStatus(
      req.params.commentId as string, 
      "hidden"
    );
    res.json(comment);
  },

  async showComment(req: Request, res: Response) {
    const comment = await CommentService.updateStatus(
      req.params.commentId as string,
      "visible"
    );
    res.json(comment);
  },
};
