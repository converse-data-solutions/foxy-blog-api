import { ITag, Tag } from "./tag.model";

export class TagRepository {
  static async create(data: Partial<ITag>) {
    return await Tag.create(data);
  }

  static async findAll() {
    return await Tag.find().sort({ createdAt: -1 });
  }

  static async findById(id: string) {
    return await Tag.findById(id);
  }

  static async findBySlug(slug: string) {
    return await Tag.findOne({ slug });
  }

  static async updateById(id: string, data: Partial<ITag>) {
    return await Tag.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteById(id: string) {
    return await Tag.findByIdAndDelete(id);
  }
}
