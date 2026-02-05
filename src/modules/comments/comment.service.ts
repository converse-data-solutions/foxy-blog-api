import { Types } from "mongoose";
import { CommentRepository } from "./comment.repository";

export class CommentService {
  static async create(data: {
    postId: string;
    authorId: string;
    body: string;
    parentCommentId?: string;
  }) {
    const comment = await CommentRepository.create({
      postId: new Types.ObjectId(data.postId),
      authorId: new Types.ObjectId(data.authorId),
      body: data.body,
      parentCommentId: data.parentCommentId
        ? new Types.ObjectId(data.parentCommentId)
        : null,
    });
    return comment;
  }

  static async getByPost(postId: string) {
    return await CommentRepository.findByPost(postId);
  }


  static async delete(commentId: string) {
    // soft delete
    return await CommentRepository.updateStatus(commentId, "deleted");
  }
};
