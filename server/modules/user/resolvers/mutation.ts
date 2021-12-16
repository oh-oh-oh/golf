import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { User } from '../models';
import UserService from '../services/UserService';

@Resolver(of => User)
class UserMutationResolver {
  @Inject() userService!: UserService;

  @Mutation(returns => User, { nullable: true })
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
  ) {
    return this.userService.login(username, password);
  }
}

export default UserMutationResolver;
