import React from 'react';

import {AppIcon, ChatBox, MyChatBox, Text, MyText} from './ChatComponents';

export default function StepTwo() {
  return (
    <>
      <AppIcon />

      <ChatBox>
        <Text>
          지난 8회차 동안 민영 학생의 수업은{'\n'}
          어떤 변화가 있었나요?{'\n'}
          자유롭게 키워드를 적어주세요.
        </Text>
      </ChatBox>
    </>
  );
}
