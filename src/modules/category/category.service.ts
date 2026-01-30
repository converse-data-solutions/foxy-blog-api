import { Category } from "./category.model";
import { CategoryRepository } from "./category.repository";

export const CategoryService = {
  create(data: any) {
    return CategoryRepository.create(data);
  },

  findAll() {
    return CategoryRepository.findAll();
  },

  findById(id: string) {
    return CategoryRepository.findById(id);
  },

  update(id: string, data: any) {
    return CategoryRepository.updateById(id, data);
  },

  delete(id: string) {
    return CategoryRepository.deleteById(id);
  }
};
