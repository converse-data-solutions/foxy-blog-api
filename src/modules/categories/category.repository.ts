import { ICategory, Category } from "./category.model";

export class CategoryRepository {
  static async create(data: Partial<ICategory>) {
    return await Category.create(data);
  }

  static async findAll() {
    return Category.find().sort({ createdAt: -1 });
  }

  static async findById(id: string) {
    return await Category.findById(id);
  }

  static async findBySlug(slug: string) {
    return await Category.findOne({ slug });
  }

  static async updateById(id: string, data: Partial<ICategory>) {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteById(id: string) {
    return await Category.findByIdAndDelete(id);
  }
}
