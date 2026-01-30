import { Request, Response } from "express";
import { CommentService } from "./comment.service";
import { AuthRequest } from "../../types/auth-request";

export const CommentController = {
  async addComment(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const comment = await CommentService.create({
      postId: req.params.postId as string,
      authorId: authReq.user!._id,
      body: req.body.body,
      parentCommentId: req.body.parentCommentId,
    });

    res.status(201).json(comment);
  },

  async getPostComments(req: Request, res: Response) {
    const comments = await CommentService.getByPost(
      req.params.postId as string,
    );
    res.json(comments);
  },

  async deleteOwnComment(req: Request, res: Response) {
    const comment = await CommentService.delete(req.params.commentId as string);
    res.json(comment);
  },
};
