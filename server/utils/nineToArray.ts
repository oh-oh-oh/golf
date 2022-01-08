import { RawNine } from './types';

export const nineToArray = ({
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
}: any & RawNine): number[] => [
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
];
