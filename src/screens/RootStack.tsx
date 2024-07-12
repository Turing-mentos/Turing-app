import React from 'react';
import {Button, Pressable} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HeaderLeftArrow from '../components/header/HeaderLeftArrow';

// 회원가입 / 로그인
import LoadingScreen from './LoadingScreen';
import OnboardingScreen from './OnboardingScreen';
import SignInScreen from './SignInScreen';
import SingUpScreen from './SingUpScreen';

// 탭
import MainTab from './mainTab';

// 메인 탭 내부 페이지
import NewExamScreen from './mainTab/schedule/NewExamScreen';
import ReschedulingRequestScreen from './mainTab/schedule/ReschedulingRequestScreen';
import QuestionDetailScreen from './mainTab/question/QuestionDetailScreen';
import NoticeWriteScreen from './mainTab/notice/NoticeWriteScreen';
import ReportDetailScreen from './mainTab/report/ReportDetailScreen';

// 마이페이지 내부 페이지
import MyPageMainScreen from './myPage/MyPageMainScreen';
import ProfileManagementScreen from './myPage/ProfileManagementScreen';
import ProfileManagementUpdateScreen from './myPage/ProfileManagementUpdateScreen';
import NewClassScreen from './myPage/NewClassScreen';
import StudentManagementScreen from './myPage/StudentManagementScreen';
import AccountScreen from './myPage/AccountScreen';
import ReviewScreen from './myPage/ReviewScreen';
import ContactScreen from './myPage/ContactScreen';
import TermsOfUseScreen from './myPage/TermsOfUseScreen';
import PrivacyPolicyScreen from './myPage/PrivacyPolicyScreen';

// 알림 내부 페이지
import NotificationMainScreen from './notification/NotificationMainScreen';
import NotificationSettingScreen from './notification/NotificationSettingScreen';
import theme from '../styles/theme';
import Icon from '../components/common/icons/SvgIcon';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator>
      {/* 회원가입 / 로그인 */}
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SignUp" component={SingUpScreen} />

      {/* 메인 탭 */}
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />

      {/* 스케줄 스택 페이지 */}
      <Stack.Screen name="NewExam" component={NewExamScreen} />
      <Stack.Screen
        name="ReschedulingRequest"
        component={ReschedulingRequestScreen}
      />

      {/* 질문 관련 페이지 */}
      <Stack.Screen name="QuestionDetail" component={QuestionDetailScreen} />

      {/* 알림장 관련 페이지 */}
      <Stack.Screen name="NoticeWrite" component={NoticeWriteScreen} />

      {/* 리포트 관련 페이지 */}
      <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />

      {/* 마이페이지 관련 페이지*/}
      <Stack.Screen name="MyPage" component={MyPageMainScreen} />
      <Stack.Screen
        name="ProfileManagement"
        component={ProfileManagementScreen}
      />
      <Stack.Screen
        name="ProfileManagementUpdate"
        component={ProfileManagementUpdateScreen}
      />
      <Stack.Screen name="NewClass" component={NewClassScreen} />
      <Stack.Screen
        name="StudentManagement"
        component={StudentManagementScreen}
      />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />

      {/* 알림 관련 페이지 */}
      <Stack.Screen
        name="Notification"
        component={NotificationMainScreen}
        // options={({navigation}) => ({
        //   header: () => <Header title="알림" navigation={navigation} />,
        // })}
        options={({navigation}) => ({
          headerLeft: () => <HeaderLeftArrow navigation={navigation} />,
          headerTitle: '하이',
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'Pretendard',
            fontWeight: 600,
            lineHeight: 27,
            color: theme.color.BTN900,
          },
          headerRight: () => (
            <Button
              title="설정"
              onPress={() => navigation.push('NotificationSetting')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSettingScreen}
      />
    </Stack.Navigator>
  );
}
