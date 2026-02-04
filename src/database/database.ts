import mongoose from "mongoose";
import { logger } from "../config/winston.logger";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection failed", error);
    process.exit(1);
  }
};
