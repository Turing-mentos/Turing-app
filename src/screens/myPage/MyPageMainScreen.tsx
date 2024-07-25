import React from 'react';
import styled from '@emotion/native';

import MyPage from '../../components/myPage/MyPage';

export default function MyPageMainScreen() {
  return (
    <ScrollViewContainer>
      <Container>
        <MyPage />
      </Container>
    </ScrollViewContainer>
  );
}
const ScrollViewContainer = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
`;

const Container = styled.View`
  flex: 1;
`;
