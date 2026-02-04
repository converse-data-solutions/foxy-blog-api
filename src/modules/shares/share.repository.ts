import { Types } from "mongoose";
import { Share } from "./share.model";

export class ShareRepository {
  // 🔹 Create share record
  static async create(data: {
    postId: Types.ObjectId;
    userId?: Types.ObjectId | null;
    platform: string;
  }) {
    return await Share.create(data);
  }

  // 🔹 Check if user already shared (anti-spam)
  static async exists(filter: {
    postId: Types.ObjectId;
    userId: Types.ObjectId;
    platform: string;
  }) {
    return await Share.exists(filter);
  }

  // 🔹 Total share count for a post
  static async countByPost(postId: Types.ObjectId) {
    return await Share.countDocuments({ postId });
  }

  // 🔹 Share count grouped by platform
  static async groupByPlatform(postId: Types.ObjectId) {
    return await Share.aggregate([
      { $match: { postId } },
      {
        $group: {
          _id: "$platform",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } }, // optional, nice for UI
    ]);
  }
};
