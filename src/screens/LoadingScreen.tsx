import React from 'react';
import styled from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';

import Loading from '../components/loading/Loading';

export default function LoadingScreen() {
  return (
    <Container
      colors={['#9708CC', '#287EFF']}
      start={{x: -0.3, y: 0.6}}
      end={{x: 1, y: 0.4}}>
      <Loading />
    </Container>
  );
}

const Container = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
