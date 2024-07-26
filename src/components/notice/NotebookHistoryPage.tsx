import React from 'react';
import styled from '@emotion/native';
import Icon from '../common/icons/SvgIcon';

export default function NotebookHistoryPage() {
  return (
    <Container>
      <Content>
        <Icon name="HelpQuestionGrey" />
        <Title>아직 구현되지 않았어요</Title>
        <Body>정식 서비스 출시 시 구현될 예정입니다!</Body>
      </Content>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.BG100};
`;

const Content = styled.View`
  margin-top: 100px;
  align-items: center;
`;

const Title = styled.Text`
  margin-top: 16px;
  color: ${props => props.theme.color.grey[700]};
  text-align: center;

  /* Text/SB20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 30px */
`;

const Body = styled.Text`
  margin-top: 16px;
  color: ${props => props.theme.color.grey[700]};
  text-align: center;

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;
