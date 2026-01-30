import { Request, Response, NextFunction } from "express";
import { PostService } from "./post.service";
import { AuthRequest } from "../../types/auth-request";


export const PostController = {
  async create(req: Request, res: Response, next: NextFunction) {
     const authReq = req as AuthRequest;
    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const post = await PostService.create({
        ...req.body,
        authorId: authReq.user._id,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Post created",
        data: post,
      });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: any, res: Response, next: NextFunction) {
    try {
      const posts = await PostService.getAll(req.user);
      res.json({ data: posts });
    } catch (err) {
      next(err);
    }
  },

  async getOne(req: any, res: Response, next: NextFunction) {
    try {
      const post = await PostService.getById(
        req.params.id,
        req.user
      );
      res.json({ data: post });
    } catch (err) {
      next(err);
    }
  },

  async update(req: any, res: Response, next: NextFunction) {
    try {
      const post = await PostService.update(
        req.params.id,
        req.user,
        req.body
      );
      res.json({ message: "Post updated", data: post });
    } catch (err) {
      next(err);
    }
  },

  async delete(req: any, res: Response, next: NextFunction) {
    try {
      await PostService.remove(req.params.id, req.user);
      res.json({ message: "Post deleted" });
    } catch (err) {
      next(err);
    }
  },
};
