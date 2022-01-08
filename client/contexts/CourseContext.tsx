import React, { useContext, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { CourseQuery, CourseQueryDocument } from './__generated__/course-query';

export type Course = CourseQuery['courses'][number];

export type CourseContextType = {
  courses: Course[];
  loading: boolean;
  selected: Course | null;
  setSelected: React.Dispatch<React.SetStateAction<Course | null>>;
};

const COURSES_QUERY = gql`
  query CourseQuery {
    courses {
      id
      name
      data {
        id
        name
        par
        hdc
      }
    }
  }
` as CourseQueryDocument;

const initContext: CourseContextType = {
  courses: [],
  loading: true,
  selected: null,
  setSelected: () => null,
};

const CourseContext = React.createContext<CourseContextType>(initContext);
export const useCourseContext = () => useContext(CourseContext);

export const CourseContextProvider: React.FC = ({ children }) => {
  const { data, loading } = useQuery(COURSES_QUERY);
  const [selected, setSelected] = useState<Course | null>(null);

  useEffect(() => {
    if (!loading && data && data.courses && data.courses.length)
      setSelected(data.courses[0]);
  }, [loading]);

  return (
    <CourseContext.Provider
      value={{
        courses: data?.courses ?? [],
        loading,
        selected,
        setSelected,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
