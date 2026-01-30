import { Router } from "express";
import { requireAuth } from "../../common/middlewares/auth.middleware";
import { UserController } from "./user.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Authenticated user profile
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current logged-in user and profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details with profile
 *       401:
 *         description: Unauthorized
 */
router.get("/me", requireAuth, UserController.getMe);

/**
 * @swagger
 * /api/users/me/profile:
 *   put:
 *     summary: Update logged-in user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 example: Backend developer passionate about Node.js
 *               avatarUrl:
 *                 type: string
 *                 example: https://cdn.example.com/avatar.png
 *               coverUrl:
 *                 type: string
 *                 example: https://cdn.example.com/cover.png
 *               website:
 *                 type: string
 *                 example: https://myportfolio.dev
 *               socials:
 *                 type: object
 *                 example:
 *                   twitter: https://twitter.com/username
 *                   github: https://github.com/username
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put("/me/profile", requireAuth, UserController.updateProfile);

export default router;
