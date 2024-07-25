import {View} from 'react-native';
import React from 'react';
import styled from '@emotion/native';

import Notifications from '../../components/notification/Notifications';

export default function NotificationMainScreen() {
  return (
    <Container>
      <Notifications />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
`;
