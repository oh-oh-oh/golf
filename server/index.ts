import 'dotenv/config';
import 'reflect-metadata';
import { env, logger } from './config';
import mainLoader from './loaders';

const main = async () => {
  const app = await mainLoader({ logger });
  app.listen(env.PORT, '0.0.0.0');
  logger.info('🚀 Golf loaded! 🚀 🚀 🚀')
};

main();
