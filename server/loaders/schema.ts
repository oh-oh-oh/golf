// import chalk from 'chalk';
import { resolve } from 'path';
import { __decorate } from 'tslib';
import { Container, Service } from 'typedi';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { env } from '../config';

import { UserMutationResolver, UserQueryResolver } from '../modules/user/resolvers';

export default async () => {
  const schema = await buildSchema({
    resolvers: getResolvers([UserQueryResolver, UserMutationResolver]),
    dateScalarMode: 'isoDate',
    emitSchemaFile: env.NODE_ENV === 'development' && {
      path: resolve(__dirname, '../schema.gql'),
    },
    container: Container,
  });
  return schema;
};

const getResolvers = (
  resolvers: NonEmptyArray<new (...args: any[]) => any>,
) => {
  const names = new Map<string, string>();
  resolvers.forEach(resolver => {
    Object.getOwnPropertyNames(resolver.prototype).forEach(name => {
      if (name === 'constructor') return;
      if (names.has(name)) {
        console.warn(
          `{yellow WARNING: } {blue ${names.get(name)}} and {blue ${
            resolver.name
          }} both have a method name {green ${name}}!!`,
        );
        return;
      }
      names.set(name, resolver.name);
    });
  });
  return resolvers.map(Class =>
    __decorate([Service()], Class),
  ) as typeof resolvers;
};
