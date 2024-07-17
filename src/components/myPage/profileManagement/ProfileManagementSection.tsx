import React from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import useUserStore from '../../../store/useUserStore';

export default function ProfileManagementSection() {
  const navigation = useNavigation();
  const user = useUserStore(state => state.user);
  const {firstName, lastName, role} = user;
  const username = lastName + firstName;
  const roleKr = role === 'teacher' ? '선생님' : '학생';

  return (
    <Container onPress={() => navigation.navigate('ProfileManagement')}>
      <Title>{`${username} ${roleKr}`}</Title>
      <SubTitle>프로필 관리</SubTitle>
    </Container>
  );
}

const Container = styled.Pressable`
  padding: 12px 20px;
  background-color: ${props => props.theme.color.grey[100]};
  gap: 4px;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 30px */
`;

const SubTitle = styled.Text`
  color: ${props => props.theme.color.grey[500]};

  /* Text/M16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;
