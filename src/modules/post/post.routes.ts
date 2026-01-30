import { Router } from "express";
import { PostController } from "./post.controller";
import { requireAuth } from "../../common/middlewares/auth.middleware";
import { allowRoles } from "../../common/middlewares/role.middleware";
import {
  createPostSchema,
  postIdParamSchema,
  updatePostSchema,
} from "./post.validation";
import { validate } from "../../common/middlewares/validate";

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
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get("/", PostController.getAll);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get single post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post found
 *       404:
 *         description: Post not found
 */

router.get("/:id", validate(postIdParamSchema), PostController.getOne);
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
  // validate(createPostSchema),
  requireAuth,
  allowRoles("user", "admin"),
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

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post (admin only)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted
 *       403:
 *         description: Forbidden
 */
router.delete("/:id",
  validate(postIdParamSchema),
  requireAuth,
  allowRoles("user", "admin"), PostController.delete);

export default router;
