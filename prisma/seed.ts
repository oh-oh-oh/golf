import { PrismaClient, Role, User } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('Seeding Database...');
    await prisma.user.deleteMany();
    await prisma.user.create({
      data: {
        username: 'albatrooss',
        shortName: 'albtrs',
        password: await hash('password', 6),
        role: Role.ADMIN,
      },
    });
    const { id: timId } = await prisma.user.create({
      data: {
        username: 'tim',
        shortName: 'tim',
        password: await hash('password', 6),
        role: Role.USER,
      },
    });
    await prisma.course.deleteMany();
    const { id: courseId } = await prisma.course.create({
      data: {
        name: 'manderly on the green',
      },
    });
    const { id: northId } = await prisma.courseNine.create({
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
    const { id: centralId } = await prisma.courseNine.create({
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

    const { id: scoreId } = await prisma.wholeScore.create({
      data: {
        courseId,
        userId: timId,
        date: new Date(),
      },
    });

    await prisma.score.create({
      data: {
        courseNineId: northId,
        wholeScoreId: scoreId,
        one: 6,
        two: 5,
        three: 5,
        four: 4,
        five: 5,
        six: 5,
        seven: 4,
        eight: 5,
        nine: 4,
      },
    });
    await prisma.score.create({
      data: {
        courseNineId: centralId,
        wholeScoreId: scoreId,
        one: 6,
        two: 4,
        three: 5,
        four: 3,
        five: 6,
        six: 4,
        seven: 6,
        eight: 5,
        nine: 6,
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
