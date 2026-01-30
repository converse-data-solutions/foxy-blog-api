import { Router } from "express";
import { requireAuth } from "../../common/middlewares/auth.middleware";
import { CommentController } from "./comment.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Post comments and replies
 */

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Add a comment or reply to a post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - body
 *             properties:
 *               body:
 *                 type: string
 *                 example: This is a great post!
 *               parentCommentId:
 *                 type: string
 *                 nullable: true
 *                 example: 64fa9b123abc
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/posts/:postId/comments",
  requireAuth,
  CommentController.addComment
);

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   get:
 *     summary: Get all comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get(
  "/posts/:postId/comments",
  CommentController.getPostComments
);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: Delete own comment
 *     tags: [Comments]
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
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Not comment owner)
 */
router.delete(
  "/comments/:commentId",
  requireAuth,
  CommentController.deleteOwnComment
);

export default router;
