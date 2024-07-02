import React from 'react';
import styled from '@emotion/native';

export default function NotificationLimitInfo() {
  return (
    <Container>
      <Content>1달 전까지의 알림만 확인할 수 있어요</Content>
    </Container>
  );
}

const Container = styled.View`
  background-color: #fefefe;
  padding-top: 80px;
  padding-bottom: 60px;
`;

const Content = styled.Text`
  color: #9ea3b4;
  text-align: center;

  font-family: 'Pretendard';
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;
