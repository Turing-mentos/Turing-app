import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import styled from '@emotion/native';

export default function IntroduceScreen({navigation}) {
  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        <Text>시작하기</Text>
      </TouchableOpacity>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
