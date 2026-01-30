import { Router } from "express";
import { requireAuth } from "../../common/middlewares/auth.middleware";
import { ReactionController } from "./reaction.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reactions
 *   description: Reactions on posts and comments
 */

/**
 * @swagger
 * /api/reactions:
 *   post:
 *     summary: React to a post or comment (toggle reaction)
 *     tags: [Reactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - targetType
 *               - targetId
 *               - reaction
 *             properties:
 *               targetType:
 *                 type: string
 *                 enum: [post, comment]
 *                 example: post
 *               targetId:
 *                 type: string
 *                 example: 64fa9b123abc
 *               reaction:
 *                 type: string
 *                 enum: [like, clap, love, insightful]
 *                 example: like
 *     responses:
 *       200:
 *         description: Reaction toggled successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/reactions",
  requireAuth,
  ReactionController.react
);

/**
 * @swagger
 * /api/reactions/{targetType}/{targetId}:
 *   get:
 *     summary: Get reaction counts for a post or comment
 *     tags: [Reactions]
 *     parameters:
 *       - in: path
 *         name: targetType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [post, comment]
 *         description: Target type
 *       - in: path
 *         name: targetId
 *         required: true
 *         schema:
 *           type: string
 *         description: Target ID
 *     responses:
 *       200:
 *         description: Reaction counts grouped by type
 */
router.get(
  "/reactions/:targetType/:targetId",
  ReactionController.getReactionCounts
);

export default router;
