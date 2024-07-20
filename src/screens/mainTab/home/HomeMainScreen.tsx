import {View, Text} from 'react-native';
import React from 'react';
import DefaultButton from '../../../components/buttons/DefaultButton';
import NavigateBox from '../../../components/box/NaviagateBox';
import ProgressBar from '../../../components/progressbar/ProgressBar';
import StudentTag from '../../../components/tag/StudentTag';
import HalfSizeButton from '../../../components/buttons/HalfSizeButton';
export default function HomeMainScreen() {
  return (
    <View>
      <Text>HomeMainScreen</Text>
      <DefaultButton type="disable" label="default"></DefaultButton>
      <NavigateBox label="화살표박스아이콘"></NavigateBox>
      <ProgressBar maxNum={100} currentCredit={95} />
      <StudentTag></StudentTag>
      <HalfSizeButton label="half-size"></HalfSizeButton>
    </View>
  );
}
