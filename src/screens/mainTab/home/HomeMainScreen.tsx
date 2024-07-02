import {View, Text} from 'react-native';
import React from 'react';
import Button from '../../../components/buttons/Button';
import DefaultButton from '../../../components/buttons/DefaultButton';
import NavigateBox from '../../../components/box/NaviagateBox';
import ProgressBar from '../../../components/progressbar/ProgressBar';
import StudentTag from '../../../components/tag/StudentTag';
import HalfSizeButton from '../../../components/buttons/halfSizeButton';
export default function HomeMainScreen() {
  return (
    <View>
      <Text>HomeMainScreen</Text>
      <DefaultButton type="disable" label="dd"></DefaultButton>
      <NavigateBox label="화살표박스아이콘"></NavigateBox>
      <ProgressBar maxNum={100} currentCredit={95} />
      <StudentTag></StudentTag>
      <HalfSizeButton>s</HalfSizeButton>
    </View>
  );
}
