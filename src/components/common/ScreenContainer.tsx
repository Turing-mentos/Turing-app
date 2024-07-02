import React from 'react';
import styled from '@emotion/native';

export default function ScreenContainer({children}: {children: any}) {
  return <Container>{children}</Container>;
}

const Container = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`;
