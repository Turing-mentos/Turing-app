import React from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import useUserStore from '../../../store/useUserStore';
import InfoBox from '../../common/InfoBox';

export default function ProfileManagementPage() {
  const navigation = useNavigation();
  const {firstName, lastName, university, department, studentNum, role} =
    useUserStore(store => store.user);
  const roleKr = role === 'teacher' ? '선생님' : '학생';

  const nickname = lastName + firstName;

  return (
    <Container>
      <Section>
        <Title>{roleKr} 닉네임</Title>
        <NicknameBox>
          <Nickname>{nickname}</Nickname>
        </NicknameBox>
      </Section>

      {role === 'teacher' && (
        <Section>
          <Title>정보</Title>
          <InfoBox label="대학교" content={university} />
          <InfoBox label="학과" content={department} />
          <InfoBox label="학번" content={studentNum} />
        </Section>
      )}

      <Line />

      <ButtonGroup>
        <UpdateButton
          onPress={() => navigation.navigate('ProfileManagementUpdate')}>
          <UpdateButtonText>편집하기</UpdateButtonText>
        </UpdateButton>
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
`;

const Section = styled.View`
  margin-top: 24px;
  padding: 0 20px;
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

const NicknameBox = styled.View`
  padding: 12px 16px;

  border: 1px solid ${props => props.theme.color.grey[200]};
  border-radius: 5px;
  background-color: ${props => props.theme.color.grey[150]};
`;

const Nickname = styled.Text`
  color: var(--Main-BTN900, #192239);
  color: ${props => props.theme.color.BTN900};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;

const Line = styled.View`
  margin-top: 32px;
  height: 2px;
  background-color: ${props => props.theme.color.grey[150]};
`;

const ButtonGroup = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 20px;
`;

const UpdateButton = styled.Pressable`
  width: 89px;
  padding: 8px 20px;

  border-radius: 50px;
  background-color: ${props => props.theme.color.grey[150]};
`;

const UpdateButtonText = styled.Text`
  color: var(--Greyscale-600, #7b8297);
  color: ${props => props.theme.color.grey[600]};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;
