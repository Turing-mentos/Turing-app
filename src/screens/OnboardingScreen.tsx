import React from 'react';
import styled from '@emotion/native';

import Onboarding from '../components/onboarding/Onboarding';
import {requestUserPermission} from '../utils/permission';

export default function OnboardingScreen() {
  requestUserPermission();

  return (
    <Container>
      <Onboarding />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
`;
