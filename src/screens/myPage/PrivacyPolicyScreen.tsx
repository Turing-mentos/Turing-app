import React from 'react';
import {WebView} from 'react-native-webview';
import styled from '@emotion/native';

export default function PrivacyPolicyScreen() {
  return (
    <Container>
      <WebView
        source={{
          uri: 'https://elegant-bass-d29.notion.site/8d21b3beaaf942f6b71160d27fae5d8b',
        }}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
