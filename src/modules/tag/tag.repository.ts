import { ITag, Tag } from "./tag.model";

export class TagRepository {
  static create(data: Partial<ITag>) {
    return Tag.create(data);
  }

  static findAll() {
    return Tag.find().sort({ createdAt: -1 });
  }

  static findById(id: string) {
    return Tag.findById(id);
  }

  static findBySlug(slug: string) {
    return Tag.findOne({ slug });
  }

  static updateById(id: string, data: Partial<ITag>) {
    return Tag.findByIdAndUpdate(id, data, { new: true });
  }

  static deleteById(id: string) {
    return Tag.findByIdAndDelete(id);
  }
}
