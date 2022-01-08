import { env } from '../../../config';
import { MyContext } from '../../../utils/types';
import { sign, verify } from 'jsonwebtoken';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { User } from '../models';
import UserService from '../services/UserService';
import { ApiError } from '../../../errors';
import { trimLower } from '../../../utils/trimLower';

@Resolver(of => User)
class UserMutationResolver {
  @Inject() userService!: UserService;

  @Mutation(returns => Boolean)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { req, res, redis }: MyContext,
  ) {
    username = trimLower(username);
    password = trimLower(password);
    const user = await this.userService.login(username, password);
    const redisKey = `gf:${user.id}:${user.username}`;
    try {
      res.setCookie('golf', sign(redisKey, env.JWT_SECRET));
      redis.set(redisKey, JSON.stringify(user));
    } catch (err) {
      req.log.error(err)
      res.clearCookie('golf');
      throw new ApiError(err.message);
    }
    return true;
  }

  @Mutation(returns => Boolean)
  async register(
    @Arg('username') username: string,
    @Arg('shortName') shortName: string,
    @Arg('password') password: string,
    @Ctx() { req, res, redis }: MyContext,
  ) {
    username = trimLower(username);
    password = trimLower(password);
    const user = await this.userService.register(username, shortName, password);
    const redisKey = `gf:${user.id}:${user.username}`;
    try {
      res.setCookie('golf', sign(redisKey, env.JWT_SECRET));
      redis.set(redisKey, JSON.stringify(user));
    } catch (err) {
      res.clearCookie('golf');
      throw new ApiError(err.message);
    }
    return true;
  }

  @Mutation(returns => Boolean)
  async logout(@Ctx() { req, res, redis }: MyContext) {
    const { golf } = req.cookies;
    try {
      const redisKey = verify(golf, env.JWT_SECRET) as string;
      res.clearCookie('golf');
      redis.del(redisKey);
    } catch (err) {
      req.log.error(err);
    }
    return true;
  }
}

export default UserMutationResolver;
