import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from '@emotion/native';
import axios from 'axios';
import http from '../utils/http';

import KakaoLoginButton from '../components/signIn/KaKaoLoginButton';
import AppleLoginButton from '../components/signIn/AppleLoginButton';

export default function SignInScreen({navigation}) {
  async function testGet() {
    try {
      const response = await http.get('/test');
      const result = response.result;
      console.log('test response:', result);
    } catch (err) {
      console.log('test err:', err);
    }
  }

  return (
    <Container>
      <TouchableOpacity
        style={{marginBottom: 100}}
        onPress={() => navigation.navigate('MainTab')}>
        <Text>Go to Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{marginBottom: 100}} onPress={() => testGet()}>
        <Text>Test</Text>
      </TouchableOpacity>

      <KakaoLoginButton />
      <AppleLoginButton />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.Button`
  margin-bottom: 50px;
`;
