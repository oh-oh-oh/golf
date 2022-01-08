import { PrismaClient } from '@prisma/client';
import { Logger } from 'pino';
import { env } from '../config';

const prismaLoader = (logger: Logger) => {
  if (env.NODE_ENV === 'development') {
    const prismaDev = new PrismaClient({ log: [{ emit: 'event', level: 'query' }] });
    prismaDev.$on('query', e => {
      logger.debug(e.query);
      logger.debug(e.params);
    });
    return prismaDev;
  }
  const prisma = new PrismaClient();
  return prisma;
};

export default prismaLoader;
