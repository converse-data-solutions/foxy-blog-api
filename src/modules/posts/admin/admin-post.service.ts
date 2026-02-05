import { HttpError } from "../../../common/utils/httpError";
import { AdminPostRepository } from "./admin-post.repository";

export class AdminPostService {
  static async getAll(query: any) {
    return AdminPostRepository.findAll(query);
  }

  static async getById(postId: string) {
    const post = await AdminPostRepository.findById(postId);
    if (!post) throw new HttpError("Post not found", 404);
    return post;
  }

  static async unpublish(postId: string) {
    const updated = await AdminPostRepository.updateStatus(postId, "draft");
    if (!updated) throw new HttpError("Post not found", 404);
  }

  static async softDelete(postId: string) {
    const deleted = await AdminPostRepository.softDelete(postId);
    if (!deleted) throw new HttpError("Post not found", 404);
  }

  static async restore(postId: string) {
    const restored = await AdminPostRepository.restore(postId);
    if (!restored) throw new HttpError("Post not found", 404);
  }
}
