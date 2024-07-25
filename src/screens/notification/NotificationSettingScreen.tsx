import React from 'react';
import styled from '@emotion/native';

import SystemNotificationSetting from '../../components/notification/setting/SystemNotificationSetting';
import DetailNotificationSetting from '../../components/notification/setting/DetailNotificationSetting';

export default function NotificationSettingScreen() {
  return (
    <Container>
      <SystemNotificationSetting />
      <DetailNotificationSetting />
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
  gap: 4px;
`;
