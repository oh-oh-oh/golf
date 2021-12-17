import Container from 'typedi';
import CourseService from '../modules/course/services/CourseService';
import UserService from '../modules/user/services/UserService';
import { Repositories } from './repository';

interface ServiceLoaderInjectable {
  Container: typeof Container;
  repositories: Repositories;
}
const serviceLoader = ({
  Container,
  repositories: { CourseRepository, UserRepository },
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
  const UserServiceInstance = create(UserService, [UserRepository]);
  return {
    CourseService: CourseServiceInstance,
    UserService: UserServiceInstance,
  };
};

export default serviceLoader;

export type Services = ReturnType<typeof serviceLoader>;
