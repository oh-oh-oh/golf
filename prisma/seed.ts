import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('Seeding Database...');
    await prisma.user.deleteMany();
    await prisma.user.create({
      data: {
        username: 'albatrooss',
        password: await hash('password', 6),
        role: Role.ADMIN,
      },
    });
    await prisma.user.create({
      data: {
        username: 'tim',
        password: await hash('password', 6),
        role: Role.USER,
      },
    });
  } catch (e) {
    console.error(e);
  } finally {
    console.log('Done Seeding Database...');
    prisma.$disconnect();
  }
}

seed();
