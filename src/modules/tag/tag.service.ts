import { TagRepository } from "./tag.repository";

export const TagService = {
  create(data: any) {
    return TagRepository.create(data);
  },

  findAll() {
    return TagRepository.findAll()
  },

  update(id: string, data: any) {
    return TagRepository.updateById(id, data);
  },

  delete(id: string) {
    return TagRepository.deleteById(id);
  }
};
