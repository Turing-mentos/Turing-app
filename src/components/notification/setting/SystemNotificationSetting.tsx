import React from 'react';
import styled from '@emotion/native';

import useNotificationSetting from '../../../hooks/useNotificationSetting';
import {OnContent, OffContent} from './SystemContent';

export default function SystemNotificationSetting() {
  const {isNotificationEnabled} = useNotificationSetting();

  return (
    <Container>
      <TitleLine>
        <Title>시스템 알림 설정</Title>
        <OnOff $on={isNotificationEnabled}>
          {isNotificationEnabled ? 'ON' : 'OFF'}
        </OnOff>
      </TitleLine>
      <TextContainer $on={isNotificationEnabled}>
        {isNotificationEnabled ? <OnContent /> : <OffContent />}
      </TextContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
  padding: 24px 20px;
  gap: 8px;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px; /* 27px */
`;

const TitleLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OnOff = styled.Text<{$on: boolean}>`
  color: ${props =>
    props.$on ? props.theme.color.blue[800] : props.theme.color.red[800]};

  /* Text/M20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 30px */
`;

const TextContainer = styled.View<{$on: boolean}>`
  background-color: ${props =>
    props.$on ? props.theme.color.grey[200] : props.theme.color.red[200]};
  padding: 8px 16px;
  align-items: center;
  border-radius: 5px;
`;
