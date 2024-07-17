import React from 'react';
import styled from '@emotion/native';

import RoutingButton from './RoutingButton';

export default function AppManagementSection() {
  return (
    <Container>
      <Title>APP 관리</Title>

      <ButtonGroup>
        <RoutingButton name="NotificationSetting" />
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.View`
  padding: 12px 0px;
  background-color: ${props => props.theme.color.grey[100]};
  gap: 8px;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};
  padding-left: 20px;

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;

const ButtonGroup = styled.View``;
