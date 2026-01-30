import { Types } from "mongoose";
import { PostView } from "./post-view.model";

export const PostViewService = {
  async recordView(data: {
    postId: string;
    userId?: string;
    sessionId?: string;
  }) {
    try {
      return await PostView.create({
        postId: new Types.ObjectId(data.postId),
        userId: data.userId ? new Types.ObjectId(data.userId) : null,
        sessionId: data.sessionId || null,
      });
    } catch (error: any) {
      // Duplicate view → ignore
      if (error.code === 11000) {
        return null;
      }
      throw error;
    }
  },

  async getPostViewCount(postId: string) {
    return PostView.countDocuments({ postId });
  },
};
