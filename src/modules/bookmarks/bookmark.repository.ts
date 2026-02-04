import { Types } from "mongoose";
import { Bookmark } from "./bookmark.model";

export class BookmarkRepository {
  static async findByUserAndPost(userId: string, postId: string) {
    return await Bookmark.findOne({
      userId: new Types.ObjectId(userId),
      postId: new Types.ObjectId(postId),
    });
  }

  static async create(userId: string, postId: string) {
    return await Bookmark.create({
      userId: new Types.ObjectId(userId),
      postId: new Types.ObjectId(postId),
    });
  }

  static async deleteById(id: string) {
    return await Bookmark.findByIdAndDelete(id);
  }

  static async findByUser(userId: string) {
    return await Bookmark.find({ userId: new Types.ObjectId(userId) })
      .populate("postId", "title slug createdAt")
      .sort({ createdAt: -1 });
  }
};
