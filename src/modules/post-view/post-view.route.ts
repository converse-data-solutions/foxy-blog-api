import { Router } from "express";
import { PostViewController } from "./post-view.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Post Views
 *   description: Track post views (logged-in users and guests)
 */

/**
 * @swagger
 * /api/posts/{postId}/view:
 *   post:
 *     summary: Record a view for a post (user or guest)
 *     tags: [Post Views]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post view recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 views:
 *                   type: number
 *                   example: 123
 */
router.post(
  "/posts/:postId/view",
  PostViewController.viewPost
);

export default router;
