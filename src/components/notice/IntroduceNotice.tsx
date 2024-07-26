import React from 'react';
import styled from '@emotion/native';
import Icon from '../common/icons/SvgIcon';

export default function IntroduceNotice() {
  return (
    <Container>
      <Header>
        <Icon name="InformationBlack" />
        <Title>튜링의 간편 알림장</Title>
      </Header>

      <Body>
        1. 하단의 [숙제 추가] 버튼을 클릭해 숙제를 하나씩 추가해 보세요.{'\n'}
        2. 생성된 알림장은 연결된 학생에게도 공유되며 실시간으로 숙제 달성률을
        확인할 수 있어요. {'\n'}3. 한 번만 알림장을 등록해두면, 다음부터는 숙제
        범위만 조정하여 간편하게 작성할 수 있어요.
      </Body>
    </Container>
  );
}

const Container = styled.View`
  padding: 24px 20px;
  gap: 16px;
  background-color: ${props => props.theme.color.BG100};
`;

const Header = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;

const Body = styled.Text`
  margin-top: 16px;
  color: ${props => props.theme.color.BTN900};

  /* Text/R14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 21px */
`;
