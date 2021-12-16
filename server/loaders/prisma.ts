import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const prismaLoader = () => {
  return prisma;
};

export default prismaLoader;
