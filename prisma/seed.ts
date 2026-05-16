import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const creator = await prisma.creator.create({
    data: {
      name: "D•sonofSolomon",
      slug: "dsonofsolomon",
      bio: "Love, life, laughter and systems.",
    },
  });

  const lifeCategory = await prisma.category.create({
    data: {
      name: "Life",
      slug: "life",
      creatorId: creator.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "The Art of Seeing Clearly",
      slug: "the-art-of-seeing-clearly",
      excerpt:
        "Why repeatable systems beat emotional bursts when building anything meaningful.",
      content:
        "Most people are not reacting to reality. They are reacting to stories they have repeated to themselves for years.",
      status: "published",
      universe: "public",
      chapterLabel: "D•sonofSolomon Chapter I",
      creatorId: creator.id,
      categoryId: lifeCategory.id,
      publishedAt: new Date(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
