import { Types } from "mongoose";
import { Reaction, IReaction } from "./reaction.model";

export class ReactionRepository {
  static async findUserReaction(params: {
    targetType: "post" | "comment";
    targetId: string;
    userId: string;
  }) {
    return await Reaction.findOne({
      targetType: params.targetType,
      targetId: new Types.ObjectId(params.targetId),
      userId: new Types.ObjectId(params.userId),
    });
  }

  static async createReaction(params: {
    targetType: "post" | "comment";
    targetId: string;
    userId: string;
    reaction: IReaction["reaction"];
  }) {
    return Reaction.create({
      targetType: params.targetType,
      targetId: new Types.ObjectId(params.targetId),
      userId: new Types.ObjectId(params.userId),
      reaction: params.reaction,
    });
  }

  static async deleteReaction(reactionId: Types.ObjectId) {
    return await Reaction.deleteOne({ _id: reactionId });
  }

  static async updateReaction(
    reactionId: Types.ObjectId,
    reaction: IReaction["reaction"]
  ) {
    return Reaction.updateOne(
      { _id: reactionId },
      { $set: { reaction } }
    );
  }

  static async getReactionCounts(targetType: "post" | "comment", targetId: string) {
    return await Reaction.aggregate([
      {
        $match: {
          targetType,
          targetId: new Types.ObjectId(targetId),
        },
      },
      {
        $group: {
          _id: "$reaction",
          count: { $sum: 1 },
        },
      },
    ]);
  }
};
