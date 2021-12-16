import { useAuthContext } from '../contexts/AuthContext';
import React from 'react';
import { Navigate, useNavigate } from 'react-router';
import { Role } from '@prisma/client';
import { Button, Layout, Typography } from 'antd';
import { styled } from '@/utils/styled';

interface RouteProps {
  admin?: boolean;
  path: string;
}

const ProtectedRoute: React.FC<RouteProps> = ({ admin, path, children }) => {
  const { auth } = useAuthContext();
  if (!auth) return <Navigate to="/login" state={{ path }} />;
  if (admin && auth.role !== Role.ADMIN) {
    const navigate = useNavigate();
    return (
      <Layout>
        <Title type="danger">ACCESS DENIED</Title>
        <StyledButton onClick={() => navigate('/')}>
          Click to go Home
        </StyledButton>
      </Layout>
    );
  }
  return <>{children}</>;
};
export default ProtectedRoute;

const Title = styled(Typography.Title)`
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
`;
