import { Types } from "mongoose";
import { PostView } from "./post-view.model";
import { RecordPostViewDTO } from "./post-view.dto";

export class PostViewRepository {
  static async createView(data: RecordPostViewDTO) {
    try {
      return await PostView.create({
        postId: new Types.ObjectId(data.postId),
        userId: data.userId ? new Types.ObjectId(data.userId) : null,
        sessionId: data.sessionId ?? null,
      });
    } catch (error) {
      throw error;
    }
  }

  static async countByPostId(postId: string) {
    return PostView.countDocuments({
      postId: new Types.ObjectId(postId),
    });
  }
};
