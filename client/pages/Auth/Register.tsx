import React, { ChangeEvent, useState } from 'react';
import { UserOutlined, LockOutlined, ThunderboltOutlined } from '@ant-design/icons';
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
  shortName: string;
  password: string;
};

type RegisterErrorsType = {
  username?: string;
  shortName?: string;
  password?: string;
  general?: string;
};

const initForm: RegisterFormType = {
  username: '',
  shortName: '',
  password: '',
};

const REGISTER_QUERY = gql`
  mutation Register(
    $username: String!
    $shortName: String!
    $password: String!
  ) {
    register(username: $username, shortName: $shortName, password: $password)
  }
` as RegisterDocument;

const Register: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [values, setValues] = useState<RegisterErrorsType>(initForm);
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
    setValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors(prev => ({
      ...prev,
      general: undefined,
      [e.target.name]: undefined,
    }));
  };

  const onFinish = () => {
    register({ variables: values });
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
        onFinish={onFinish}
      >
        <Title>Register</Title>
        <Form.Item
          {...commonProps('username')}
          rules={[{ required: true, message: 'Please input Username.' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            name='username'
            onChange={handleChange}
            autoComplete='username'
          />
        </Form.Item>
        {(values.shortName || errors.shortName) && (
          <Form.Item {...commonProps('shortName')}>
            <Input
              prefix={<ThunderboltOutlined />}
              placeholder="Max 6 Characters"
              name='shortName'
              onChange={handleChange}
            />
          </Form.Item>
        )}
        <Form.Item
          {...commonProps('password')}
          rules={[{ required: true, message: 'Please input Password.' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            name='password'
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
