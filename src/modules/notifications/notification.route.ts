import { Router } from "express";
import { requireAuth } from "../../common/middlewares/auth.middleware";
import { NotificationController } from "./notification.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: User notifications (comments, reactions, system alerts)
 */

/**
 * @swagger
 * /api/notifications/me:
 *   get:
 *     summary: Get my notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   type:
 *                     type: string
 *                     enum: [comment, reaction, follow, system]
 *                   payload:
 *                     type: object
 *                   isRead:
 *                     type: boolean
 *                     example: false
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/notifications/me",
  requireAuth,
  NotificationController.getMyNotifications
);

/**
 * @swagger
 * /api/notifications/unread-count:
 *   get:
 *     summary: Get unread notification count
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread notification count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 unread:
 *                   type: number
 *                   example: 3
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/notifications/unread-count",
  requireAuth,
  NotificationController.getUnreadCount
);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/notifications/:id/read",
  requireAuth,
  NotificationController.markAsRead
);

/**
 * @swagger
 * /api/notifications/read-all:
 *   put:
 *     summary: Mark all notifications as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/notifications/read-all",
  requireAuth,
  NotificationController.markAllAsRead
);

export default router;
