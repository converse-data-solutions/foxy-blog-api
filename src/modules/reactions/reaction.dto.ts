import { IReaction } from "./reaction.model";

export interface ToggleReactionDTO {
    targetType: "post" | "comment";
    targetId: string;
    userId: string;
    reaction: IReaction["reaction"];
  }