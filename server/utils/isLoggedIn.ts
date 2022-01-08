import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '.';
import { UnauthorizedError } from '../errors';

export const isLoggedIn: MiddlewareFn<MyContext> = ({ context }, next) => {
  console.log('context', context)
  if (!context.req.user)
    throw new UnauthorizedError('Please sign in to receive data.');
  return next();
};
