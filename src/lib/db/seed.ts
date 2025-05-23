import { categories } from '@/lib/db/data';
import prisma from '@/lib/db/prisma';

async function main() {
  try {
    await prisma.category.deleteMany();
    await prisma.category.createMany({ data: categories });
    console.log('DB seeded successfully');
  } catch (error) {
    console.log(error);
  }
}

main();
