import { Request, Response } from "express";
import { AdminCommantService } from "./comment-admin.service";


export const CommentModerationController = {
  async hideComment(req: Request, res: Response) {
    const comment = await AdminCommantService.updateStatus(
      req.params.commentId as string, 
      "hidden"
    );
    res.json(comment);
  },

  async showComment(req: Request, res: Response) {
    const comment = await AdminCommantService.updateStatus(
      req.params.commentId as string,
      "visible"
    );
    res.json(comment);
  },
};
