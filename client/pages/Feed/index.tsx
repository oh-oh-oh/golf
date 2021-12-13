import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

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
  console.log('data?', data);
  return <Wrapper>FEED?</Wrapper>;
};

const Wrapper = styled.div``;
export default Feed;
