import { gql, useMutation, useQuery } from '@apollo/client';
import { Role } from '@prisma/client';
import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router';

export type AuthContextType = {
  auth: {
    id: number;
    username: string;
    role: Role;
  } | null;
  logout(): void;
};

const AuthContext = React.createContext<
  AuthContextType | Record<string, never>
>({});

const gql2 = gql;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC = ({ children }) => {
  const { data } = useQuery<{ user: AuthContextType['auth'] }>(
    gql2`
      query GetUser {
        user
      }
    `,
    {
      fetchPolicy: 'cache-only',
    },
  );

  const navigate = useNavigate();
  const [logout] = useMutation(LOGOUT, {
    onCompleted() {
      navigate('/login');
    },
    onError(err) {
      console.error(err);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        auth: data?.user || null,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
