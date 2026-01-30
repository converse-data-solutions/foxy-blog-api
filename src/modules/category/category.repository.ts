import { ICategory, Category } from "./category.model";

export class CategoryRepository {
  static create(data: Partial<ICategory>) {
    return Category.create(data);
  }

  static findAll() {
    return Category.find().sort({ createdAt: -1 });
  }

  static findById(id: string) {
    return Category.findById(id);
  }

  static findBySlug(slug: string) {
    return Category.findOne({ slug });
  }

  static updateById(id: string, data: Partial<ICategory>) {
    return Category.findByIdAndUpdate(id, data, { new: true });
  }

  static deleteById(id: string) {
    return Category.findByIdAndDelete(id);
  }
}
