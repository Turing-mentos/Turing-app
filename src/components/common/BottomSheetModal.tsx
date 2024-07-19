import {View, Text} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import {SimpleSheet} from 'react-native-simple-sheet';

export default function BottomSheetModal({...props}) {
  return (
    <SimpleSheet {...props}>
      <Container>
        <Text>BottomSheetModal</Text>
      </Container>
    </SimpleSheet>
  );
}

const Container = styled.View`
  padding: 16px 20px;
`;
