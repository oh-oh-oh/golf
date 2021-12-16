import { env } from '@/server/config';
import { MyContext } from '@/server/utils/types';
import { sign, verify } from 'jsonwebtoken';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
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
    @Ctx() { res, redis }: MyContext,
  ) {
    const user = await this.userService.login(username, password);
    const redisKey = `gf:${user.id}:${user.username}`;
    try {
      res.setCookie('golf', sign(redisKey, env.JWT_SECRET));
      redis.set(redisKey, JSON.stringify(user));
    } catch (err) {
      console.log(err);
      res.clearCookie('golf');
    }
  }

  @Mutation(returns => Boolean)
  async logout(@Ctx() { req, res, redis }: MyContext) {
    const { golf } = req.cookies;
    const redisKey = verify(golf, env.JWT_SECRET) as string;
    try {
      res.clearCookie('golf');
      redis.del(redisKey);
    } catch (err) {
      console.log(err);
    }
    return true;
  }
}

export default UserMutationResolver;
