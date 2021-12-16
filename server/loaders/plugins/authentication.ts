import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { Logger } from 'pino';
import myAuth, { MyAuthPluginOptions } from './myAuth';

interface AuthenticationPluginOptions {
  logger: Logger;
  securePaths: string[];
  myAuthPluginOptions: MyAuthPluginOptions;
}

const authentication: FastifyPluginCallback<
  AuthenticationPluginOptions
> = async (fastify, options) => {
  const { logger, securePaths, myAuthPluginOptions } = options;

  fastify.decorate('user', { test: 'data' });
  fastify.decorate('tokens', null);

  fastify.register(myAuth, myAuthPluginOptions);

  fastify.addHook('preValidation', async (req, res) => {
    if (securePaths.includes(req.routerPath)) {
      logger.debug(
        { path: req.routerPath, method: req.routerMethod },
        'Adding Auth Hook',
      );
      await fastify.authenticate(req, res);
    }
  });
};

export default fp(authentication);
