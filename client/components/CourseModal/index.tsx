import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { styled } from '@/utils/styled';
import { Title } from '@/utils/styledComponents';
import CourseCarousel from './Carousel';
import { Course } from '@/contexts';
import { Modal } from 'antd';
import { theme } from '@/utils/theme';
interface Props {
  name: string;
  data: Course['data'];
  closeFn: () => void;
}

const CourseModal: React.FC<Props> = ({ name, data, closeFn }: Props) => {
  return (
    <Modal
      visible
      onCancel={closeFn}
      footer={null}
      width={1000}
      bodyStyle={{ backgroundColor: theme.color['black:200'] }}
      closeIcon={<StyledClose />}
    >
      <Title type="h2" color="white">
        {name}
      </Title>
      <CourseCarousel data={data} />
    </Modal>
  );
};
export default CourseModal;

const StyledClose = styled(CloseOutlined)`
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  color: white;
  font-size: 1.2rem;
  font-weight: bolder;
  cursor: pointer; 
  transition: all 150ms ease; 

  &:hover {
    font-size: 1.4rem;
    top: 0.4rem
    right: 0.4rem
  }
`;
