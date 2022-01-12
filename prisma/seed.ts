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
        par: [5, 4, 4, 3, 5, 4, 3, 4, 4],
        hdc: [3, 2, 5, 8, 1, 4, 9, 7, 6],
      },
    });
    const { id: centralId } = await prisma.courseNine.create({
      data: {
        name: 'central',
        courseId,
        par: [5, 3, 5, 3, 4, 3, 5, 4, 4],
        hdc: [2, 7, 8, 9, 3, 6, 4, 5, 1],
      },
    });

    const south = await prisma.courseNine.create({
      data: {
        name: 'south',
        courseId,
        par: [4, 4, 3, 4, 4, 3, 5, 3, 5],
        hdc: [6, 2, 7, 3, 1, 5, 4, 9, 8],
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
        data: [6, 5, 5, 4, 5, 5, 4, 5, 4],
      },
    });
    await prisma.score.create({
      data: {
        courseNineId: centralId,
        wholeScoreId: scoreId,
        data: [6, 4, 5, 3, 6, 4, 6, 5, 6],
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
