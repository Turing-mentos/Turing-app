import React from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import Lesson from './Lesson';
import useUserStore from '../../../store/useUserStore';

export default function LessonInProgressSection() {
  const navigation = useNavigation();
  const user = useUserStore(state => state.user);
  const buttonText =
    user.role === 'teacher'
      ? '과외 수업 추가하기'
      : '과외 선생님 코드 연결하기';

  return (
    <Container>
      <TitleGroup>
        <Title>진행 중인 과외</Title>
        <Count>0건</Count>
      </TitleGroup>

      <LessonGroup>
        <Lesson name="박민영" subject="영어" linkStatus role={user.role} />
      </LessonGroup>

      <AddButton onPress={() => navigation.navigate('NewLesson')}>
        <AddButtonText>+ &nbsp;&nbsp;{buttonText}</AddButtonText>
      </AddButton>
    </Container>
  );
}

const Container = styled.View`
  background-color: ${props => props.theme.color.grey[100]};
  padding: 12px 20px;
  gap: 12px;
`;

const TitleGroup = styled.View`
  flex-direction: row;
  gap: 4px;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;

const Count = styled.Text`
  color: ${props => props.theme.color.blue[850]};

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;

const LessonGroup = styled.View``;

const AddButton = styled.Pressable`
  padding: 12px 16px;
  border-radius: 5px;
  background-color: ${props => props.theme.color.grey[200]};
`;

const AddButtonText = styled.Text`
  color: ${props => props.theme.color.grey[600]};

  /* Text/SB14 */
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 21px */
`;
