import { env } from '@/server/config';
import { Role } from '@prisma/client';
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { CookieSerializeOptions } from 'fastify-cookie';
import fp from 'fastify-plugin';
import { Redis } from 'ioredis';
import { decode, verify } from 'jsonwebtoken';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (
      req: FastifyRequest,
      res: FastifyReply,
    ) => Promise<boolean | void>;
  }
  interface FastifyRequest {
    user?: AuthUser;
  }
}

export type AuthUser = {
  id: number;
  username: string;
  role: Role;
};

export type MyAuthPluginOptions = {
  cookie: {
    name: string;
    options: CookieSerializeOptions;
  };
  redisClient: Redis;
  isAuthorized: (user: AuthUser) => Promise<boolean>;
};

const myAuthPlugin: FastifyPluginCallback<MyAuthPluginOptions> = async (
  fastify,
  options,
) => {
  const { redisClient } = options;

  fastify.decorate(
    'authenticate',
    async (req: FastifyRequest, res: FastifyReply) => {
      req.log.debug('Authenticating');
      const { golf } = req.cookies;
      if (!golf) {
        req.user = undefined;
        return;
      }
      try {
        const key = verify(golf, env.JWT_SECRET) as string;
        const cachedUser = await redisClient.get(key);
        if (cachedUser) {
          req.user = JSON.parse(cachedUser);
          return true;
        }
        req.user = undefined;
      } catch (err) {
        console.log(err);
      }
    },
  );
};

export default fp(myAuthPlugin);
