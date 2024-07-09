import React from 'react';
import styled from '@emotion/native';

import SignUp from '../components/signUp/SignUp';

export default function SingUpScreen() {
  return (
    <Container>
      <SignUp />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
`;
