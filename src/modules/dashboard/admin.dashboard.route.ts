import { Router } from "express";
import { AdminDashboardController } from "./admin.dashboard.controller";
import { requireAuth } from "../../common/middlewares/auth.middleware";
import { allowRoles } from "../../common/middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     description: Returns overall platform statistics, recent blogs, recent users, and recent comments. Accessible only by admin users.
 *     tags:
 *       - Admin Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Admin dashboard data fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     stats:
 *                       type: object
 *                       properties:
 *                         totalUsers:
 *                           type: number
 *                           example: 120
 *                         totalBlogs:
 *                           type: number
 *                           example: 340
 *                         publishedBlogs:
 *                           type: number
 *                           example: 280
 *                         draftBlogs:
 *                           type: number
 *                           example: 60
 *                         totalViews:
 *                           type: number
 *                           example: 45210
 *                         totalReactions:
 *                           type: number
 *                           example: 980
 *                         totalComments:
 *                           type: number
 *                           example: 410
 *                     recentBlogs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           title:
 *                             type: string
 *                             example: Node Tips
 *                           status:
 *                             type: string
 *                             example: published
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           author:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                                 example: Karthi
 *                     recentUsers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                             example: John
 *                           email:
 *                             type: string
 *                             example: john@mail.com
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                     recentComments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           content:
 *                             type: string
 *                             example: Great article!
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           user:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           post:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                                 example: JWT Guide
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access only
 */

router.get(
  "/",
  requireAuth,
  allowRoles("admin"),
  AdminDashboardController.getDashboard
);

export default router;
