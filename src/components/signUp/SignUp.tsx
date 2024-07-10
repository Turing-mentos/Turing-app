import React, {useState} from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import RoleSelectBox from './RoleSelectBox';
import DefaultButton from '../buttons/DefaultButton';
import InputBox from './InputBox';
import useUserStore, {Role} from '../../store/useUserStore';

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>();
  const [username, setUsername] = useState({
    lastName: '',
    firstName: '',
  });

  const setUser = useUserStore(state => state.setUser);
  const navigation = useNavigation();

  function handleSelectRole(selectdRole: Role) {
    setRole(selectdRole);
  }

  function handleTextChange(
    identifier: 'lastName' | 'firstName',
    value: string,
  ) {
    setUsername(prev => ({
      ...prev,
      [identifier]: value,
    }));
  }

  function handleSubmit() {
    console.log('role:', role);
    console.log('username:', username.lastName + username.firstName);
    setUser({
      id: undefined,
      firstName: username.firstName,
      lastName: username.lastName,
      role: role,
    });

    navigation.navigate('Onboarding');
  }

  const TextContent =
    step === 1 ? (
      <TextGroup>
        <Step>1/2</Step>
        <Question>어떤 유형으로 가입할까요?</Question>
      </TextGroup>
    ) : (
      <TextGroup>
        <Step>2/2</Step>
        <Question>
          반가워요{role === 'teacher' && ' 선생님'}, {'\n'}앞으로 어떻게
          불러드릴까요?
        </Question>
        <SubText>
          {role === 'teacher' ? '학생' : '선생님'} 계정과 연결되면 보이게 될
          이름이에요.{'\n'}실명 닉네임을 권장드려요.
        </SubText>
      </TextGroup>
    );

  const InputContent =
    step === 1 ? (
      <SelectGroup>
        <RoleSelectBox
          selected={role === 'teacher'}
          role="teacher"
          onPress={() => handleSelectRole('teacher')}
        />
        <RoleSelectBox
          selected={role === 'student'}
          role="student"
          onPress={() => handleSelectRole('student')}
        />
      </SelectGroup>
    ) : (
      <InputGroup>
        <InputBox
          placeholder="성"
          value={username.lastName}
          onChangeText={text => handleTextChange('lastName', text)}
        />
        <InputBox
          placeholder="이름"
          value={username.firstName}
          onChangeText={text => handleTextChange('firstName', text)}
        />
      </InputGroup>
    );

  const ButtonContent =
    step === 1 ? (
      <ButtonGroup>
        <DefaultButton
          type={role ? 'normal' : 'disable'}
          label="다음"
          onPress={role ? () => setStep(2) : () => {}}
        />
      </ButtonGroup>
    ) : (
      <ButtonGroup>
        <DefaultButton
          type={username.lastName && username.firstName ? 'normal' : 'disable'}
          label="다음"
          onPress={
            username.lastName && username.firstName
              ? () => handleSubmit()
              : () => {}
          }
        />
      </ButtonGroup>
    );

  return (
    <Container>
      {TextContent}

      {InputContent}

      {ButtonContent}
    </Container>
  );
}

const Container = styled.View`
  padding: 40px 20px 80px 20px;
  flex: 1;
`;

const TextGroup = styled.View`
  gap: 8px;
`;

const Step = styled.Text`
  color: ${props => props.theme.color.grey[400]};

  /* Text/M20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 30px */
`;

const Question = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB22 */
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 33px; /* 33px */
`;

const SubText = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/R14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 21px */
`;

const SelectGroup = styled.View`
  flex: 1;
  margin-top: 73px;
  gap: 12px;
`;

const InputGroup = styled.View`
  flex: 1;
  margin-top: 40px;
  gap: 8px;
`;

const ButtonGroup = styled.View``;