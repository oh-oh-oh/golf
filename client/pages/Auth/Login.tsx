import React, { ChangeEvent, useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import { ButtonProps } from 'antd/lib/button'
import { Button, Form, FormItemProps, Input, message } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { LoginDocument } from './__generated__';
import { Title } from '@/utils/styledComponents';
import {
  Wrapper,
  StyledForm,
  StyledButton,
  StyledBottomRow,
} from './utils/styled';
import { buttonLink } from './utils/buttonLink';

type LoginFormType = {
  username: string;
  password: string;
};

type LoginErrorsType = {
  username?: string;
  password?: string;
  general?: string;
};

const LOGIN_QUERY = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
` as LoginDocument;

const Login: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate()

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
        <Title>Login</Title>
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
          <StyledButton
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Log in
          </StyledButton>
        </Form.Item>
        <StyledBottomRow>
          {/* <Button {...buttonLink('/register', navigate)}>Forgot Password?</Button> @TODO */}
          <Button {...buttonLink('/register', navigate)}>Register</Button>
        </StyledBottomRow>
      </StyledForm>
    </Wrapper>
  );
};
export default Login;
