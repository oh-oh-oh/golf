import React from 'react';
import { styled } from '@/utils/styled';

const InnerLayout: React.FC = ({ children }) => {
  return <Main className={'ohohoh-bg'}>{children}</Main>;
};

const Main = styled.main`
  padding: 1rem;
`;

export default InnerLayout;
