import Redis from 'ioredis';
import { env } from '../config';

const redisLoader = () => {
  const redisOptions = {
    port: parseInt(env.REDIS.PORT),
    host: env.REDIS.HOST,
    password: env.REDIS.PASSWORD,
    retryStrategy(times: number) {
      if (times > 100) {
        return undefined;
      }
      return Math.min(times * 100, 3000);
    },
  };
  const client = new Redis(redisOptions);
  return client;
};

export default redisLoader;
