// 1
import { PrismaClient } from "@prisma/client";

// 2
const prisma = new PrismaClient();

// 3
async function main() {
  const allItems = await prisma.item.findMany();
  console.log(allItems);
}

// 4
main()
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
