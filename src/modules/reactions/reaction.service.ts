import { ToggleReactionDTO } from "./reaction.dto";
import { ReactionRepository } from "./reaction.repository";

export class ReactionService {
  static async toggleReaction(data:ToggleReactionDTO ) {
    const existing = await ReactionRepository.findUserReaction({
      targetType: data.targetType,
      targetId: data.targetId,
      userId: data.userId,
    });

    if (existing && existing.reaction === data.reaction) {
      await ReactionRepository.deleteReaction(existing._id);
      return { removed: true };
    }

    if (existing) {
      await ReactionRepository.updateReaction(
        existing._id,
        data.reaction
      );
      return { updated: true };
    }

    const reaction = await ReactionRepository.createReaction(data);
    return reaction;
  }

  static async getCounts(targetType: "post" | "comment", targetId: string) {
    return ReactionRepository.getReactionCounts(targetType, targetId);
  }
};
