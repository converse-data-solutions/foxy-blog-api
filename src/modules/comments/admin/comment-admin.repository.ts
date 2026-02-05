import { Comment } from "../comment.model";

 export class AdminCommantRepository {
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
}