import React from 'react';
import styled from '@emotion/native';

import Onboarding from '../components/onboarding/Onboarding';

export default function OnboardingScreen() {
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
