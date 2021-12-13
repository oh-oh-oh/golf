import { Logger } from 'pino';
import { Container } from 'typedi';
import expressLoader from './fastify';
import schemaLoader from './schema';
import serviceLoader from './service';

type MainLoaderOption = {
  logger: Logger;
};

export default async ({ logger }: MainLoaderOption) => {
  try {
    // REDIS

    // GRAPHQL PUBSUB??

    // PRISMA

    // REPOSITORIES

    // PUBSUB ??

    // SERVICES
    const services = serviceLoader({Container});
    logger.info('🚀 Services Loaded.')
    
    // GRAPHQL SCHEMA
    const graphQLSchema = await schemaLoader();
    logger.info('🚀 Schema Loaded..')
    // EXPRESS
    const app = await expressLoader({
      logger,
      graphQLSchema,
      services,
      getUserById: async userId => {
        // @TODO
        return { name: 'tim' };
      },
    });
    logger.info('🚀 Fastify App Loaded...');
    return app;
  } catch (err) {
    logger.error(err, 'Main Loader Failed');
    process.exit(1);
  }
};
