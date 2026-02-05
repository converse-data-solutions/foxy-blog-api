import mongoose from "mongoose";
import { seedAdmin, seedCategories, seedTags } from "./seedCoreData";
import dotenv from "dotenv";
import { logger } from "../../config/winston.logger";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI  ;

async function run() {
  try {
    await mongoose.connect(MONGO_URI!);
    logger.info("MongoDB connected with seeder");

    await seedAdmin();
    await seedCategories();
    await seedTags();

    process.exit(0);
  } catch (error) {
    logger.error("Seeding failed", error);
    process.exit(1);
  }
}

run();
