import React from 'react';
import StackScreenHeader from '../common/header/StackScreenHeader';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

export default function OnboardingHeader() {
  const navigation = useNavigation();

  const RightButton = <StepOver>건너뛰기</StepOver>;

  return (
    <StackScreenHeader
      disableBack
      rightButton={RightButton}
      onPressRightButton={() => navigation.navigate('MainTab')}
    />
  );
}

const StepOver = styled.Text`
  color: ${props => props.theme.color.grey[500]};
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18.2px; /* 18.2px */
`;
