import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import styled from '@emotion/native';

import {StudyRoomAPI} from '../../../api/studyRoom';
import Button from '../../common/Button';

export default function TeacherConnectInfoPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const [teacherProfile, setTeacherProfile] = useState({
    subject: '',
    teacherFirstName: '',
    teacherLastName: '',
  });

  const {code} = route.params;

  const existsTeacher =
    teacherProfile.teacherLastName && teacherProfile.teacherFirstName;

  const handleConnect = async () => {
    try {
      await StudyRoomAPI.connectStudyRoom(+code);
      navigation.navigate('MyPage', {
        key: Math.random(),
        connected: true,
        teacherProfile,
      });
    } catch (err) {
      console.log('handle connect error:', err);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const NotFoundTeacherContent = (
    <>
      <Title>존재하지 않는 선생님 코드입니다!</Title>
      <Content>아래 버튼을 눌러 계정을 다시 찾아보세요.</Content>
    </>
  );

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const response = await StudyRoomAPI.getTeacherInfo(code);
        if (response.data) {
          setTeacherProfile(response.data);
        }
      } catch (err) {
        console.log('fetch teacher profile error:', err);
      }
    };

    fetchTeacherProfile();
  }, [code]);

  return (
    <Container>
      <InfoContainer>
        {existsTeacher && (
          <>
            <Title>과외 선생님을 연결할까요?</Title>
            <Content>
              내가 찾는 선생님 정보가 아니라면{'\n'}
              코드 번호를 다시 입력해보세요.
            </Content>
            <Box>
              <BoxText>{`${
                teacherProfile.teacherLastName + teacherProfile.teacherFirstName
              } 선생님 (${teacherProfile.subject})`}</BoxText>
            </Box>
          </>
        )}
        {!existsTeacher && NotFoundTeacherContent}
      </InfoContainer>

      <Buttons>
        <Button label="선생님 계정 다시 찾기" onPress={handleGoBack} sub />
        {existsTeacher && (
          <Button label="계정 연결하기" onPress={handleConnect} />
        )}
      </Buttons>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.BG100};
  padding: 60px 20px 80px 20px;
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const Buttons = styled.View`
  margin-bottom: 80px;
  gap: 12px;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB22 */
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 33px; /* 33px */
`;

const Content = styled.Text`
  margin-top: 8px;
  color: ${props => props.theme.color.BTN900};

  /* Text/R14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 21px */
`;

const Box = styled.View`
  margin-top: 39px;
  padding: 20px 16px;
  border-radius: 5px;
  background-color: ${props => props.theme.color.grey[100]};
`;

const BoxText = styled.Text`
  color: ${props => props.theme.color.BTN900};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 30px */
`;
