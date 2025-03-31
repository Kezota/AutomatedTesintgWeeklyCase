import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Clean up database before all tests
beforeAll(async () => {
  await prisma.admin.deleteMany();
  await prisma.product.deleteMany();
});

// Disconnect Prisma Client after all tests
afterAll(async () => {
  // Optional: Clean up the database after all tests
  await prisma.admin.deleteMany();
  await prisma.product.deleteMany();

  await prisma.$disconnect();
});
