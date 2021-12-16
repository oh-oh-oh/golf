import { styled } from '@/utils/styled';
import { useAuthContext } from '@/contexts';

const Feed: React.FC = () => {
  const { auth } = useAuthContext();

  return (
    <Wrapper>
      <Title>FEED</Title>
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
