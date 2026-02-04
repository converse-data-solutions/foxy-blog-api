import { Types } from "mongoose";
import { Notification } from "./notification.model";

export class NotificationRepository {
  static async create(data: {
    userId: string;
    type: "comment" | "reply";
    payload: Record<string, any>;
  }) {
    return Notification.create({
      userId: new Types.ObjectId(data.userId),
      type: data.type,
      payload: data.payload,
    });
  }

 static async findByUserId(userId: string, limit = 50) {
    return Notification.find({
      userId: new Types.ObjectId(userId),
    })
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  static async findByIdAndUser(notificationId: string, userId: string) {
    return Notification.findOne({
      _id: new Types.ObjectId(notificationId),
      userId: new Types.ObjectId(userId),
    });
  }

  static async markAsRead(notificationId: string, userId: string) {
    return Notification.findOneAndUpdate(
      {
        _id: new Types.ObjectId(notificationId),
        userId: new Types.ObjectId(userId),
      },
      { isRead: true },
      { new: true }
    );
  }

  static async markAllAsRead(userId: string) {
    return Notification.updateMany(
      {
        userId: new Types.ObjectId(userId),
        isRead: false,
      },
      { isRead: true }
    );
  }

  static async countUnread(userId: string) {
    return Notification.countDocuments({
      userId: new Types.ObjectId(userId),
      isRead: false,
    });
  }
};
    