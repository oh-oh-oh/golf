import React from 'react';
import { useAuthContext, useCourseContext } from '@/contexts';
import { styled } from '@/utils/styled';
import { Title } from '@/utils/styledComponents';
import { Colors } from '@/utils/types';
import Row from './components/Row';
import ScoreRow from './components/ScoreRow';
import BlankRow from './components/BlankRow';

interface Props {
  first?: number;
  name: string;
  color: Colors;
  par: number[];
  hdc: number[];
  idx: number;
}

const Nine: React.FC<Props> = ({ first, name, color, par, hdc, idx }: Props) => {
  const { auth } = useAuthContext();
  return (
    <Wrapper first={Boolean(first)}>
      <Title type="h3" color="black:200" bg={color} fontWeight="bolder">
        {name}
      </Title>
      <Row name="HOLE" data={[]} />
      <Row name="PAR" data={par} />
      <Row name="HDC" data={hdc} />
      <BlankRow />
      <BlankRow />
      <BlankRow />
      <BlankRow />
      {/* <ScoreRow name={auth?.shortName ?? 'SCR'} idx={idx} data={score[idx]} updateScore={updateScore} /> */}
    </Wrapper>
  );
};
export default Nine;

const Wrapper = styled.div<{ first?: boolean }>`
  flex: 1;
  margin-left: ${({ first }) => (first ? '0' : '1rem')};
`;
