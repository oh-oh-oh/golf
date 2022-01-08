import { Container } from 'typedi';
import { PrismaClient } from '.prisma/client';
import { CourseRepository } from '../modules/course/repositories';
import { ScoreRepository } from '../modules/score/repositories';
import { UserRepository } from '../modules/user/repositories';

type RepositoryLoaderArg = {
  Container: typeof Container;
  prisma: PrismaClient;
};

const repositoryLoader = ({ prisma }: RepositoryLoaderArg) => {
  /** Instantiate a class and register it to the `type-di` container */
  const create = <T, R extends unknown[]>(
    Class: new (...args: R) => T,
    args: R,
  ) => {
    const instance = new Class(...args);
    Container.set(Class, instance);
    return instance;
  };
  return {
    CourseRepository: create(CourseRepository, [prisma.course]),
    ScoreRepository: create(ScoreRepository, [prisma.wholeScore]),
    UserRepository: create(UserRepository, [prisma.user]),
  };
};

export default repositoryLoader;

export type Repositories = ReturnType<typeof repositoryLoader>;
