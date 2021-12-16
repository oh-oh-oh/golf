import React from 'react';
import { styled } from '@/utils/styled';
import { Button } from 'antd';
import { useAuthContext } from '@/contexts';
import { useLocation, useNavigate } from 'react-router';

interface Props {}

const LogoutBtn: React.FC<Props> = ({}: Props) => {
  const { auth, logout } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (auth) {
      logout();
      return;
    } else {
      navigate('/login', { state: { path: pathname } });
    }
  };
  return (
    <Wrapper>
      <Button type="link" onClick={handleClick}>
        {auth ? 'Logout' : 'Login'}
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
