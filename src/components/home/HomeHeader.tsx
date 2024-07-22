import React from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import TabScreenHeader from '../common/header/TabScreenHeader';
import theme from '../../styles/theme';
import Icon from '../common/icons/SvgIcon';
import {Pressable} from 'react-native';

export default function HomeHeader() {
  const navigation = useNavigation();

  const RightButton = (
    <RightButtonContainer>
      <Pressable
        onPress={() => {
          navigation.navigate('MyPage');
        }}>
        <Icon name="HomeProfile" />
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate('Notification');
        }}>
        <Icon name="HomeAlarm" />
      </Pressable>
    </RightButtonContainer>
  );

  return (
    <TabScreenHeader
      backgroundColor={theme.color.BG100}
      rightButton={RightButton}
    />
  );
}

const RightButtonContainer = styled.View`
  flex-direction: row;
  gap: 16px;
`;
