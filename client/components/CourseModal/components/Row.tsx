import React from 'react';
import { styled } from '@/utils/styled';

interface Props {
  name: string;
  data: number[];
}

const Row: React.FC<Props> = ({ name, data }: Props) => {
  return <Wrapper>
    <Title>{name}</Title>
    {data.map(d => <Data>{d}</Data>)}
  </Wrapper>;
};
export default Row;

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 3px;
`;
const Title = styled.div`
  flex: 2;
  background-color: ${({theme}) => theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  `;
const Data = styled.div`
  flex: 1;
  background-color: ${({theme}) => theme.color['white:0']};
  margin-left: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
