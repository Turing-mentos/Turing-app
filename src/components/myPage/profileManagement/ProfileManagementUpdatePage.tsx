import React, {useState} from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import useUserStore from '../../../store/useUserStore';
import Icon from '../../common/icons/SvgIcon';
import DefaultButton from '../../buttons/DefaultButton';
import InputBox from '../../common/InputBox';
import {ProfileAPI} from '../../../api/profile';
import useSignIn from '../../../hooks/useSignIn';

export default function ProfileManagementUpdatePage() {
  const {fetchUserInfoAndSave} = useSignIn();
  const {role, lastName, firstName, university, department, studentNum} =
    useUserStore(state => state.user);
  const [profile, setProfile] = useState({
    lastName: lastName,
    firstName: firstName,
    university: university,
    department: department,
    studentNumber: studentNum,
  });
  const navigation = useNavigation();
  const target = role === 'teacher' ? '학생' : '선생님';
  const roleKr = role === 'teacher' ? '선생님' : '학생';

  function handleTextChange(identifier: keyof typeof profile, value: string) {
    setProfile(prev => ({
      ...prev,
      [identifier]: value,
    }));
  }

  async function handleUpdateSubmit() {
    try {
      if (role === 'teacher') {
        await ProfileAPI.updateTeacherProfile(profile);
      } else if (role === 'student') {
        await ProfileAPI.updateStudentProfile(profile);
      } else {
        console.error('일치하는 role이 없습니다.');
      }

      navigation.navigate('ProfileManagement', {key: Math.random()});
    } catch (err) {
      console.log('handleUpdateSubmit err:', err);
    } finally {
      await fetchUserInfoAndSave();
    }
  }

  return (
    <Container>
      <Main>
        <IntroduceContainer>
          <IntroduceText>
            연결된 {target}에게 공개될 정보에요.{'\n'}
            정확하고 올바른 정보를 기입해주세요.
          </IntroduceText>
        </IntroduceContainer>

        <Section>
          <Title>{roleKr} 닉네임</Title>
          <InputBox
            label="성"
            value={profile.lastName}
            onChangeText={value => handleTextChange('lastName', value)}
            placeholder="김"
          />
          <InputBox
            label="이름"
            value={profile.firstName}
            onChangeText={value => handleTextChange('firstName', value)}
            placeholder="튜링"
          />
        </Section>

        {role === 'teacher' && (
          <Section>
            <Title>정보</Title>
            <InputBox
              label="대학교"
              value={profile.university}
              onChangeText={value => handleTextChange('university', value)}
              placeholder="ex. 튜링대학교(서울)"
            />
            <InputBox
              label="학과"
              value={profile.department}
              onChangeText={value => handleTextChange('department', value)}
              placeholder="ex. 경영학과"
            />
            <InputBox
              label="학번"
              value={profile.studentNumber}
              onChangeText={value => handleTextChange('studentNumber', value)}
              placeholder="ex. 20학번"
            />
          </Section>
        )}

        <InfoBox>
          <Icon name="ExclamationBlue" width={16} height={16} />
          <InfoText>{roleKr} 정보 수정은 1년에 1회만 가능해요.</InfoText>
        </InfoBox>
      </Main>

      <DefaultButton
        label="저장"
        type="normal"
        onPress={() => handleUpdateSubmit()}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0 20px 80px 20px;
  background-color: ${props => props.theme.color.grey[100]};
`;

const Main = styled.View`
  flex: 1;
`;

const IntroduceContainer = styled.View`
  padding: 8px 16px;
  border-radius: 5px;
  background-color: ${props => props.theme.color.grey[200]};
`;

const IntroduceText = styled.Text`
  color: var(--Greyscale-800, #3b414f);
  color: ${props => props.theme.color.grey[800]};

  /* Text/R14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 21px */
`;

const Section = styled.View`
  margin-top: 24px;
  gap: 8px;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.grey[700]};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;

const InfoBox = styled.View`
  margin-top: 20px;
  padding: 12px 16px;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  border-radius: 5px;
  background-color: ${props => props.theme.color.blue[200]};
`;

const InfoText = styled.Text`
  color: var(--Main-TB, #287eff);
  color: ${props => props.theme.color.blue[800]};

  /* Text/SB14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 21px */
`;
