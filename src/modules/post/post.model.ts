import { Schema, model, Types } from "mongoose";

const PostSchema = new Schema(
  {
    authorId: { type: Types.ObjectId, ref: "User", required: true },
    categoryId: { type: Types.ObjectId, ref: "Category", default: null },
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    excerpt: { type: String, required: true },
    contentHtml: { type: String, required: true },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    seoKeywords: [String],
    publishedAt: Date,
  },
  { timestamps: true }
);

export const Post = model("Post", PostSchema);
