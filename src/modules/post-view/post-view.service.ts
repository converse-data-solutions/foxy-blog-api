import { RecordPostViewDTO } from "./post-view.dto";
import { PostViewRepository } from "./post-view.repository";

export class PostViewService {
  static async recordView(data: RecordPostViewDTO) {
    return PostViewRepository.createView(data);
  }

  static async getPostViewCount(postId: string) {
    return PostViewRepository.countByPostId(postId);
  }
};
