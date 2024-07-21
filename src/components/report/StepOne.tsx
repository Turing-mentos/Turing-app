import React, {useState} from 'react';
import styled from '@emotion/native';
import {AppIcon, ChatBox, MyChatBox, Text, MyText} from './ChatComponents';

export default function StepOne() {
  const [inProcess, setInProcess] = useState(false);

  const handleStartProcess = () => {
    setInProcess(true);
  };

  return (
    <>
      <AppIcon />

      <ChatBox>
        <Text>안녕하세요. 튜링입니다.</Text>
      </ChatBox>

      <ChatBox>
        <Text>
          저에게 몇 가지 정보를 주시면,{'\n'}
          학부모님께 전달 드릴 수 있는 {'\n'}
          학생 리포트를 생성해드려요!
        </Text>

        <ProcessStart onPress={handleStartProcess}>
          <ProcessStartText>리포트 생성 시작하기</ProcessStartText>
        </ProcessStart>
      </ChatBox>

      {inProcess && (
        <>
          <MyChatBox>
            <MyText>리포트 생성 시작할래요</MyText>
          </MyChatBox>

          <AppIcon />
          <ChatBox>
            <Text>어떤 학생의 리포트를 만들까요?</Text>
          </ChatBox>

          <MyChatBox>
            <MyText>박민영(영어) 학생의 리포트 만들기</MyText>
          </MyChatBox>
        </>
      )}
    </>
  );
}

const ProcessStart = styled.TouchableOpacity`
  padding: 12px 27px;
  border-radius: 5px;
  background-color: ${props => props.theme.color.BTN900};
`;

const ProcessStartText = styled.Text`
  color: ${props => props.theme.color.grey[100]};

  /* Text/SB16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 24px */
`;
