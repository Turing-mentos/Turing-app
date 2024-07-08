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
  background-color: ${props => props.theme.color.grey[100]};
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
  background-color: ${props => props.theme.color.grey[300]};
`;

const Content = styled.Text`
  color: ${props => props.theme.color.grey[500]};
  font-size: 12px;
  line-height: 18px;
`;
