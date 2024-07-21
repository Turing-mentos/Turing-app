import React, {useEffect, useContext} from 'react';

import {AppIcon, ChatBox, MyChatBox, Text, MyText} from '../ChatComponents';
import {ReportContext} from '../ReportPage';
import OptionScrollSelector from '../OptionScrollSelector';

export default function StepTwo() {
  const {
    handleAddInputValue,
    selectedStudent,
    scrollDown,
    setInputDisabled,
    reportRequest,
    chatSteps,
    handleNextChatStep,
    handleNextReportStep,
  } = useContext(ReportContext);

  const options = [
    {
      message: '성적이 상승했어요',
      onPress: () => {
        handleAddInputValue('성적이 상승했어요. ');
      },
    },
    {
      message: '학습 태도가 좋아졌어요',
      onPress: () => {
        handleAddInputValue('학습 태도가 좋아졌어요. ');
      },
    },
    {
      message: '질문을 적극적으로 했어요',
      onPress: () => {
        handleAddInputValue('질문을 적극적으로 했어요. ');
      },
    },
  ];

  useEffect(() => {
    if (chatSteps[1] === 0) {
      // 지난 ~회차 동안의 변화 키워드 작성
      setInputDisabled(false);
    } else if (chatSteps[1] === 1) {
      // 유저 입력한 내용
      handleNextChatStep(1, 2);
    } else if (chatSteps[1] === 2) {
      // 다음 스텝 이동
      handleNextChatStep(1, 3);
      handleNextReportStep();
    }
  }, [
    chatSteps,
    scrollDown,
    setInputDisabled,
    handleNextReportStep,
    handleNextChatStep,
  ]);

  return (
    <>
      {chatSteps[1] >= 0 && (
        <>
          <AppIcon />

          <ChatBox>
            <Text>
              지난 {selectedStudent?.currentSession}회차 동안{' '}
              {selectedStudent?.firstName} 학생의 수업은{'\n'}어떤 변화가
              있었나요?
              {'\n'}자유롭게 키워드를 적어주세요
            </Text>
          </ChatBox>

          <OptionScrollSelector
            title="지난 회차 리뷰에 이런 내용을 넣어보세요."
            options={options}
          />
        </>
      )}

      {chatSteps[1] >= 1 && (
        <>
          <MyChatBox>
            <MyText>{reportRequest.comment}</MyText>
          </MyChatBox>
        </>
      )}
    </>
  );
}
