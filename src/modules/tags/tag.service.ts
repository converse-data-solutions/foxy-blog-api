import { CreateTagDTO } from "./tag.dto";
import { TagRepository } from "./tag.repository";

export class TagService {
  static async create(data: CreateTagDTO) {
    return await TagRepository.create(data);
  }

  static async findAll() {
    return await TagRepository.findAll();
  }

  static async update(id: string, data: Partial<CreateTagDTO>) {
    return await TagRepository.updateById(id, data);
  }

  static async delete(id: string) {
    return await TagRepository.deleteById(id);
  }
};
