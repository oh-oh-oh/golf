import React from 'react';
import { styled } from '@/utils/styled';
import { Button } from 'antd';
import { useAuthContext } from '@/contexts';

interface Props {}

const LogoutBtn: React.FC<Props> = ({}: Props) => {
  const { logout } = useAuthContext();

  return (
    <Wrapper>
      <Button type="link" onClick={logout}>
        Logout
      </Button>
    </Wrapper>
  );
};
export default LogoutBtn;

const Wrapper = styled.div`
  position: fixed;
  right: 1rem;
  top: 0.6rem;
`;
