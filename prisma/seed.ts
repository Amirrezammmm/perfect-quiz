import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";



const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in .env");
}

const adapter = new PrismaBetterSqlite3({
  url: databaseUrl,
});


const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.examAnswer.deleteMany();
  await prisma.examResult.deleteMany();
  await prisma.exam.deleteMany();

  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.importBatch.deleteMany();

  const importBatch = await prisma.importBatch.create({
    data: {
      filename: "manual-seed",
      originalName: "Seed اولیه دستی",
      mimeType: "manual",
      status: "COMPLETED",
      totalQuestions: 1,
      importedCount: 1,
      failedCount: 0,
      notes: "داده آزمایشی برای تست اتصال دیتابیس",
    },
  });

  await prisma.question.create({
    data: {
      title: "کدام مورد از اصول دین است؟",
      normalizedText: "کدام مورد از اصول دین است؟",
      explanation: "توحید یکی از اصول دین است.",
      category: "IDEOLOGICAL",
      status: "PUBLISHED",
      sourcePage: 1,
      sourceNumber: 1,
      importBatchId: importBatch.id,
      options: {
        create: [
          {
            text: "نماز",
            order: 1,
            isCorrect: false,
          },
          {
            text: "توحید",
            order: 2,
            isCorrect: true,
          },
          {
            text: "روزه",
            order: 3,
            isCorrect: false,
          },
          {
            text: "خمس",
            order: 4,
            isCorrect: false,
          },
        ],
      },
    },
  });

  console.log("Seed completed successfully 🌱");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
