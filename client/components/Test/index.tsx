import React from 'react';
import { styled } from '@/utils/styled';

interface Props {}

const Test: React.FC<Props> = ({}: Props) => {
  return <Wrapper>TEST</Wrapper>;
  // return <div>TEST</div>;
};
export default Test;

const Wrapper = styled.div`
  margin: 2rem;
`;
