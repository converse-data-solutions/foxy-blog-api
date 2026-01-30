import { Types } from "mongoose";
import { Comment } from "./comment.model";

export const CommentService = {
  create(data: {
    postId: string;
    authorId: string;
    body: string;
    parentCommentId?: string;
  }) {
    return Comment.create({
      postId: new Types.ObjectId(data.postId),
      authorId: new Types.ObjectId(data.authorId),
      body: data.body,
      parentCommentId: data.parentCommentId
        ? new Types.ObjectId(data.parentCommentId)
        : null,
    });
  },

  getByPost(postId: string) {
    return Comment.find({
      postId,
      status: "visible",
    })
      .populate("authorId", "name username")
      .sort({ createdAt: 1 });
  },

  updateStatus(
    commentId: string,
    status: "visible" | "hidden" | "deleted"
  ) {
    return Comment.findByIdAndUpdate(
      commentId,
      { status },
      { new: true }
    );
  },

  delete(commentId: string) {
    return Comment.findByIdAndUpdate(
      commentId,
      { status: "deleted" },
      { new: true }
    );
  },
};
