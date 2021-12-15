import Styled, { StyledOptions } from '@emotion/styled';

const options: StyledOptions<any> = {
  shouldForwardProp: prop => !(prop as string).startsWith('$'),
} as const;

export { css, keyframes } from '@emotion/react';

export const styled = new Proxy(Styled, {
  get(target, property) {
    if (typeof property === 'string') {
      return Styled(property as keyof JSX.IntrinsicElements, options);
    }
    return target[property as unknown as keyof typeof target];
  },
  apply(target, thisArg, args) {
    return target.call(thisArg, ...(args as [any]), options);
  },
});
