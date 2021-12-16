import React from 'react';
// import { Layout } from 'antd';
// import { styled } from '@/utils/styled';
// import { LayoutContext } from '@/contexts';

const InnerLayout: React.FC = ({ children }) => {
  // const { siderWidth } = React.useContext(LayoutContext);
  const siderWidth = 0;
  return (
    <main className={'ohohoh-bg'} style={{ marginLeft: siderWidth }}>
      {children}
    </main>
  );
};

export default InnerLayout;
