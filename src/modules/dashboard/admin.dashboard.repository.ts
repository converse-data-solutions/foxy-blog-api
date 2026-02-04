import { Comment } from "../comments/comment.model";
import { Post } from "../posts/post.model";
import { Reaction } from "../reactions/reaction.model";
import { User } from "../users/user.model";

export class AdminDashboardRepository {
  static async getStats() {
    const [
      totalUsers,
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalReactions,
      totalComments,
      viewsAgg,
    ] = await Promise.all([
      User.countDocuments(),
      Post.countDocuments(),
      Post.countDocuments({ status: "published" }),
      Post.countDocuments({ status: "draft" }),
      Reaction.countDocuments(),
      Comment.countDocuments(),
      Post.aggregate([
        {
          $group: {
            _id: null,
            totalViews: { $sum: "$views" },
          },
        },
      ]),
    ]);

    return {
      totalUsers,
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalViews: viewsAgg[0]?.totalViews || 0,
      totalReactions,
      totalComments,
    };
  }

  static async getRecentBlogs() {
    return Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("authorId", "name") 
      .select("title status createdAt authorId");
  }

  static async getRecentUsers() {
    return User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email createdAt");
  }

  static async getRecentComments() {
    return Comment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("authorId", "name") 
      .populate("postId", "title")  
      .select("body createdAt authorId postId");
  }
}
