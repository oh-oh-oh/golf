import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Form, FormItemProps, Input, Layout, message } from 'antd';
import { styled } from '@/utils/styled';
import { useLocation } from 'react-router';
import { LoginDocument } from './__generated__';

type LoginFormType = {
  username: string;
  password: string;
};

type LoginErrorsType = {
  username?: string;
  password?: string;
  general?: string;
};

const initForm: LoginFormType = {
  username: '',
  password: '',
};

const LOGIN_QUERY = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
    }
  }
` as LoginDocument;

const Login: React.FC = () => {
  const { state } = useLocation();

  const [errors, setErrors] = useState<LoginErrorsType>({});
  const [login, { loading, data }] = useMutation(LOGIN_QUERY, {
    onCompleted() {
      message.success('success');
      window.location.assign(state?.path ?? '/');
    },
    onError({ graphQLErrors }) {
      const errs: LoginErrorsType = {};
      graphQLErrors.forEach(({ extensions }) => {
        if (extensions && extensions.validation) {
          const { field, message } = extensions.validation;
          errs[field as keyof LoginErrorsType] = message;
        }
      });
      console.log(errs);
      setErrors(errs);
    },
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors(prev => ({
      ...prev,
      general: undefined,
      [e.target.name]: e.target.value,
    }));
  };

  const onFinish = ({ username, password }: LoginFormType) => {
    login({ variables: { username, password } });
  };

  const commonProps = (key: keyof LoginFormType): FormItemProps => ({
    name: key,
    help: errors[key],
    validateStatus: errors[key] ? 'error' : undefined,
  });
  return (
    <Wrapper>
      <StyledForm
        name="login"
        onFinish={values => onFinish(values as LoginFormType)}
      >
        <Form.Item
          {...commonProps('username')}
          rules={[{ required: true, message: 'Please input Username.' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          {...commonProps('password')}
          rules={[{ required: true, message: 'Please input Password.' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </StyledForm>
    </Wrapper>
  );
};
export default Login;

const Wrapper = styled(Layout)`
  align-items: center;
`;

const StyledForm = styled(Form)`
  margin-top: 2rem;
  width: min(800px. 100%);
  background-color: ${({ theme }) => theme.color['white:0']};
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 2rem 4rem;
`;
