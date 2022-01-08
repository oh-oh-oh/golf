import React from 'react';
import { CourseContextProvider } from '@/contexts';
import CourseList from './CoursePage';

const CoursePage: React.FC = () => {
  return (
    <CourseContextProvider>
      <CourseList />
    </CourseContextProvider>
  );
};
export default CoursePage;
