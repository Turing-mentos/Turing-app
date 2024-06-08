import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

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
    <View>
      <GoButton name="ProfileManagement" />
      <GoButton name="NewClass" />
      <GoButton name="StudentManagement" />
      <GoButton name="Account" />
      <GoButton name="Review" />
      <GoButton name="Contact" />
      <GoButton name="TermsOfUse" />
      <GoButton name="PrivacyPolicy" />
    </View>
  );
}
