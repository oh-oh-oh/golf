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
    const { id: courseId } = await prisma.course.create({
      data: {
        name: 'manderly on the green',
      },
    });
    const north = await prisma.courseNine.create({
      data: {
        name: 'north',
        courseId,
        par: {
          create: {
            one: 5,
            two: 4,
            three: 4,
            four: 3,
            five: 5,
            six: 4,
            seven: 3,
            eight: 4,
            nine: 4,
          },
        },
        hdc: {
          create: {
            one: 3,
            two: 2,
            three: 5,
            four: 8,
            five: 1,
            six: 4,
            seven: 9,
            eight: 7,
            nine: 6,
          },
        },
      },
    });
    const south = await prisma.courseNine.create({
      data: {
        name: 'south',
        courseId,
        par: {
          create: {
            one: 4,
            two: 4,
            three: 3,
            four: 4,
            five: 4,
            six: 3,
            seven: 5,
            eight: 3,
            nine: 5,
          },
        },
        hdc: {
          create: {
            one: 6,
            two: 2,
            three: 7,
            four: 3,
            five: 1,
            six: 5,
            seven: 4,
            eight: 9,
            nine: 8,
          },
        },
      },
    });
    const central = await prisma.courseNine.create({
      data: {
        name: 'central',
        courseId,
        par: {
          create: {
            one: 5,
            two: 3,
            three: 5,
            four: 3,
            five: 4,
            six: 3,
            seven: 5,
            eight: 4,
            nine: 4,
          },
        },
        hdc: {
          create: {
            one: 2,
            two: 7,
            three: 8,
            four: 9,
            five: 3,
            six: 6,
            seven: 4,
            eight: 5,
            nine: 1,
          },
        },
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
