import { Router } from "express";
import { ShareController } from "./share.controller";
import { optionalAuth } from "../../common/middlewares/optional-auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Shares
 *   description: Track post shares across platforms
 */

/**
 * @swagger
 * /api/shares/posts/{postId}:
 *   post:
 *     summary: Share a post (user or guest)
 *     tags: [Shares]
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
 *               - platform
 *             properties:
 *               platform:
 *                 type: string
 *                 enum: [twitter, linkedin, whatsapp, facebook, copy_link]
 *                 example: twitter
 *     responses:
 *       201:
 *         description: Post shared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post shared successfully
 *                 totalShares:
 *                   type: number
 *                   example: 42
 */
router.post(
  "/posts/:postId",
  optionalAuth,
  ShareController.sharePost
);

/**
 * @swagger
 * /api/shares/posts/{postId}:
 *   get:
 *     summary: Get share statistics for a post
 *     tags: [Shares]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Share counts grouped by platform
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: twitter
 *                   count:
 *                     type: number
 *                     example: 12
 */
router.get(
  "/posts/:postId",
  ShareController.getPostShareStats
);

export default router;
