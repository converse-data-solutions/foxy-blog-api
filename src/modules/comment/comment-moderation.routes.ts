import { Router } from "express";
import { requireAuth } from "../../common/middlewares/auth.middleware";
import { allowRoles } from "../../common/middlewares/role.middleware";
import { CommentModerationController } from "./comment-moderation.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comment Moderation
 *   description: Admin comment moderation actions
 */

/**
 * @swagger
 * /api/comments/{commentId}/hide:
 *   put:
 *     summary: Hide a comment (Admin only)
 *     tags: [Comment Moderation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment hidden successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.put(
  "/comments/:commentId/hide",
  requireAuth,
  allowRoles("admin"),
  CommentModerationController.hideComment
);

/**
 * @swagger
 * /api/comments/{commentId}/show:
 *   put:
 *     summary: Show a hidden comment (Admin only)
 *     tags: [Comment Moderation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment made visible
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.put(
  "/comments/:commentId/show",
  requireAuth,
  allowRoles("admin"),
  CommentModerationController.showComment
);

export default router;
