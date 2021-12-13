import Container from 'typedi';
import UserService from '../modules/user/services/UserService';

interface ServiceLoaderInjectable {
  Container: typeof Container;
  // repositories: Repositories;
  // prisma: PrismaClient;
}
const serviceLoader = ({
  Container,
}: // repositories
// prisma
ServiceLoaderInjectable) => {
  const create = <T, R extends unknown[]>(
    Class: new (...args: R) => T,
    args: R,
  ) => {
    const instance = new Class(...args);
    Container.set(Class, instance);
    return instance;
  };

  const UserServiceInstance = create(UserService, []);
  return {
    UserService: UserServiceInstance,
  };
};

export default serviceLoader;

export type Services = ReturnType<typeof serviceLoader>;
