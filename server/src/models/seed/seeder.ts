import { prisma } from "../../config/config";
import bcrypt from "bcrypt";

export async function seed() {
  async function main() {
    // Seeder for Admin
    const hashedPassword = await bcrypt.hash("admin", 10); // Hash password
    await prisma.admin.upsert({
      where: { email: "admin@gmail.com" },
      update: {}, // Do nothing if admin already exists
      create: {
        email: "admin@gmail.com",
        password: hashedPassword,
      },
    });

    console.log("Admin seeded!");

    // Seeder for Products
    const products = [
      { name: "Product 1", stock: 10 },
      { name: "Product 2", stock: 20 },
      { name: "Product 3", stock: 15 },
      { name: "Product 4", stock: 5 },
      { name: "Product 5", stock: 8 },
    ];

    for (const product of products) {
      await prisma.product.upsert({
        where: { name: product.name },
        update: {}, // Do nothing if product already exists
        create: product,
      });
    }

    console.log("Products seeded!");
  }

  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

seed();
