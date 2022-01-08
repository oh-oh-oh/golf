import { styled } from '@/utils/styled';
import { Colors } from '@/utils/types';

export const RowWrapper = styled.div`
  display: grid;
  margin-bottom: 3px;
  grid-template-columns: 2fr repeat(10, 1fr);
  grid-gap: 2px;
`;

export const RowData = styled.div<{ color?: Colors, text?: Colors }>`
  background-color: ${({ theme, color }) => theme.color[color || 'white']};
  color: ${({ theme, text }) => theme.color[text || 'black']};
  /* margin-left: 1px; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RowTitle = styled(RowData)<{ scribble?: number }>`
  flex-shrink: 0;
  font-family: ${({scribble}) => scribble && 'Reenie Beanie'};
  font-size: ${({scribble}) => scribble && '1.4rem'};
`;
