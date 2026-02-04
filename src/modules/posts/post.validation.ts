import { z } from "zod";
import { Types } from "mongoose";

/**
 * Mongo ObjectId validator
 */
export const objectId = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
    contentHtml: z.string(),
    contentBlocks: z.array(z.any()).optional(),
    categoryId: objectId.optional().nullable(),
    tagIds: z.array(objectId).optional().default([]),
    status: z.enum(["draft", "published"]).default("draft"),
    seoKeywords: z.array(z.string()).optional(),
    coverImageUrl: z.string().url().optional().nullable(),
    galleryImageUrls: z.array(z.string().url()).optional(),
    publishedAt: z.coerce.date().optional(),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    excerpt: z.string().min(10).optional(),
    contentHtml: z.string().optional(),
    contentBlocks: z.array(z.any()).optional(),
    categoryId: objectId.optional().nullable(),
    tagIds: z.array(objectId).optional().default([]),
    status: z.enum(["draft", "published"]).optional(),
    seoKeywords: z.array(z.string()).optional(),
    publishedAt: z.coerce.date().optional(),
  }),
});


/**
 * PARAM ID VALIDATION (reuse everywhere)
 */
export const postIdParamSchema = z.object({
  params: z.object({
    id: objectId,
  }),
});

export const postSlugParamSchema = z.object({
  params: z.object({
    slug: z.string().min(3, "Slug must be at least 3 characters"),
  }),
});
