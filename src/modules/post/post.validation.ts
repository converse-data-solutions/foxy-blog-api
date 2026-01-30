import { z } from "zod";
import { Types } from "mongoose";

/**
 * Helper for Mongo ObjectId
 */
const objectId = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

/**
 * CREATE POST
 */
export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  excerpt: z
    .string()
    .min(10, "Excerpt must be at least 10 characters"),

  contentHtml: z
    .string()
    .min(20, "Content HTML must be at least 20 characters"),

  categoryId: objectId.optional().nullable(),

  status: z
    .enum(["draft", "published", "archived"])
    .default("draft"),

  seoKeywords: z.array(z.string()).optional(),

  publishedAt: z.coerce.date().optional(),
});


/**
 * UPDATE POST
 */
export const updatePostSchema = z.object({
  params: z.object({
    id: objectId,
  }),
  body: z.object({
    title: z.string().min(3).optional(),
    excerpt: z.string().min(10).optional(),
    contentHtml: z.string().min(20).optional(),
    categoryId: objectId.optional().nullable(),
    status: z.enum(["draft", "published", "archived"]).optional(),
    seoKeywords: z.array(z.string()).optional(),
    publishedAt: z.coerce.date().optional(),
  }),
});

/**
 * PARAM ID VALIDATION
 */
export const postIdParamSchema = z.object({
  params: z.object({
    id: objectId,
  }),
});
