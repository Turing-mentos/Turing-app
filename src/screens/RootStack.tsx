import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import useSignIn from '../hooks/useSignIn';
import {getStorage} from '../utils/storage';

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
import ReportHelpScreen from './mainTab/report/ReportHelpScreen';
import PrevReportScreen from './mainTab/report/PrevReportScreen';

// 마이페이지 내부 페이지
import MyPageMainScreen from './myPage/MyPageMainScreen';
import ProfileManagementScreen from './myPage/ProfileManagementScreen';
import ProfileManagementUpdateScreen from './myPage/ProfileManagementUpdateScreen';
import NewLessonScreen from './myPage/NewLessonScreen';
import UpdateLessonScreen from './myPage/UpdateLessonScreen';
import TeacherConnectScreen from './myPage/TeacherConnectScreen';
import TeacherConnectInfoScreen from './myPage/TeacherConnectInfoScreen';
import StudyRoomManagementScreen from './myPage/StudyRoomManagementScreen';
import AccountScreen from './myPage/AccountScreen';
import ReviewScreen from './myPage/ReviewScreen';
import ContactScreen from './myPage/ContactScreen';
import TermsOfUseScreen from './myPage/TermsOfUseScreen';
import PrivacyPolicyScreen from './myPage/PrivacyPolicyScreen';

// 알림 내부 페이지
import NotificationMainScreen from './notification/NotificationMainScreen';
import NotificationSettingScreen from './notification/NotificationSettingScreen';

// 스크린 헤더들
import StudyRoomManagementHeader from '../components/myPage/studyRoomManagement/StudyRoomManagementHeader';
import SignUpHeader from '../components/signUp/SignUpHeader';
import OnboardingHeader from '../components/onboarding/OnboardingHeader';
import NotificationHeader from '../components/notification/NotificationHeader';
import NotificationSettingHeader from '../components/notification/setting/NotificationSettingHeader';
import MyPageHeader from '../components/myPage/MyPageHeader';
import NewLessonHeader from '../components/myPage/lesson/NewLessonHeader';
import UpdateLessonHeader from '../components/myPage/studyRoomManagement/UpdateLessonHeader';
import ProfileManagementHeader from '../components/myPage/profileManagement/ProfileManagementHeader';
import AccountHeader from '../components/myPage/account/AccountHeader';
import TeacherConnectHeader from '../components/myPage/studyRoomManagement/TeacherConnectHeader';
import ReportDetailHeader from '../components/report/detail/ReportDetailHeader';
import ReportHelpHeader from '../components/report/detail/ReportHelpHeader';
import PrevReportHeader from '../components/report/detail/PrevReportHeader';
import PrivacyPolicyHeader from '../components/myPage/PrivacyPolicyHeader';
import TermsOfUseHeader from '../components/myPage/TermsOfUseHeader';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const navigation = useNavigation();
  const {fetchUserInfoAndSave} = useSignIn();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const accessToken = await getStorage('accessToken');
        console.log('accessToken:', accessToken);

        if (accessToken) {
          await fetchUserInfoAndSave();
          navigation.navigate('MainTab');
        } else {
          navigation.navigate('SignIn');
        }
      } catch (err) {
        console.log('자동 로그인 에러:', err);
        navigation.navigate('SignIn');
      }
    };

    autoLogin();
  }, [fetchUserInfoAndSave, navigation]);

  return (
    <Stack.Navigator>
      {/* 회원가입 / 로그인 */}
      {/* <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{headerShown: false}}
      /> */}

      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SingUpScreen}
        options={{header: () => <SignUpHeader />}}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{header: () => <OnboardingHeader />}}
      />

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
      <Stack.Screen
        name="ReportDetail"
        component={ReportDetailScreen}
        options={{header: () => <ReportDetailHeader />}}
      />
      <Stack.Screen
        name="ReportHelp"
        component={ReportHelpScreen}
        options={{header: () => <ReportHelpHeader />}}
      />
      <Stack.Screen
        name="PrevReport"
        component={PrevReportScreen}
        options={{header: () => <PrevReportHeader />}}
      />

      {/* 마이페이지 관련 페이지*/}
      <Stack.Screen
        name="MyPage"
        component={MyPageMainScreen}
        options={{header: () => <MyPageHeader />}}
      />
      <Stack.Screen
        name="ProfileManagement"
        component={ProfileManagementScreen}
        options={{header: () => <ProfileManagementHeader />}}
      />
      <Stack.Screen
        name="ProfileManagementUpdate"
        component={ProfileManagementUpdateScreen}
        options={{header: () => <ProfileManagementHeader />}}
      />
      <Stack.Screen
        name="NewLesson"
        component={NewLessonScreen}
        options={{header: () => <NewLessonHeader />}}
      />
      <Stack.Screen
        name="UpdateLesson"
        component={UpdateLessonScreen}
        options={{header: () => <UpdateLessonHeader />}}
      />
      <Stack.Screen
        name="TeacherConnect"
        component={TeacherConnectScreen}
        options={{header: () => <TeacherConnectHeader />}}
      />
      <Stack.Screen
        name="TeacherConnectInfo"
        component={TeacherConnectInfoScreen}
        options={{header: () => <TeacherConnectHeader />}}
      />
      <Stack.Screen
        name="StudyRoomManagement"
        component={StudyRoomManagementScreen}
        options={{
          header: () => <StudyRoomManagementHeader />,
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{header: () => <AccountHeader />}}
      />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen
        name="TermsOfUse"
        component={TermsOfUseScreen}
        options={{header: () => <TermsOfUseHeader />}}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{header: () => <PrivacyPolicyHeader />}}
      />

      {/* 알림 관련 페이지 */}
      <Stack.Screen
        name="Notification"
        component={NotificationMainScreen}
        options={{
          header: () => <NotificationHeader />,
        }}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSettingScreen}
        options={{
          header: () => <NotificationSettingHeader />,
        }}
      />
    </Stack.Navigator>
  );
}
