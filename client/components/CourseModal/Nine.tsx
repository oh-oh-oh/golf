import React from 'react';
import { styled } from '@/utils/styled';
import Row from './components/Row';
import { Title } from '@/utils/styledComponents';

interface Props {
  first?: boolean;
  name: string;
  par: number[];
  hdc: number[];
}

const Nine: React.FC<Props> = ({ first, name, par, hdc }: Props) => {
  return (
    <Wrapper first={first}>
      <Title type="h4" color="white">
        {name}
      </Title>
      <Row name="PAR" data={par} />
      <Row name="HDC" data={hdc} />
    </Wrapper>
  );
};
export default Nine;

const Wrapper = styled.div<{first?: boolean}>`
  flex: 1;
  margin-left: ${({first}) => first ? '0' : '1rem'};
`;
