import { Request, Response, NextFunction } from "express";
import { AdminPostService } from "./admin-post.service";

export const AdminPostController ={
   async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AdminPostService.getAll(req.query);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

   async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await AdminPostService.getById(req.params.id as string);
      res.status(200).json({ success: true, data: post });
    } catch (err) {
      next(err);
    }
  },

   async unpublish(req: Request, res: Response, next: NextFunction) {
    try {
      await AdminPostService.unpublish(req.params.id as string);
      res.status(200).json({ message: "Post unpublished successfully" });
    } catch (err) {
      next(err);
    }
  },



   async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      await AdminPostService.softDelete(req.params.id as string);
      res.status(200).json({ message: "Post deleted (soft)" });
    } catch (err) {
      next(err);
    }
  },

   async restore(req: Request, res: Response, next: NextFunction) {
    try {
      await AdminPostService.restore(req.params.id as string);
      res.status(200).json({ message: "Post restored successfully" });
    } catch (err) {
      next(err);
    }
  },
}
