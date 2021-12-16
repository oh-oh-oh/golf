import { Session } from 'express-session';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Redis } from 'ioredis';

export type MyContext = {
  req: FastifyRequest & { session: Session };
  res: FastifyReply;
  redis: Redis;
};
