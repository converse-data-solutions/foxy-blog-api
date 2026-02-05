import { Post } from "../post.model";

export class AdminPostRepository {
  static async findAll(query: any) {
    let filter: Record<string, any> = {};
    if (query.status) filter.status = query.status;
    if (query.deleted === "true") filter.isDeleted = true;
    if (query.deleted === "false") filter.isDeleted = false;

    return Post.find(filter)
      .populate("authorId", "name email")
      .populate("categoryId", "name slug")
      .sort({ createdAt: -1 });
  }

  static async findById(id: string) {
    return Post.findById(id)
      .populate("authorId", "name email")
      .populate("categoryId", "name slug")
      .populate("tagIds", "name slug");
  }

  static async updateStatus(id: string, status: "published" | "draft") {
    return Post.findByIdAndUpdate(id, { status }, { new: true });
  }

  static async softDelete(id: string) {
    return Post.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true },
    );
  }

  static async restore(id: string) {
    return Post.findByIdAndUpdate(
      id,
      { isDeleted: false, deletedAt: null },
      { new: true },
    );
  }
}
