import { Theme } from '@emotion/react';

declare module '@emotion/react' {
  interface Theme {
    borderRadius: string;
    boxShadow: string;
    color: {
      primary: string;
      green: string;

      red: string;
      blue: string;
      yellow: string;
      orange: string;

      black: string;
      'black:200': string;
      'white:0': string;
      white: string;
    };
  }
}

export const theme: Theme = {
  borderRadius: '4px',
  boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
  color: {
    primary: '#7EAB1E',
    green: '#A9DC3C',

    red: '#F06E6E',
    blue: '#6EBBF0',
    yellow: '#FAF86C',
    orange: '#F0BD6E',

    black: '#333333',
    'black:200': '#2F2F2F',
    'white:0': '#FFFFFF',
    white: '#F2F2F2',
  },
};
