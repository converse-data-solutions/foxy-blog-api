import { Types } from "mongoose";
import { Share } from "./share.model";

export const ShareService = {
  async recordShare(data: {
    postId: string;
    platform: string;
    userId?: string;
  }) {
    return Share.create({
      postId: new Types.ObjectId(data.postId),
      userId: data.userId ? new Types.ObjectId(data.userId) : null,
      platform: data.platform,
    });
  },

  async getPostShareStats(postId: string) {
    return Share.aggregate([
      { $match: { postId: new Types.ObjectId(postId) } },
      {
        $group: {
          _id: "$platform",
          count: { $sum: 1 },
        },
      },
    ]);
  },

  async getTotalShares(postId: string) {
    return Share.countDocuments({ postId });
  },
};
