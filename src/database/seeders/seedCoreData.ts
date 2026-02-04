import fs from "fs";
import path from "path";
import { Category } from "../../modules/categories/category.model";
import { Tag } from "../../modules/tags/tag.model";
import { User } from "../../modules/users/user.model";
import bcrypt from "bcryptjs";

export async function seedCategories() {
  const filePath = path.resolve(
    process.cwd(),
    "src/database/seeders/category-seed.json",
  );

  const rawData = fs.readFileSync(filePath, "utf8");
  const categories = JSON.parse(rawData);

  for (const cat of categories) {
    const exists = await Category.findOne({ slug: cat.slug });

    if (!exists) {
      await Category.create({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      });
    } else {
      console.log(`⚠️ Category exists: ${cat.name}`);
    }
  }

  console.log("✅ Category seeding completed");
}

export async function seedTags() {
  const filePath = path.resolve(
    process.cwd(),
    "src/database/seeders/tag-seed.json",
  );

  const rawData = fs.readFileSync(filePath, "utf8");
  const tags = JSON.parse(rawData);

  for (const tag of tags) {
    const exists = await Tag.findOne({ slug: tag.slug });

    if (!exists) {
      await Tag.create({
        name: tag.name,
        slug: tag.slug,
      });
    } else {
      console.log(`⚠️ Tag exists: ${tag.name}`);
    }
  }

  console.log("✅ Tag seeding completed");
}

export async function seedAdmin() {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

  const existingAdmin = await User.findOne({ role: "admin" });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await User.create({
      name: "Super Admin",
      email: ADMIN_EMAIL,
      passwordHash: hashedPassword,
      role: "admin",
      isVerified: true,
    });
  } else {
    console.log("✅ Admin already exists");
  }
  console.log("🚀 Admin user created successfully");
}
