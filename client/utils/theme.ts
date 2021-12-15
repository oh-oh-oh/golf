import { Theme } from '@emotion/react';

declare module '@emotion/react' {
  interface Theme {
    borderRadius: string;
    color: {
      primary: string;
      green: string;

      black: string;
      'black:200': string;
      'white:0': string;
      white: string;
    };
  }
}

export const theme: Theme = {
  borderRadius: '4px',
  color: {
    primary: '#7EAB1E',
    green: '#A9DC3C',

    black: '#333333',
    'black:200': '#2F2F2F',
    'white:0': '#FFFFFF',
    white: '#F2F2F2',
  },
};
