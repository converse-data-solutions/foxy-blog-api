import { BookmarkRepository } from "./bookmark.repository";

export class BookmarkService  {
  static async toggle(userId: string, postId: string) {
    const existing = await BookmarkRepository.findByUserAndPost(
      userId,
      postId
    );

    if (existing) {
      await BookmarkRepository.deleteById(existing._id.toString());
      return { bookmarked: false };
    }

    await BookmarkRepository.create(userId, postId);
    return { bookmarked: true };
  }

  static async getMyBookmarks(userId: string) {
    return await BookmarkRepository.findByUser(userId);
  }
};
