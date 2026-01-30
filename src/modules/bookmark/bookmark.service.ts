import { Types } from "mongoose";
import { Bookmark } from "./bookmark.model";

export const BookmarkService = {
  async toggle(userId: string, postId: string) {
    const existing = await Bookmark.findOne({
      userId,
      postId,
    });

    if (existing) {
      await existing.deleteOne();
      return { bookmarked: false };
    }

    await Bookmark.create({
      userId: new Types.ObjectId(userId),
      postId: new Types.ObjectId(postId),
    });

    return { bookmarked: true };
  },

  getMyBookmarks(userId: string) {
    return Bookmark.find({ userId })
      .populate("postId", "title slug createdAt")
      .sort({ createdAt: -1 });
  },
};
