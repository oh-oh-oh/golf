import React from 'react';
import { styled } from '@/utils/styled';
import { Title } from '@/utils/styledComponents';
import Nine from './Nine';
import { Course } from '@/contexts';

interface Props {
  name: string;
  data: Course['data']
}

const CourseModal: React.FC<Props> = ({ name, data }: Props) => {
  return (
    <Wrapper>
      <Container>
        <Title type="h2" color="white">
          {name}
        </Title>
        <DataWrapper>
          {data.map((data, i) => (
            <Nine {...data} first={i === 0}/>
          ))}
        </DataWrapper>
      </Container>
    </Wrapper>
  );
};
export default CourseModal;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background: ${({ theme }) => theme.color['black:200']};
  width: min(1000px, 100%);
  padding: 1rem;
`;

const DataWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-gap: 1rem;
`;
