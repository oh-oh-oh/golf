import { gql, useQuery } from '@apollo/client';
import { Button } from 'antd';
import Test from '@/components/Test';
import { styled } from '@/utils/styled';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts';

const Feed: React.FC = () => {
  const TEST = gql`
    query TestQuery {
      user {
        id
        username
        password
      }
    }
  `;

  const { data } = useQuery(TEST);

  const navigate = useNavigate();
  const {logout} = useAuthContext();

  const test = () => {
    // navigate('/protected');
    logout()
  };

  console.log('data?', data);
  return (
    <Wrapper>
      <Title onClick={() => test()}>FEED</Title>
      <Test />
      <Button onClick={() => test()}>Test</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.color.green}
`;
export default Feed;
