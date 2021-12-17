interface Array<T> {
  filter(
    filter: BooleanConstructor,
  ): Exclude<T, null | undefined | '' | 0 | false>[];
}

declare type SSR = import('../client/ssr').SSR;
