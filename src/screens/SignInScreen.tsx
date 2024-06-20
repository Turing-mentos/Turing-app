import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from '@emotion/native';

export default function SignInScreen({navigation}) {
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate('MainTab')}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
