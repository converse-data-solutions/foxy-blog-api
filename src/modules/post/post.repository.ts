import { Post } from "./post.model";

export const PostRepository = {
  create(data: any) {
    return Post.create(data);
  },

  findAll(filter: Record<string, any> = {}) {
    return Post.find()
      // .populate("authorId", "name email")
      // .populate("categoryId", "name")
      // .sort({ createdAt: -1 });
  },

  findById(id: string) {
    return Post.findById(id)
      .populate("authorId", "name email")
      .populate("categoryId", "name");
  },

  findBySlug(slug: string) {
    return Post.findOne({ slug });
  },

  updateById(id: string, data: Partial<any>) {
    return Post.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },

  deleteById(id: string) {
    return Post.findByIdAndDelete(id);
  },
};
