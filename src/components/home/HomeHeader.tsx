import React, {useState, useEffect, useCallback} from 'react';
import styled from '@emotion/native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import TabScreenHeader from '../common/header/TabScreenHeader';
import theme from '../../styles/theme';
import Icon from '../common/icons/SvgIcon';
import {Pressable} from 'react-native';
import {NotificationAPI} from '../../api/notification';

export default function HomeHeader() {
  const navigation = useNavigation();

  const [count, setCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchNotificationCount = async () => {
        try {
          const response = await NotificationAPI.getCountOfNotifications();
          if (response.data) {
            setCount(response.data);
          }
        } catch (err) {
          console.log('fetchNotificationCount err:', err);
        }
      };

      fetchNotificationCount();
    }, []),
  );

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
        {count > 0 && (
          <CountCircle>
            <CountText>{count}</CountText>
          </CountCircle>
        )}
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

const CountCircle = styled.View`
  position: absolute;
  right: 0;
  background-color: ${props => props.theme.color.red[800]};
  width: 14px;
  height: 14px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

const CountText = styled.Text`
  color: ${props => props.theme.color.grey[100]};
  text-align: center;
  font-family: Pretendard;
  font-size: 9px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
