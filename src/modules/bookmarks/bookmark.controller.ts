import { Request, Response } from "express";
import { BookmarkService } from "./bookmark.service";
import { AuthRequest } from "../../types/auth-request";

export const BookmarkController = {
  async toggleBookmark(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const result = await BookmarkService.toggle(
      authReq.user!._id,
      req.params.postId as string,
    );

    res.json(result);
  },

  async getMyBookmarks(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const bookmarks = await BookmarkService.getMyBookmarks(authReq.user!._id);
    res.json(bookmarks);
  },
};
