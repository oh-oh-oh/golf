import { Theme } from '@emotion/react';

export type ValidationErrorType = {
  field: string;
  message: string;
};

export enum ScorecardColors {
  yellow,
  red,
  blue,
  green,
  white,
}

export type Colors = keyof Theme['color'];

export type IScore = {
  one: any;
  two: any;
  three: any;
  four: any;
  five: any;
  six: any;
  seven: any;
  eight: any;
  nine: any;
};
