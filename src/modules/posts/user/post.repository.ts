
import { PipelineStage } from "mongoose";
import { CreatePostDTO, UpdatePostDTO } from "../post.dto";
import { Post } from "../post.model";

export class PostRepository {
  static async create(data: CreatePostDTO) {
    return await Post.create(data);
  }

  static async findAll(
    filter: Record<string, any> = {},
    options: {
      sort?: Record<string, 1 | -1>;
      page?: number;
      limit?: number;
    } = {},
  ) {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const skip = (page - 1) * limit;

    const pipeline: PipelineStage[] = [
      { $match: filter },

      /* ---------- COUNTS ---------- */
      {
        $lookup: {
          from: "reactions",
          localField: "_id",
          foreignField: "targetId",
          pipeline: [{ $match: { targetType: "post" } }],
          as: "reactions",
        },
      },
      {
        $lookup: {
          from: "bookmarks",
          localField: "_id",
          foreignField: "postId",
          as: "bookmarks",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          pipeline: [{ $match: { status: "visible" } }],
          as: "comments",
        },
      },
      {
        $addFields: {
          stats: {
            likes: { $size: "$reactions" },
            comments: { $size: "$comments" },
            shares: { $size: "$bookmarks" },
            views: { $ifNull: ["$viewCount", 0] },
          },
        },
      },

      /* ---------- AUTHOR ---------- */
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                username: 1,
                avatarUrl: 1,
              },
            },
          ],
          as: "author",
        },
      },
      { $unwind: "$author" },

      /* ---------- CATEGORY ---------- */
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          pipeline: [{ $project: { _id: 1, name: 1, slug: 1 } }],
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },

      /* ---------- TAGS ---------- */
      {
        $lookup: {
          from: "tags",
          localField: "tagIds",
          foreignField: "_id",
          pipeline: [{ $project: { _id: 1, name: 1, slug: 1 } }],
          as: "tags",
        },
      },

      /* ---------- BLOG FEED SHAPE ---------- */
      {
        $project: {
          _id: 0,

          id: { $toString: "$_id" },
          title: 1,
          slug: 1,
          excerpt: 1,

          coverImage: {
            url: "$coverImageUrl",
          },

          author: {
            name: "$author.name",
            username: {
              $ifNull: [
                "$author.username",
                {
                  $toLower: {
                    $replaceAll: {
                      input: "$author.name",
                      find: " ",
                      replacement: "",
                    },
                  },
                },
              ],
            },
            avatarUrl: "$author.avatarUrl",
          },

          category: {
            name: "$category.name",
            slug: "$category.slug",
          },

          tags: {
            $map: {
              input: "$tags",
              as: "tag",
              in: {
                id: { $toString: "$$tag._id" },
                name: "$$tag.name",
                slug: "$$tag.slug",
              },
            },
          },

          stats: 1,
          publishedAt: 1,
          createdAt: 1,
        },
      },

      { $sort: options.sort ?? { createdAt: -1 } },

      /* ---------- PAGINATION ---------- */
      {
        $facet: {
          blogs: [{ $skip: skip }, { $limit: limit }],
          meta: [{ $count: "total" }],
        },
      },
    ];

    return await Post.aggregate(pipeline).then((result) => {
      const blogs = result[0]?.blogs ?? [];
      const total = result[0]?.meta[0]?.total ?? 0;

      return {
        blogs,
        pagination: {
          page,
          limit,
          totalCount: total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1,
        },
      };
    });
  }

  static async findByUser(params: { authorId: string; statuses: string[] }) {
    return await Post.find({
      authorId: params.authorId,
      status: { $in: params.statuses },
    }).sort({ createdAt: -1 });
  }

  static async findById(id: string) {
    return await Post.findById(id);
  }

  static async findBySlugWithRelated(slug: string) {
    return await Post.aggregate([
      /* ---------- CURRENT POST ---------- */
      {
        $match: {
          slug,
          status: "published",
        },
      },

      /* ---------- AUTHOR (SINGLE POST) ---------- */
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                username: 1,
                avatarUrl: 1,
              },
            },
          ],
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },

      /* ---------- CATEGORY ---------- */
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                slug: 1,
              },
            },
          ],
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },

      /* ---------- TAGS ---------- */
      {
        $lookup: {
          from: "tags",
          localField: "tagIds",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                slug: 1,
              },
            },
          ],
          as: "tags",
        },
      },

      /* ---------- STATS ---------- */
      {
        $lookup: {
          from: "reactions",
          let: { postId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$targetId", "$$postId"] } } },
            { $count: "likes" },
          ],
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$postId", "$$postId"] } } },
            { $count: "comments" },
          ],
          as: "comments",
        },
      },
      {
        $addFields: {
          stats: {
            views: { $ifNull: ["$views", 0] },
            likes: { $ifNull: [{ $arrayElemAt: ["$likes.likes", 0] }, 0] },
            comments: {
              $ifNull: [{ $arrayElemAt: ["$comments.comments", 0] }, 0],
            },
            shares: { $ifNull: ["$shares", 0] },
          },
        },
      },

      /* ---------- RELATED POSTS ---------- */
      {
        $lookup: {
          from: "posts",
          let: {
            postId: "$_id",
            categoryId: "$categoryId",
            tagIds: { $ifNull: ["$tagIds", []] },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $ne: ["$_id", "$$postId"] },
                    { $eq: ["$status", "published"] },
                    {
                      $or: [
                        { $eq: ["$categoryId", "$$categoryId"] },
                        {
                          $gt: [
                            {
                              $size: {
                                $setIntersection: [
                                  { $ifNull: ["$tagIds", []] },
                                  "$$tagIds",
                                ],
                              },
                            },
                            0,
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
            { $sort: { createdAt: -1 } },
            { $limit: 4 },

            /* ---------- RELATED AUTHOR ---------- */
            {
              $lookup: {
                from: "users",
                localField: "authorId",
                foreignField: "_id",
                pipeline: [
                  {
                    $project: {
                      _id: 1,
                      name: 1,
                      avatarUrl: 1,
                    },
                  },
                ],
                as: "author",
              },
            },
            {
              $unwind: {
                path: "$author",
                preserveNullAndEmptyArrays: true,
              },
            },

            /* ---------- RELATED LIKES ---------- */
            {
              $lookup: {
                from: "reactions",
                let: { postId: "$_id" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$targetId", "$$postId"] } } },
                  { $count: "likes" },
                ],
                as: "likes",
              },
            },

            {
              $project: {
                title: 1,
                slug: 1,
                excerpt: 1,
                coverImageUrl: 1,
                createdAt: 1,
                author: {
                  _id: "$author._id",
                  name: "$author.name",
                  avatar: "$author.avatarUrl",
                },
                stats: {
                  views: { $ifNull: ["$views", 0] },
                  likes: {
                    $ifNull: [{ $arrayElemAt: ["$likes.likes", 0] }, 0],
                  },
                },
              },
            },
          ],
          as: "relatedPosts",
        },
      },

      /* ---------- FINAL RESPONSE ---------- */
      {
        $project: {
          title: 1,
          slug: 1,
          excerpt: 1,
          contentHtml: 1,
          coverImageUrl: 1,
          galleryImageUrls: 1,
          status: 1,

          author: {
            _id: "$author._id",
            name: "$author.name",
            username: "$author.username",
            avatar: "$author.avatarUrl",
          },

          category: {
            _id: "$category._id",
            name: "$category.name",
            slug: "$category.slug",
          },

          tags: {
            $map: {
              input: "$tags",
              as: "tag",
              in: {
                _id: "$$tag._id",
                name: "$$tag.name",
                slug: "$$tag.slug",
              },
            },
          },

          seoKeywords: 1,
          publishedAt: 1,
          createdAt: 1,
          updatedAt: 1,
          stats: 1,
          relatedPosts: 1,
        },
      },
    ]).then((res) => res[0] || null);
  }

  static async updateById(id: string, data: UpdatePostDTO) {
    return await Post.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteById(id: string) {
    return await Post.findByIdAndDelete(id);
  }
};
