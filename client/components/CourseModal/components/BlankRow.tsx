import React from 'react';
import { RowData, RowTitle, RowWrapper } from './styled';

const BlankRow = () => {
  return (
    <RowWrapper>
      <RowTitle color='white' text='white'>ohohoh</RowTitle>
      {[...new Array(10)].map((_, i) => (
        <RowData key={i} color='white'>
        </RowData>
      ))}
    </RowWrapper>
  );
};
export default BlankRow;
