import React from 'react';
import styled from '@emotion/native';

export default function HomeworkCompleteModal() {
  const comment = [
    '다음 수업 전까지 복습은 필수!',
    '성실한 스스로를 칭찬해주세요.',
    '아주 잘 하고 있어요. 앞으로도 화이팅!',
  ];
  const randomIndex = Math.floor(Math.random() * 3);
  const randomComment = comment[randomIndex];

  return (
    <Container>
      <ModalIcon
        source={require('../../../assets/images/homework-complete.png')}
      />
      <Title>모든 숙제 완료!</Title>
      <Body>{randomComment}</Body>
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
