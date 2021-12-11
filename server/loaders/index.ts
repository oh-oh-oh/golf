import { Logger } from 'pino';
import expressLoader from './express';

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

    // GRAPHQL SCHEMA

    // EXPRESS
    const app = await expressLoader();
    logger.info('🚀 Express App Loaded')
    return app;
  } catch (err) {
    logger.error(err, 'Main Loader Failed');
    process.exit(1);
  }
}
