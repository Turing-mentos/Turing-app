import React from 'react';
import {WebView} from 'react-native-webview';
import styled from '@emotion/native';

export default function TermsOfUseScreen() {
  return (
    <Container>
      <WebView
        source={{
          uri: 'https://elegant-bass-d29.notion.site/471abd2e62594370a58e2a5bffe78cf4',
        }}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
