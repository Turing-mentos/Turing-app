import React from 'react';
import styled from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import SignIn from '../components/signIn/SignIn';

export default function SignInScreen() {
  return (
    <Container>
      <SignIn />
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
`;
