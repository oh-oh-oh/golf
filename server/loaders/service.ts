import Container from 'typedi';
import CourseService from '../modules/course/services/CourseService';
import ScoreService from '../modules/score/services/ScoreService';
import UserService from '../modules/user/services/UserService';
import { Repositories } from './repository';

interface ServiceLoaderInjectable {
  Container: typeof Container;
  repositories: Repositories;
}
const serviceLoader = ({
  Container,
  repositories: { CourseRepository, ScoreRepository, UserRepository },
}: ServiceLoaderInjectable) => {
  const create = <T, R extends unknown[]>(
    Class: new (...args: R) => T,
    args: R,
  ) => {
    const instance = new Class(...args);
    Container.set(Class, instance);
    return instance;
  };

  const CourseServiceInstance = create(CourseService, [CourseRepository]);
  const ScoreServiceInstance = create(ScoreService, [ScoreRepository]);
  const UserServiceInstance = create(UserService, [UserRepository]);
  return {
    CourseService: CourseServiceInstance,
    ScoreService: ScoreServiceInstance,
    UserService: UserServiceInstance,
  };
};

export default serviceLoader;

export type Services = ReturnType<typeof serviceLoader>;
