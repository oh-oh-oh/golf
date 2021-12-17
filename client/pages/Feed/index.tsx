import { styled } from '@/utils/styled';
import { useAuthContext } from '@/contexts';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

const Feed: React.FC = () => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Title>FEED</Title>
      <Button onClick={() => navigate('/course')}>Courses</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.color.green};
`;
export default Feed;
