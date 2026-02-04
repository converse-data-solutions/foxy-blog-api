import { CreateCategoryDTO, UpdateCategoryDTO } from "./category.dto";
import { CategoryRepository } from "./category.repository";

export class CategoryService {
  static async create(data: CreateCategoryDTO) {
    return await CategoryRepository.create(data);
  }

  static async findAll() {
    return await CategoryRepository.findAll();
  }

  static async findById(id: string) {
    return await CategoryRepository.findById(id);
  }

  static async update(id: string, data: UpdateCategoryDTO) {
    return await CategoryRepository.updateById(id, data);
  }

  static async delete(id: string) {
    return await CategoryRepository.deleteById(id);
  }
};
