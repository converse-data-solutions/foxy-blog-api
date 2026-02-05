import { Router } from "express";
import { requireAuth } from "../../../common/middlewares/auth.middleware";
import { allowRoles } from "../../../common/middlewares/role.middleware";
import { AdminUserController } from "./admin-user.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin Users
 *   description: Super admin user management
 */

router.use(requireAuth, allowRoles("admin"));

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (Super Admin only)
 *     tags: [Admin Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", AdminUserController.getAllUsers);

/**
 * @swagger
 * /api/admin/users/{id}/block:
 *   patch:
 *     summary: Block a user
 *     tags: [Admin Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: block user successfully
 */
router.patch("/:id/block", AdminUserController.blockUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Hard delete a user
 *     tags: [Admin Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delete user successfully
 */
router.delete("/:id", AdminUserController.deleteUser);

export default router;
