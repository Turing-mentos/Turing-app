import React from 'react';
import styled from '@emotion/native';

import MyPage from '../../components/myPage/MyPage';

export default function MyPageMainScreen() {
  return (
    <Container>
      <MyPage />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.grey[150]};
`;
