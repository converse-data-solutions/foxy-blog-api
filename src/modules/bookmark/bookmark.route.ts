import { Router } from "express";
import { requireAuth } from "../../common/middlewares/auth.middleware";
import { BookmarkController } from "./bookmark.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Bookmarks
 *   description: Save and manage bookmarked posts
 */

/**
 * @swagger
 * /api/posts/{postId}/bookmark:
 *   post:
 *     summary: Toggle bookmark for a post (save / unsave)
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Bookmark toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookmarked:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/posts/:postId/bookmark",
  requireAuth,
  BookmarkController.toggleBookmark
);

/**
 * @swagger
 * /api/bookmarks/me:
 *   get:
 *     summary: Get my bookmarked posts
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookmarked posts
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/bookmarks/me",
  requireAuth,
  BookmarkController.getMyBookmarks
);

export default router;
