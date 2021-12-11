import 'dotenv/config';
import 'reflect-metadata';
import { env, logger } from './config';
import mainLoader from './loaders';

const main = async () => {
  const app = await mainLoader({ logger });
  app.listen(env.PORT, () => logger.info('🚀 Golf loaded! 🚀 🚀 🚀'));
};

main();
