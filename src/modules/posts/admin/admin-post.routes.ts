import { Router } from "express";
import { AdminPostController } from "./admin-post.controller";
import { requireAuth } from "../../../common/middlewares/auth.middleware";
import { allowRoles } from "../../../common/middlewares/role.middleware";

const router = Router();

router.use(requireAuth, allowRoles("admin"));

/**
 * @swagger
 * tags:
 *   name: Admin Posts
 *   description: Admin blog post moderation APIs
 */

/**
 * @swagger
 * /api/admin/posts:
 *   get:
 *     summary: Get all posts (admin)
 *     tags: [Admin Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, published]
 *         description: Filter posts by status
 *       - in: query
 *         name: deleted
 *         schema:
 *           type: boolean
 *         description: Include deleted posts
 *     responses:
 *       200:
 *         description: List of posts
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", AdminPostController.getAll);

/**
 * @swagger
 * /api/admin/posts/{id}:
 *   get:
 *     summary: Get post by ID (admin)
 *     tags: [Admin Posts]
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
 *         description: Post details
 *       404:
 *         description: Post not found
 */

router.get("/:id", AdminPostController.getById);

/**
 * @swagger
 * /api/admin/posts/{id}/unpublish:
 *   patch:
 *     summary: Unpublish a post
 *     tags: [Admin Posts]
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
 *         description: Post unpublished successfully
 *       404:
 *         description: Post not found
 */
router.patch("/:id/unpublish", AdminPostController.unpublish);


/**
 * @swagger
 * /api/admin/posts/{id}:
 *   delete:
 *     summary: Soft delete a post
 *     tags: [Admin Posts]
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
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router.delete("/:id", AdminPostController.softDelete);

/**
 * @swagger
 * /api/admin/posts/{id}/restore:
 *   patch:
 *     summary: Restore a soft-deleted post
 *     tags: [Admin Posts]
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
 *         description: Post restored successfully
 *       404:
 *         description: Post not found
 */
router.patch("/:id/restore", AdminPostController.restore);

export default router;
