import { Post } from "./post.model";
import slugify from "slugify";
import { HttpError } from "../../common/utils/httpError";

export const PostService = {
  async create(data: any) {
    const slug = slugify(data.title, { lower: true });

    if (await Post.findOne({ slug })) {
      throw new HttpError("Post already exists", 409);
    }

    return Post.create({
      ...data,
      slug,
      publishedAt:
        data.status === "published" ? new Date() : null,
    });
  },

  async getAll(user?: any) {
    if (!user) {
      return Post.find({ status: "published" });
    }

    return Post.find({
      $or: [
        { status: "published" },
        { authorId: user.userId },
      ],
    });
  },

  async getById(id: string, user?: any) {
    const post = await Post.findById(id);
    if (!post) throw new HttpError("Post not found", 404);

    if (
      post.status !== "published" &&
      post.authorId.toString() !== user?.userId
    ) {
      throw new HttpError("Forbidden", 403);
    }

    return post;
  },

  async update(id: string, user: any, data: any) {
    const post = await Post.findById(id);
    if (!post) throw new HttpError("Post not found", 404);

    if (post.authorId.toString() !== user.userId) {
      throw new HttpError("Not owner of post", 403);
    }

    Object.assign(post, data);

    if (data.status === "published") {
      post.publishedAt = new Date();
    }

    return post.save();
  },

  async remove(id: string, user: any) {
    const post = await Post.findById(id);
    if (!post) throw new HttpError("Post not found", 404);

    if (
      post.authorId.toString() !== user.userId &&
      user.role !== "admin"
    ) {
      throw new HttpError("Forbidden", 403);
    }

    await post.deleteOne();
    return;
  },
};
