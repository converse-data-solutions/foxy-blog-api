import fs from "fs";
import path from "path";
import { Category } from "../../modules/category/category.model";
import { Tag } from "../../modules/tag/tag.model";


export async function seedCategories() {
  const filePath = path.resolve(
    process.cwd(),
    "src/database/seeders/category-seed.json"
  );

  const rawData = fs.readFileSync(filePath, "utf8");
  const categories = JSON.parse(rawData);

  for (const cat of categories) {
    const exists = await Category.findOne({ slug: cat.slug });

    if (!exists) {
      await Category.create({
        name: cat.name,
        slug: cat.slug,
        description: cat.description
      });

      console.log(`📁 Category created: ${cat.name}`);
    } else {
      console.log(`⚠️ Category exists: ${cat.name}`);
    }
  }

  console.log("✅ Category seeding completed");
}

export async function seedTags() {
  const filePath = path.resolve(
    process.cwd(),
    "src/database/seeders/tag-seed.json"
  );

  const rawData = fs.readFileSync(filePath, "utf8");
  const tags = JSON.parse(rawData);

  for (const tag of tags) {
    const exists = await Tag.findOne({ slug: tag.slug });

    if (!exists) {
      await Tag.create({
        name: tag.name,
        slug: tag.slug
      });

      console.log(`🏷️ Tag created: ${tag.name}`);
    } else {
      console.log(`⚠️ Tag exists: ${tag.name}`);
    }
  }

  console.log("✅ Tag seeding completed");
}
