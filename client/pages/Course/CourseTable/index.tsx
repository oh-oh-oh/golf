import React from 'react';
import { styled } from '@/utils/styled';
import { Table } from 'antd';
import { Course, useCourseContext } from '@/contexts';
import { getPar } from '@/utils/getPar';
import { ColumnsType } from 'antd/lib/table';

interface Props {}

const columns: ColumnsType<Course> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: string) => <Proper>{name}</Proper>
  },
  {
    title: 'Par',
    dataIndex: 'data',
    key: 'id',
    render: (d: any[]) => getPar(d),
  },
  {
    title: 'Holes',
    dataIndex: 'data',
    key: 'id',
    render: (d: any[]) => 9 * d.length,
  },
];

const CourseTable: React.FC<Props> = ({}: Props) => {
  const { courses, loading, setSelected } = useCourseContext();
  
  return <Table dataSource={courses} columns={columns} loading={loading} rowKey='id' onRow={(record, i) => ({
    onClick: () => setSelected(record)
  })}/>;
};
export default CourseTable;

const Wrapper = styled.div``;

const Proper = styled.p`
  text-transform: capitalize;
`;
