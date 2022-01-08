import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { styled } from '@/utils/styled';
import { Course } from '@/contexts';
import Nine from './Nine';
import { Colors } from '@/utils/types';

interface Props {
  data: Course['data'];
}

const CARD_COLORS: Colors[] = [
  'red',
  'blue',
]

const Carousel: React.FC<Props> = ({ data }: Props) => {
  if (data.length <= 2) return null;

  const [idx, setIdx] = useState<number>(0);
  const max = data.length - 2;

  const changeIdx = (dir: number) => {
    const newIdx = idx + dir;
    if (newIdx > max || newIdx < 0) return;
    setIdx(newIdx);
  };

  return (
    <Container>
      <Edge first={1} onClick={() => changeIdx(-1)}>
        {idx > 0 ? <StyledLeft /> : null}
      </Edge>
      <Border>
        <Wrapper amount={data.length} idx={idx}>
          {data.map((d, i) => (
            <Nine {...d} first={i === 0 ? 1 : 0} idx={i} color={CARD_COLORS[i % 2]} key={i}/>
          ))}
        </Wrapper>
      </Border>
      <Edge onClick={() => changeIdx(1)}>{idx < max && <StyledRight />}</Edge>
    </Container>
  );
};
export default Carousel;
const Container = styled.div`
  display: flex;
  width: 100%;
`;
const Border = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Wrapper = styled.div<{ amount: number; idx: number }>`
  display: flex;
  width: ${({ amount }) => amount * 50}%;
  transform: translate(-${({ amount, idx }) => idx * (100 / amount)}%);
  transition: transform 300ms ease;
`;

const Edge = styled.div<{ first?: number }>`
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    & span {
      font-size: 1.6rem;
    }
  }
`;

const StyledLeft = styled(LeftOutlined)`
  margin-right: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: bolder;
  transition: all 300ms ease;
  & svg {
    color: white;
  }
`;

const StyledRight = styled(RightOutlined)`
  margin-left: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: bolder;
  transition: all 300ms ease;
  & svg {
    color: white;
  }
`;
