import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { styled } from '@/utils/styled';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, message } from 'antd';
import { gql, useMutation, useQuery } from '@apollo/client';
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
  const [errors, setErrors] = useState<LoginErrorsType>({});
  const [login, { loading, data }] = useMutation(LOGIN_QUERY,{
    onCompleted() {
      message.success(success)
    },
    onError({networkError, graphQLErrors}) {
      // message.error(err.message)
      console.log('network', networkError)
      console.log('graphql', graphQLErrors)
    }
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors(prev => ({
      ...prev,
      general: undefined,
      [e.target.name]: e.target.value,
    }));
  };

  const onFinish = ({ username, password }: LoginFormType) => {
    console.log(username, password)
    login({ variables: { username, password } });
    console.log(username, password)
  };
  return (
    <Wrapper>
      <StyledForm
        name="login"
        initialValues={{}}
        onFinish={values => onFinish(values as LoginFormType)}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input Username.' }]}
          onChange={handleChange}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input Password.' }]}
          onChange={handleChange}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
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
