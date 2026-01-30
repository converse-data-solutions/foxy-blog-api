import { Types } from "mongoose";
import { Notification } from "./notification.model";

export const NotificationService = {
  create(data: {
    userId: string;
    type: "comment" | "reaction" | "follow" | "system";
    payload: Record<string, any>;
  }) {
    return Notification.create({
      userId: new Types.ObjectId(data.userId),
      type: data.type,
      payload: data.payload,
    });
  },

  getMyNotifications(userId: string) {
    return Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);
  },

  markAsRead(notificationId: string, userId: string) {
    return Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true },
      { new: true }
    );
  },

  markAllAsRead(userId: string) {
    return Notification.updateMany(
      { userId, isRead: false },
      { isRead: true }
    );
  },

  getUnreadCount(userId: string) {
    return Notification.countDocuments({ userId, isRead: false });
  },
};
