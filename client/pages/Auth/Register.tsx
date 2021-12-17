import React, { ChangeEvent, useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import { Button, Form, FormItemProps, Input, message } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { RegisterDocument } from './__generated__';
import { Title } from '@/utils/styledComponents';

import {
  Wrapper,
  StyledForm,
  StyledButton,
  StyledBottomRow,
} from './utils/styled';
import { buttonLink } from './utils/buttonLink';

type RegisterFormType = {
  username: string;
  password: string;
};

type RegisterErrorsType = {
  username?: string;
  password?: string;
  general?: string;
};

const initForm: RegisterFormType = {
  username: '',
  password: '',
};

const REGISTER_QUERY = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password)
  }
` as RegisterDocument;

const Register: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<RegisterErrorsType>({});
  const [register, { loading }] = useMutation(REGISTER_QUERY, {
    onCompleted() {
      message.success('success');
      window.location.assign(state?.path ?? '/');
    },
    onError({ graphQLErrors }) {
      const errs: RegisterErrorsType = {};
      graphQLErrors.forEach(({ extensions }) => {
        if (extensions && extensions.validation) {
          const { field, message } = extensions.validation;
          errs[field as keyof RegisterErrorsType] = message;
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

  const onFinish = ({ username, password }: RegisterFormType) => {
    register({ variables: { username, password } });
  };

  const commonProps = (key: keyof RegisterFormType): FormItemProps => ({
    name: key,
    help: errors[key],
    validateStatus: errors[key] ? 'error' : undefined,
  });
  return (
    <Wrapper>
      <StyledForm
        name="register"
        onFinish={values => onFinish(values as RegisterFormType)}
      >
        <Title>Register</Title>
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
            Register
          </StyledButton>
        </Form.Item>
        <StyledBottomRow>
          <Button {...buttonLink('/login', navigate)}>Login</Button>
        </StyledBottomRow>
      </StyledForm>
    </Wrapper>
  );
};
export default Register;
