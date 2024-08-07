import {Image} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import LinkStatus from './LinkStatus';
import {Role} from '../../../store/useUserStore';

interface LessonProps {
  studyRoomId: number;
  name: string;
  subject: string;
  linkStatus: boolean;
  role: Role;
}

export default function Lesson({
  studyRoomId,
  name,
  subject,
  linkStatus,
  role,
}: LessonProps) {
  const navigation = useNavigation();
  const title =
    role === 'teacher' ? `${name} | ${subject}` : `${subject} | ${name}T`;

  return (
    <LinkBox
      onPress={() => {
        navigation.navigate('StudyRoomManagement', {
          studyRoomId,
          linkStatus,
          name,
          subject,
        });
      }}>
      <Group>
        <Title>{title}</Title>
        <LinkStatus status={linkStatus} role={role} />
      </Group>

      <Image
        source={require('../../../../assets/images/arrow_rightward.png')}
      />
    </LinkBox>
  );
}

const LinkBox = styled.Pressable`
  padding: 12px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${props => props.theme.color.grey[200]};
  border-radius: 5px;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 21px */
`;

const Group = styled.View`
  flex-direction: row;
  gap: 8px;
`;
