import React from 'react';
import { styled } from '@/utils/styled';
import { useCourseContext } from '@/contexts';
import CourseTable from './CourseTable';
import CourseModal from '@/components/CourseModal';

const CourseList: React.FC = () => {
  const { selected, setSelected } = useCourseContext();
  return (
    <Wrapper>
      <CourseTable />
      {selected && <CourseModal name={selected.name} data={selected.data} closeFn={() => setSelected(null)} />}
    </Wrapper>
  );
};
export default CourseList;

const Wrapper = styled.div``;
