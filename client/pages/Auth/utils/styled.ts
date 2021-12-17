import { styled } from '@/utils/styled';
import { Layout, Form, Button } from 'antd';

export const Wrapper = styled(Layout)`
  align-items: center;
`;

export const StyledForm = styled(Form)`
  margin-top: 2rem;
  width: min(700px, 100%);
  background-color: ${({ theme }) => theme.color['white:0']};
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 2rem 4rem;
`;

export const StyledButton = styled(Button)`
  width: 100%;
`;

export const StyledBottomRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -12px
`;
