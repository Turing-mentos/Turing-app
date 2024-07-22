import React from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import Icon from '../../common/icons/SvgIcon';
import Button from '../../common/Button';
import {StudyRoomAPI} from '../../../api/studyRoom';

interface DeleteStudyRoomModalContentProps {
  studyRoomId: number;
  close: (...args: any[]) => any;
}

export default function DisconnectStudyRoomModalContent({
  studyRoomId,
  close,
}: DeleteStudyRoomModalContentProps) {
  const navigation = useNavigation();

  const handleCancel = () => {
    close();
  };

  const handleDisconnectStudyRoom = async () => {
    try {
      await StudyRoomAPI.disconnectStudyRoom(studyRoomId);
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
          <Title>학생과 연결을 끊을까요?</Title>
          <SubTitle>
            <Span>일부 기능이 제한 될 수 있어요.</Span>
            {'\n'}
            해당 학생의 알림을 더이상 받고 싶지 않다면 {'\n'}
            계정 연결을 끊을 수 있어요.
          </SubTitle>
        </TextGroup>
      </Body>

      <Buttons>
        <Button label="연결 끊기" onPress={handleDisconnectStudyRoom} sub />
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
