import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import MyPage from '../../components/myPage/MyPage';

function GoButton({name}: {name: string}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(name);
      }}
      style={{margin: 20, backgroundColor: 'skyblue'}}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
}

export default function MyPageMainScreen() {
  return (
    <Container>
      <MyPage />
      {/* <GoButton name="ProfileManagement" />
      <GoButton name="NewClass" />
      <GoButton name="StudentManagement" />
      <GoButton name="Account" />
      <GoButton name="Review" />
      <GoButton name="Contact" />
      <GoButton name="TermsOfUse" />
      <GoButton name="PrivacyPolicy" /> */}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.grey[150]};
`;
