import React from 'react';
import styled from '@emotion/native';

import {Role} from './SignUp';

interface RoleSelectBoxProps {
  selected: boolean;
  role: Role;
  onPress: (args: any) => any;
}

const convertRole = {
  teacher: '과외 선생님',
  student: '과외 학생',
};

export default function RoleSelectBox({
  selected,
  role,
  onPress,
}: RoleSelectBoxProps) {
  return (
    <Container $selected={selected} onPress={onPress}>
      <ContentGroup>
        <Text $selected={selected}>{convertRole[role]}</Text>
        {role === 'teacher' ? (
          <Icon source={require(`../../../assets/images/signin/teacher.png`)} />
        ) : (
          <Icon source={require(`../../../assets/images/signin/student.png`)} />
        )}
      </ContentGroup>
    </Container>
  );
}

const Container = styled.Pressable<{$selected: boolean}>`
  padding: 8px 20px;
  border-radius: 5px;
  background-color: ${props =>
    props.$selected
      ? props.theme.color.blue[200]
      : props.theme.color.grey[200]};
`;

const ContentGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.Text<{$selected: boolean}>`
  color: ${props =>
    props.$selected
      ? props.theme.color.blue[800]
      : props.theme.color.grey[500]};

  /* Text/SB20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 30px */
`;

const Icon = styled.Image`
  width: 60px;
  height: 60px;
`;
