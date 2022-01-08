import { PrismaClient } from '@prisma/client';
import { Logger } from 'pino';

const prismaLoader = (logger: Logger) => {
  const prisma = new PrismaClient({ log: [{ emit: 'event', level: 'query' }] });
  prisma.$on('query', e => {
    console.log(e.query);
    console.log(e.params);
  });
  return prisma;
};

export default prismaLoader;
