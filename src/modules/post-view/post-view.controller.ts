import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { PostViewService } from "./post-view.service";
import { AuthRequest } from "../../types/auth-request";

export const PostViewController = {
  async viewPost(req: Request, res: Response) {
     const authReq = req as AuthRequest;
    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const postId = req.params.postId;

    const userId = authReq.user?._id;

    // Guest tracking via sessionId (cookie or header)
    let sessionId = req.cookies?.sessionId || req.headers["x-session-id"];

    if (!userId && !sessionId) {
      sessionId = uuidv4();
      res.cookie("sessionId", sessionId, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      });
    }

    await PostViewService.recordView({
      postId: postId as string,
      userId,
      sessionId: sessionId as string,
    });

    const views = await PostViewService.getPostViewCount(postId as string);

    res.json({ views });
  },
};
