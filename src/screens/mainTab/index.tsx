import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import styled from '@emotion/native';

import HomeMainScreen from './home/HomeMainScreen';
import ScheduleMainScreen from './schedule/ScheduleMainScreen';
import QuestionMainScreen from './question/QuestionMainScreen';
import NoticeMainScreen from './notice/NoticeMainScreen';
import ReportMainScreen from './report/ReportMainScreen';
import Icon from '../../components/common/icons/SvgIcon';

import HomeHeader from '../../components/home/HomeHeader';
import ReportHeader from '../../components/report/ReportHeader';

const Tab = createBottomTabNavigator();

const iconName = {
  Schedule: 'TabSchedule',
  Question: 'TabQuestion',
  Home: 'TabHome',
  Notice: 'TabNotice',
  Report: 'TabReport',
};

function CustomTabBar({state, descriptors, navigation}) {
  return (
    <TabBarContainer>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'Report') {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Report'}],
                }),
              );
              return;
            }
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const targetIconName =
          iconName[route.name] + (isFocused ? '' : 'Unselected');

        return (
          <TabBarItem
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}>
            <TabBarIconWrapper>
              <Icon name={targetIconName} />
            </TabBarIconWrapper>
            <TabBarLabel $isFocused={isFocused}>{label}</TabBarLabel>
          </TabBarItem>
        );
      })}
    </TabBarContainer>
  );
}

export default function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Schedule"
        component={ScheduleMainScreen}
        options={{tabBarLabel: '스케줄'}}
      />
      <Tab.Screen
        name="Question"
        component={QuestionMainScreen}
        options={{tabBarLabel: '질문'}}
      />
      <Tab.Screen
        name="Home"
        component={HomeMainScreen}
        options={{tabBarLabel: 'HOME', header: () => <HomeHeader />}}
      />
      <Tab.Screen
        name="Notice"
        component={NoticeMainScreen}
        options={{tabBarLabel: '알림장'}}
      />
      <Tab.Screen
        name="Report"
        component={ReportMainScreen}
        options={{tabBarLabel: '리포트', header: () => <ReportHeader />}}
      />
    </Tab.Navigator>
  );
}

const TabBarContainer = styled.View`
  padding: 6px 20px 32px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.color.grey[100]};
  border-top: 1px solid ${props => props.theme.color.grey[200]};
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${props => props.theme.color.grey[200]};
`;

const TabBarItem = styled.Pressable`
  padding: 6px 16px 0px 16px;
  gap: 6px;
  align-items: center;
  /* background-color: red; */
`;

const TabBarIconWrapper = styled.View`
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
`;

const TabBarLabel = styled.Text<{$isFocused: boolean}>`
  color: ${props =>
    props.$isFocused ? props.theme.color.BTN900 : props.theme.color.grey[500]};
  text-align: center;

  /* Text/R12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: ${props => (props.$isFocused ? '600' : '400')};
  line-height: 18px; /* 18px */
`;
