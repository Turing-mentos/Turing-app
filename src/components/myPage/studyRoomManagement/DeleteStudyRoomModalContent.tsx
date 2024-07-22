import React from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import Icon from '../../common/icons/SvgIcon';
import Button from '../../common/Button';
import {StudyRoomAPI} from '../../../api/studyRoom';

interface DeleteStudyRoomModalContentProps {
  name: string;
  subject: string;
  studyRoomId: number;
  close: (...args: any[]) => any;
}

export default function DeleteStudyRoomModalContent({
  name,
  subject,
  studyRoomId,
  close,
}: DeleteStudyRoomModalContentProps) {
  const navigation = useNavigation();

  const handleCancel = () => {
    close();
  };

  const handleDeleteStudyRoom = async () => {
    try {
      await StudyRoomAPI.deleteStudyRoom(studyRoomId);
      navigation.navigate('MyPage', {key: Math.random()});
    } catch (err) {
      console.log('handle delete study room error:', err);
    } finally {
      close();
    }
  };

  return (
    <>
      <Body>
        <Icon name="WarningInformation" />

        <TextGroup>
          <Title>정말로 수업을 삭제할까요?</Title>
          <SubTitle>
            <Span>
              {name}({subject})
            </Span>{' '}
            수업이 종료되셨나요?{'\n'}
            수업을 삭제하면 기존 데이터를 복구할 수 없어요.{'\n'}
            과외 수업을 종료하는 경우에만 삭제해주세요.
          </SubTitle>
        </TextGroup>
      </Body>

      <Buttons>
        <Button label="삭제하기" onPress={handleDeleteStudyRoom} sub />
        <Button label="취소하기" onPress={handleCancel} />
      </Buttons>
    </>
  );
}

const Body = styled.View`
  gap: 12px;
  margin-bottom: 20px;

  justify-content: center;
  align-items: center;
`;

const TextGroup = styled.View`
  gap: 8px;
`;

const Title = styled.Text`
  color: var(--Main-BTN900, #192239);
  color: ${props => props.theme.color.BTN900};
  text-align: center;

  /* Text/SB22 */
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 33px; /* 33px */
`;

const SubTitle = styled.Text`
  text-align: center;
  color: ${props => props.theme.color.BTN900};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const Span = styled.Text`
  font-weight: 700;
`;

const Buttons = styled.View`
  flex-direction: row;
  gap: 12px;
`;
