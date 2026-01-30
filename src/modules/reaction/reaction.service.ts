import { Types } from "mongoose";
import { Reaction } from "./reaction.model";

export const ReactionService = {
  async toggleReaction(data: {
    targetType: "post" | "comment";
    targetId: string;
    userId: string;
    reaction: string;
  }) {
    const existing = await Reaction.findOne({
      targetType: data.targetType,
      targetId: data.targetId,
      userId: data.userId,
    });

    if (existing) {
      // If same reaction → remove (unreact)
      if (existing.reaction === data.reaction) {
        await existing.deleteOne();
        return { removed: true };
      }

      // Change reaction
      existing.reaction = data.reaction as any;
      await existing.save();
      return { updated: true };
    }

    // New reaction
    const reaction = await Reaction.create({
      targetType: data.targetType,
      targetId: new Types.ObjectId(data.targetId),
      userId: new Types.ObjectId(data.userId),
      reaction: data.reaction,
    });

    return reaction;
  },

  async getCounts(targetType: "post" | "comment", targetId: string) {
    return Reaction.aggregate([
      { $match: { targetType, targetId: new Types.ObjectId(targetId) } },
      {
        $group: {
          _id: "$reaction",
          count: { $sum: 1 },
        },
      },
    ]);
  },
};
