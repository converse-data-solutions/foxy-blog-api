import mongoose from "mongoose";
import { seedAdmin, seedCategories, seedTags } from "./seedCoreData";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI  ;

async function run() {
  try {
    await mongoose.connect(MONGO_URI!);
    console.log("📦 MongoDB connected");

    await seedAdmin();
    await seedCategories();
    await seedTags();

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exit(1);
  }
}

run();
