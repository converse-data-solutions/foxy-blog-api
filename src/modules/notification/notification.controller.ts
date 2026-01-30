import { Request, Response } from "express";
import { NotificationService } from "./notification.service";
import { AuthRequest } from "../../types/auth-request";

export const NotificationController = {
  async getMyNotifications(req: Request, res: Response) {
     const authReq = req as AuthRequest;
    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const notifications = await NotificationService.getMyNotifications(
      authReq.user!._id
    );
    res.json(notifications);
  },

  async markAsRead(req: Request, res: Response) {
     const authReq = req as AuthRequest;
    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const notification = await NotificationService.markAsRead(
      req.params.id as string,
      authReq.user!._id
    );
    res.json(notification);
  },

  async markAllAsRead(req: Request, res: Response) {
     const authReq = req as AuthRequest;
    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await NotificationService.markAllAsRead(authReq.user!._id);
    res.json({ message: "All notifications marked as read" });
  },

  async getUnreadCount(req: Request, res: Response) {
     const authReq = req as AuthRequest;
    if (!authReq.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const count = await NotificationService.getUnreadCount(authReq.user!._id);
    res.json({ unread: count });
  },
};
