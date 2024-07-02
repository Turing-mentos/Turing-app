import React from 'react';
import styled from '@emotion/native';

export default function PrevDivider() {
  return (
    <Container>
      <Line />
      <Content>이전 알림</Content>
      <Line />
    </Container>
  );
}

const Container = styled.View`
  background-color: #fefefe;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: #d4d8e2;
`;

const Content = styled.Text`
  color: #9ea3b4;
  font-size: 12px;
  line-height: 18px;
`;
