import { Types } from "mongoose";
import { Comment } from "./comment.model";

export class CommentRepository {
  static async create(data: {
    postId: Types.ObjectId;
    authorId: Types.ObjectId;
    body: string;
    parentCommentId: Types.ObjectId | null;
  }) {
    return Comment.create(data);
  }

  static async findByPost(postId: string) {
    return await Comment.find({
      postId,
      status: "visible",
    })
      .populate("authorId", "name username")
      .sort({ createdAt: 1 });
  }

  static async updateStatus(
    commentId: string,
    status: "visible" | "hidden" | "deleted"
  ) {
    return await Comment.findByIdAndUpdate(
      commentId,
      { status },
      { new: true }
    );
  }
};
