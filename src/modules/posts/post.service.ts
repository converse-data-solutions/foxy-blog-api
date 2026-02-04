import slugify from "slugify";
import { PostRepository } from "./post.repository";
import { HttpError } from "../../common/utils/httpError";
import { CreatePostDTO, PostStatus } from "./post.dto";

export class PostService {
  static async create(data: CreatePostDTO) {
    const slug = slugify(data.title, { lower: true });

    const existingPost = await PostRepository.findBySlugWithRelated(slug);
    if (existingPost) {
      throw new HttpError("Post already exists", 409);
    }

    const post = await PostRepository.create({
      ...data,
      slug,
      publishedAt: data.status === "published" ? new Date() : null,
    });
    return post;
  }

  static async getAll(filters: {
    categoryId?: string;
    tagId?: string;
    title?: string;
    page?: number;
    limit?: number;
  }) {
    const query: Record<string, any> = {
      status: "published",
    };

    if (filters.categoryId) {
      query.categoryId = filters.categoryId;
    }

    if (filters.tagId) {
      query.tagIds = filters.tagId;
    }

    if (filters.title) {
      query.title = {
        $regex: filters.title,
        $options: "i",
      };
    }

    const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
    const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 10;

    return await PostRepository.findAll(query, {
      sort: { createdAt: -1 },
      page,
      limit,
    });
  }

  static async getMyPosts(user: string, statuses: PostStatus[]) {
    return await PostRepository.findByUser({
      authorId: user,
      statuses,
    });
  }

  static async getBySlug(slug: string) {
    const post = await PostRepository.findBySlugWithRelated(slug);
    if (!post) {
      throw new HttpError("Post not found", 404);
    }
    return post;
  }

  static async update(id: string, authorId: string, data: Partial<CreatePostDTO>) {
    const post = await PostRepository.findById(id);
    if (!post) {
      throw new HttpError("Post not found", 404);
    }

    if (post.authorId.toString() !== authorId) {
      throw new HttpError("Not owner of post", 403);
    }

    if (data.title) {
      data.slug = slugify(data.title, { lower: true });
    }

    if (data.status === "published" && !post.publishedAt) {
      data.publishedAt = new Date();
    }

    return PostRepository.updateById(id, data);
  }

  static async remove(id: string, user: any) {
    const post = await PostRepository.findById(id);
    if (!post) {
      throw new HttpError("Post not found", 404);
    }

    if (post.authorId.toString() !== user.userId && user.role !== "admin") {
      throw new HttpError("Forbidden", 403);
    }

    await PostRepository.deleteById(id);
    return;
  }
};
