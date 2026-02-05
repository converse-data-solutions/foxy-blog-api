import { Router } from "express";
import { PostController } from "./post.controller";
import { requireAuth } from "../../../common/middlewares/auth.middleware";
import { allowRoles } from "../../../common/middlewares/role.middleware";
import {
  createPostSchema,
  postIdParamSchema,
  postSlugParamSchema,
  updatePostSchema,
} from "../post.validation";
import { validate } from "../../../common/middlewares/validate";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Blog post management
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all published posts (public)
 *     description: |
 *       Fetch published blog posts with optional filters and pagination.
 *
 *       Supports:
 *       - Category filter
 *       - Tag filter
 *       - Title search (case-insensitive)
 *       - Pagination using page & limit
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter posts by category ID
 *
 *       - in: query
 *         name: tagId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter posts by tag ID
 *
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Search posts by title (case-insensitive)
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         required: false
 *         description: Page number for pagination
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         required: false
 *         description: Number of posts per page
 *
 *     responses:
 *       200:
 *         description: List of published posts with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalCount:
 *                       type: integer
 *                       example: 42
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 */
router.get("/", PostController.getAll);

/**
 * @swagger
 * /api/posts/me:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get my posts
 *     description: Fetch posts created by the authenticated user. Defaults to published posts.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [published, draft]
 *           default: published
 *         required: false
 *         description: Filter posts by status
 *     responses:
 *       200:
 *         description: My posts fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: My posts fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 */
router.get("/me", requireAuth, PostController.getMyPosts);

/**
 * @swagger
 * /api/posts/{slug}:
 *   get:
 *     summary: Get single post by slug
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post found
 *       404:
 *         description: Post not found
 */

router.get("/:slug", validate(postSlugParamSchema), PostController.getOne);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCreate'
 *     responses:
 *       201:
 *         description: Post created successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  requireAuth,
  allowRoles("user", "admin"),
  validate(createPostSchema),
  PostController.create,
);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post (owner or admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostUpdate'
 *     responses:
 *       200:
 *         description: Post updated
 *       403:
 *         description: Forbidden
 */
router.put(
  "/:id",
  validate(updatePostSchema),
  requireAuth,
  allowRoles("user", "admin"),
  PostController.update,
);


export default router;
