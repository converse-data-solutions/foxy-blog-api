import { AdminCommantRepository } from "./comment-admin.repository";

  export class AdminCommantService{
  static async updateStatus(commentId: string, status: "visible" | "hidden" | "deleted") {
    return await AdminCommantRepository.updateStatus(commentId, status);
  }

  static async delete(commentId: string) {
    // soft delete
    return await AdminCommantRepository.updateStatus(commentId, "deleted");
  }
}