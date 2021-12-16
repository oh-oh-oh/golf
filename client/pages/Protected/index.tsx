import React from 'react';
import { styled } from '@/utils/styled';

interface Props {}

const Protected: React.FC<Props> = ({}: Props) => {
  return <Wrapper>Protected</Wrapper>;
};
export default Protected;

const Wrapper = styled.div``;
