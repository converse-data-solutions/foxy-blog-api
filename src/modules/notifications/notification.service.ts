import { NotificationRepository } from "./notification.repository";

export const NotificationService = {
  create(data: {
    userId: string;
    type: "comment" | "reply";
    payload: Record<string, any>;
  }) {
    return NotificationRepository.create(data);
  },

  getMyNotifications(userId: string) {
    return NotificationRepository.findByUserId(userId);
  },

  async markAsRead(notificationId: string, userId: string) {
    const notification =
      await NotificationRepository.findByIdAndUser(
        notificationId,
        userId
      );

    if (!notification) {
      throw new Error("Notification not found");
    }

    return NotificationRepository.markAsRead(notificationId, userId);
  },

  markAllAsRead(userId: string) {
    return NotificationRepository.markAllAsRead(userId);
  },

  getUnreadCount(userId: string) {
    return NotificationRepository.countUnread(userId);
  },
};
