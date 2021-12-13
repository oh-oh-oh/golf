import { Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { User } from '../models';
import UserService from '../services/UserService';

@Resolver(of => User)
class UserQueryResolver {
  @Inject() userService!: UserService;

  @Query(returns => User, { nullable: true })
  async user(): Promise<User> {
    return this.userService.find();
  }

  @Query(returns => [User])
  async users(): Promise<User[]> {
    const u1 = await this.userService.find();
    const u2 = await this.userService.find();
    return [u1, u2];
  }
}

export default UserQueryResolver;
