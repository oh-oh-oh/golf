import { FastifyPluginCallback } from 'fastify';
import { Logger } from 'pino';

interface AuthenticationPluginOptions {
  logger: Logger;
  securePaths: string[];
  // AuthPluginOptions: AuthPluginOptions
}

const authentication: FastifyPluginCallback<AuthenticationPluginOptions> = async (fastify, options) => {
  const {} = options;

  fastify.decorate('user', null);
}
