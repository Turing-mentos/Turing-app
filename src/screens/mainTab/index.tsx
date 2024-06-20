import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity, Text} from 'react-native';

import HomeMainScreen from './home/HomeMainScreen';
import ScheduleMainScreen from './schedule/ScheduleMainScreen';
import QuestionMainScreen from './question/QuestionMainScreen';
import NoticeMainScreen from './notice/NoticeMainScreen';
import ReportMainScreen from './report/ReportMainScreen';

const Tab = createBottomTabNavigator();

const RightHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={{flexDirection: 'row', gap: 10, marginRight: 10}}>
      <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
        <Text>마이 페이지</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <Text>알림</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRight: RightHeader,
      }}>
      <Tab.Screen name="Schedule" component={ScheduleMainScreen} />
      <Tab.Screen name="Question" component={QuestionMainScreen} />
      <Tab.Screen name="Home" component={HomeMainScreen} />
      <Tab.Screen name="Notice" component={NoticeMainScreen} />
      <Tab.Screen name="Report" component={ReportMainScreen} />
    </Tab.Navigator>
  );
}
