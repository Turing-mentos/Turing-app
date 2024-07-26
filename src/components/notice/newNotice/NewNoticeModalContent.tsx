import React from 'react';
import styled from '@emotion/native';

export default function NewNoticeModalContent() {
  return (
    <Container>
      <ModalIcon
        source={require('../../../../assets/images/Notice/create-complete.png')}
      />
      <Title>알림장 생성 완료!</Title>
      <Body>
        작성하신 숙제들로 알림장을 생성했어요.{'\n'}학생이 숙제를 완료하면
        알려드릴게요.
      </Body>
    </Container>
  );
}

const Container = styled.View`
  align-items: center;
`;

const ModalIcon = styled.Image`
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

const Body = styled.Text`
  margin-top: 8px;
  color: ${props => props.theme.color.BTN900};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;
