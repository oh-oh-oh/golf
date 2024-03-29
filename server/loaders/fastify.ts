import fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyCors from 'fastify-cors';
import fastifyExpress from 'fastify-express';
import fastifyFavicon from 'fastify-favicon';
import fastifyStatic from 'fastify-static';
import fs from 'fs';
import { GraphQLSchema } from 'graphql';
import { Redis } from 'ioredis';
import { sign, verify } from 'jsonwebtoken';
import mercurius from 'mercurius';
import { join, resolve } from 'path';
import { Logger } from 'pino';
import { ViteDevServer } from 'vite';
import { env } from '../config';
import ErrorHandler from './plugins/errorHandler';
import authentication from './plugins/authentication';
import { ApiError, ValidationError } from '../errors';
import { Services } from './service';
import { AuthUser } from './plugins/myAuth';
import loadDataLoaders from './dataLoaders';

const locate = (...paths: string[]) => resolve(__dirname, ...paths);
const isDev = env.NODE_ENV === 'development';

interface FastifyLoaderOption {
  logger: Logger;
  graphQLSchema: GraphQLSchema;
  services: Services;
  redisClient: Redis;
  getUserById: (userId: number) => Promise<AuthUser | undefined>;
}

export default async ({
  logger,
  graphQLSchema,
  redisClient,
  services,
  getUserById,
}: FastifyLoaderOption) => {
  const app = fastify({ logger });

  app.addHook('onRoute', routeOptions => {
    routeOptions.prefixTrailingSlash = 'no-slash';
  });

  app.register(ErrorHandler);

  // @ts-ignore: types incomplete
  app.register(fastifyCookie, {
    secret: {
      sign: (value: Record<string, any>) =>
        sign(value, env.JWT_SECRET, {
          expiresIn: value.expiresIn - 60,
        }) as string,
      unsign: (value: string) =>
        verify(value, env.JWT_SECRET) as Record<string, any>,
    },
  });

  app.register(authentication, {
    logger,
    securePaths: ['*', '/graphql'],
    myAuthPluginOptions: {
      cookie: {
        name: 'golf',
        options: {
          secure: !isDev,
          httpOnly: true,
          signed: true,
          path: '/',
        },
      },
      redisClient,
      isAuthorized: async (user: AuthUser) => user.role === 'ADMIN',
    },
  });

  const dataLoaders = loadDataLoaders(services);

  app.register(mercurius, {
    schema: graphQLSchema,
    context: (req, res) => ({
      req,
      res,
      redis: redisClient,
      services,
      dataLoaders,
    }),
    subscription: {
      onConnect: async ({ payload }) => {
        verify(payload.authentication, env.JWT_SECRET);
        return { isWebsocket: true };
      },
      context: (req, res) => ({
        req,
        res,
        services,
        dataLoaders: loadDataLoaders(services),
      }),
    },
    allowBatchedQueries: true,
    graphiql: isDev ? 'graphiql' : undefined,
    errorFormatter: res => ({
      statusCode: 200,
      response: {
        ...res,
        errors: res?.errors?.map(err => ({
          ...err,
          extensions: {
            ...err.extensions,
            code: (err.originalError as ApiError)?.statusCode || 500,
            context: (err.originalError as ApiError)?.context,
            validation: (err.originalError as ValidationError)?.validation,
          },
        })),
      },
    }),
  });

  app.register(fastifyFavicon, { path: './client', name: 'facivon.ico' });

  const rootPath = isDev ? locate('../..') : '../..';
  const allowedOrigin: (string | RegExp)[] = [
    new RegExp(env.ALLOWED_CORS_ORIGIN),
  ];

  app.register(fastifyCors, {
    origin: allowedOrigin,
    credentials: true,
  });

  let vite: ViteDevServer | undefined;
  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: 'ssr' },
    });
    await app.register(fastifyExpress);
    app.use(vite.middlewares);
  } else {
    app.register(fastifyStatic, {
      root: join(__dirname, `${rootPath}/client/assets`),
      prefix: '/assets/',
    });
  }

  app.get<{
    Params: Record<string, string>;
  }>('*', async (req, res) => {
    const indexPath = locate(rootPath, 'client/index.html');

    const { ssr }: { ssr: SSR } = vite
      ? await vite.ssrLoadModule(locate(rootPath, 'client/ssr.tsx'))
      : await import(locate(rootPath, 'client-server/index.js'));

    let indexTemplate = fs.readFileSync(indexPath, 'utf-8');
    if (vite) {
      indexTemplate = await vite.transformIndexHtml(req.url, indexTemplate);
    }

    const {
      headers: { host, cookie },
      params,
      routerPath,
      query,
      protocol,
      // tokens,
    } = req;

    // const wsJwt = sign({ token: tokens!.accessToken }, env.JWT_SECRET, {
    const wsJwt = sign({ token: '123' }, env.JWT_SECRET, {
      expiresIn: '7d',
    });

    const route = `${params[routerPath]}`;
    const baseUrl = `${protocol}//${host}`;
    const graphqlUrl = `${baseUrl}/graphql`;

    const result = await ssr({
      graphqlUrl,
      cookie: cookie!,
      route,
      query: query as Record<string, string>,
      template: indexTemplate,
      userContext: req.user ?? null,
      wsJwt,
    });
    res.code(200).type('text/html').send(result);
  });

  return app;
};
