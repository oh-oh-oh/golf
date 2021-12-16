import { gql, useQuery } from '@apollo/client';
import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router';

export type AuthContextType = {
  auth: {
    id: number;
    username: string;
  } | null;
  logout(): void;
};

const AuthContext = React.createContext<
  AuthContextType | Record<string, never>
>({});

const gql2 = gql;

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
  const logout = () => {
    navigate('/logout');
  };

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
