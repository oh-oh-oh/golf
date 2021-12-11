interface Array<T> {
  filter(
    filter: BooleanConstructor
  ): Exclude<T, null | undefined | 0 | '' | false>[];
}

type Int = number;
type Float = number;
