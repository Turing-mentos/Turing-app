import React from 'react';
import styled from '@emotion/native';

interface ConnectSuccessModalContentProps {
  name: string;
  subject: string;
}

export default function ConnectSuccessModalContent({
  name,
  subject,
}: ConnectSuccessModalContentProps) {
  return (
    <Container>
      <CelebrateIcon
        source={require('../../../../assets/images/celebrate.png')}
      />
      <Title>선생님 계정 연결 완료!</Title>
      <SubTitle>
        {name} 선생님의 {subject} 수업과 연결됐어요.{'\n'}
        앞으로 튜링에서 과외 수업을 함께 하세요.
      </SubTitle>
    </Container>
  );
}

const Container = styled.View`
  align-items: center;
`;

const CelebrateIcon = styled.Image`
  width: 64px;
  height: 64px;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};
  text-align: center;

  /* Text/SB22 */
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 33px; /* 33px */
`;

const SubTitle = styled.Text`
  margin-top: 8px;
  color: ${props => props.theme.color.BTN900};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;
