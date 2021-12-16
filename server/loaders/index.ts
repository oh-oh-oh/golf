import { Logger } from 'pino';
import { Container } from 'typedi';
import expressLoader from './fastify';
import prismaLoader from './prisma';
import redisLoader from './redis';
import repositoryLoader from './repository';
import schemaLoader from './schema';
import serviceLoader from './service';

type MainLoaderOption = {
  logger: Logger;
};

export default async ({ logger }: MainLoaderOption) => {
  try {
    // REDIS
    const redisClient = redisLoader();
    logger.info('🚀 Redis Client Loaded.');

    // GRAPHQL PUBSUB??

    // PRISMA
    const prisma = await prismaLoader();
    logger.info('🚀 Prisma Client Loaded..');

    // REPOSITORIES
    const repositories = repositoryLoader({ Container, prisma });
    logger.info('🚀 Repositories Loaded....');

    // PUBSUB ??

    // SERVICES
    const services = serviceLoader({ Container, repositories });
    logger.info('🚀 Services Loaded....');

    // GRAPHQL SCHEMA
    const graphQLSchema = await schemaLoader();
    logger.info('🚀 Schema Loaded.....');
    // EXPRESS
    const app = await expressLoader({
      logger,
      graphQLSchema,
      redisClient,
      services,
      getUserById: async userId => {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            username: true,
            role: true,
          },
        });
        if (!user) return undefined;
        return user;
      },
    });
    logger.info('🚀 Fastify App Loaded......');
    return app;
  } catch (err) {
    logger.error(err, 'Main Loader Failed');
    process.exit(1);
  }
};
