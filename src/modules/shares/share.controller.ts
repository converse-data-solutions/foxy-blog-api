import { Request, Response } from "express";
import { ShareService } from "./share.service";
import { AuthRequest } from "../../types/auth-request";
import { PostService } from "../posts/post.service";
import { HttpError } from "../../common/utils/httpError";

export const ShareController = {
  async sharePost(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    const userId = authReq.user?._id ?? null;

    const { slug } = req.params as { slug: string };
    const { platform } = req.body as { platform: string };

    const allowedPlatforms = ["facebook", "twitter", "linkedin", "whatsapp"];

    if (!allowedPlatforms.includes(platform)) {
      throw new HttpError(
        "Invalid platform. Allowed platforms are: " +
          allowedPlatforms.join(", "),
        400,
      );
    }

    const post = await PostService.getBySlug(slug);

    // 🔹 Record share intent (NOT actual share)
    await ShareService.recordShare({
      postId: post._id.toString(),
      platform,
      userId,
    });

    // 🔹 Backend does NOT redirect anymore
    return res.status(200).json({
      status: "success",
      message: "Share recorded",
    });
  },
  async getPostShareStats(req: Request, res: Response) {
    const { postId } = req.params as any;

    const stats = await ShareService.getShareStats(postId);

    res.json(stats);
  },
};
