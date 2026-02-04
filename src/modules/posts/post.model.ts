import { Schema, model, Types } from "mongoose";

const PostSchema = new Schema(
  {
    authorId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      default: null,
    },

    tagIds: [
      {
        type: Types.ObjectId,
        ref: "Tag",
        default: [],
      },
    ],

    /* ---------- CONTENT ---------- */
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    excerpt: {
      type: String,
      required: true,
    },

    contentHtml: {
      type: String,
      required: true,
    },

    /* ---------- IMAGES (URL BASED) ---------- */
    coverImageUrl: {
      type: String,
      default: null,
    },

    galleryImageUrls: {
      type: [String],
      default: [],
    },

    /* ---------- STATUS ---------- */
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    seoKeywords: [String],

    publishedAt: Date,
  },
  { timestamps: true }
);

export const Post = model("Post", PostSchema);
