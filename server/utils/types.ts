import { Session } from 'express-session';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Redis } from 'ioredis';
import { DataLoader } from '../loaders/dataLoaders';

export type MyContext = {
  req: FastifyRequest & { session: Session };
  res: FastifyReply;
  redis: Redis;
  dataLoaders: DataLoader
};

export type RawNine = {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  six: number;
  seven: number;
  eight: number;
  nine: number;
};
