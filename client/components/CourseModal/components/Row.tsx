import { Colors } from '@/utils/types';
import React from 'react';
import { RowData, RowTitle, RowWrapper } from './styled';

interface Props {
  name: string;
  data: number[];
}

const Row: React.FC<Props> = ({ name, data }: Props) => {
  let color: Colors = 'black';
  switch (name) {
    case 'PAR':
      color = 'orange';
      break;
    case 'HDC':
      color = 'yellow';
      break;
    default:
      color = 'black';
  }
  const holeRow = !data.length;
  const total = name === 'PAR' ? data.reduce((a, b) => a + b, 0) : 'TOT';
  return (
    <RowWrapper>
      <RowTitle color={color} text={holeRow ? 'white' : 'black'}>
        {name}
      </RowTitle>
      {(!holeRow ? data : [1, 2, 3, 4, 5, 6, 7, 8, 9]).map((d, i) => (
        <RowData key={i} color={color} text={holeRow ? 'white' : 'black'}>
          {d}
        </RowData>
      ))}
      <RowData color={color} text={holeRow ? 'white' : 'black'}>
        {name === 'HDC' ? '' : total}
      </RowData>
    </RowWrapper>
  );
};
export default Row;
