import React from 'react';
import styled from '@emotion/native';

import Icon from '../../common/icons/SvgIcon';

export default function ReportHelpPage() {
  return (
    <Container>
      <Section>
        <Header>
          <Icon name="InformationBlack" />
          <Title>튜링의 학생 리포트</Title>
        </Header>

        <Body>
          GPT-3.5 Turbo를 활용한 텍스트 생성 서비스입니다.{'\n'}
          튜링과의 간단한 대화를 통해 학생 리포트를 받아보세요.{'\n'}
          {'\n'}
          &nbsp;1. 선택지를 고르거나 간단한 키워드를 입력하세요.{'\n'}
          &nbsp;2. 생성된 리포트를 자연스럽게 수정해보세요.{'\n'}
          &nbsp;3. 완성한 리포트를 복사해서 학부모님께 전달해보세요.
        </Body>
      </Section>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
  padding: 12px 20px;
`;

const Section = styled.View`
  border-radius: 5px;
  background-color: ${props => props.theme.color.BG100};

  padding: 24px 20px;
  gap: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  gap: 4px;
  justify-content: center;
  align-items: center;
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
  color: ${props => props.theme.color.BTN900};

  /* Text/R14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 21px */
`;
