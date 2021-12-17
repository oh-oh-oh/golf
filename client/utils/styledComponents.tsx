import { Theme } from '@emotion/react';
import React from 'react';
import { styled } from './styled';

interface TitleProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  textAlign?: 'center' | 'left' | 'right';
  color?: keyof Theme['color'];
}

const Test: React.FC<TitleProps> = ({ type, children, ...props }) => {
  switch (type) {
    case 'h2':
      return <h2 {...props}>{children}</h2>;
    case 'h3':
      return <h3 {...props}>{children}</h3>;
    case 'h4':
      return <h4 {...props}>{children}</h4>;
    case 'h5':
      return <h5 {...props}>{children}</h5>;
    case 'h6':
      return <h6 {...props}>{children}</h6>;
    default:
      return <h1 {...props}>{children}</h1>;
  }
};

export const Title = styled(Test)<TitleProps>`
  text-align: ${({ textAlign }) => textAlign || 'center'};
  color: ${({ theme, color }) => theme.color[color || 'black']};
  text-transform: capitalize;
`;
