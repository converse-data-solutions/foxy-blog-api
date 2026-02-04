import { Request, Response } from "express";
import { PostService } from "./post.service";
import { AuthRequest } from "../../types/auth-request";
import { PostStatus } from "./post-status.enum";
import { HttpError } from "../../common/utils/httpError";

export const PostController = {
  async create(req: Request, res: Response) {
    const authReq = req as AuthRequest;

    if (!authReq.user) {
      throw new HttpError("Unauthorized", 401);
    }

    const post = await PostService.create({
      ...req.body,
      authorId: authReq.user._id,
    });

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Post created",
      data: post,
    });
  },

  async getAll(req: Request, res: Response) {
    const { categoryId, tagId, title, page, limit } = req.query;

    const posts = await PostService.getAll({
      categoryId: categoryId as string,
      tagId: tagId as string,
      title: title as string,
      page: Number(page),
      limit: Number(limit),
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Posts fetched successfully",
      data: posts,
    });
  },

  async getMyPosts(req: Request, res: Response) {
    const authReq = req as AuthRequest;

    if (!authReq.user) {
      throw new HttpError("Unauthorized", 401);
    }

    const status =
      req.query.status === PostStatus.DRAFT
        ? PostStatus.DRAFT
        : PostStatus.PUBLISHED;

    const posts = await PostService.getMyPosts(authReq.user._id, [status]);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Posts fetched successfully",
      data: posts,
    });
  },

  async getOne(req: Request, res: Response) {
    const post = await PostService.getBySlug(req.params.slug as string);

    if (!post) {
      throw new HttpError("Post not found", 404);
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Post fetched successfully",
      data: post,
    });
  },

  async update(req: Request, res: Response) {
    const authReq = req as AuthRequest;

    if (!authReq.user) {
      throw new HttpError("Unauthorized", 401);
    }

    const post = await PostService.update(
      req.params.id as string,
      authReq.user._id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Post updated",
      data: post,
    });
  },

  async delete(req: Request, res: Response) {
    const authReq = req as AuthRequest;

    if (!authReq.user) {
      throw new HttpError("Unauthorized", 401);
    }

    await PostService.remove(req.params.id as string, authReq.user);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Post deleted",
    });
  },
};
