import { Types } from "mongoose";
import { ShareRepository } from "./share.repository";
import { PostRepository } from "../posts/user/post.repository";
const ALLOWED_PLATFORMS = ["facebook", "twitter", "linkedin", "whatsapp"];

export const ShareService = {
  // 🔹 Record share intent (not actual share)
  async recordShare(data: {
    postId: string;
    platform: string;
    userId?: string | null;
  }) {
    if (!ALLOWED_PLATFORMS.includes(data.platform)) {
      throw new Error("Unsupported platform");
    }

    const postObjectId = new Types.ObjectId(data.postId);
    const userObjectId = data.userId
      ? new Types.ObjectId(data.userId)
      : null;

    /**
     * Optional: prevent spam
     * One share per user per platform per post
     */
    if (userObjectId) {
      const alreadyShared = await ShareRepository.exists({
        postId: postObjectId,
        userId: userObjectId,
        platform: data.platform,
      });

      if (alreadyShared) {
        return { skipped: true };
      }
    }

    await ShareRepository.create({
      postId: postObjectId,
      userId: userObjectId,
      platform: data.platform,
    });

    return { skipped: false };
  },

  // 🔹 Share analytics (used for UI counters)
  async getShareStats(postId: string) {
    const postObjectId = new Types.ObjectId(postId);

    const [total, byPlatform] = await Promise.all([
      ShareRepository.countByPost(postObjectId),
      ShareRepository.groupByPlatform(postObjectId),
    ]);

    /**
     * Normalize platform output
     * [
     *   { _id: "linkedin", count: 5 }
     * ]
     * →
     * { linkedin: 5 }
     */
    const platforms: Record<string, number> = {};
    for (const item of byPlatform) {
      platforms[item._id] = item.count;
    }

    return {
      total,
      platforms,
    };
  },

  async getBySlug(slug: string) {
    return PostRepository.findBySlugWithRelated(slug);
  }
};
