import { Schema, model, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  slug: string;
  createdAt: Date;
}

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export const Tag = model<ITag>("Tag", TagSchema);
