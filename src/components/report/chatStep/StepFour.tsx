import React, {useEffect, useContext} from 'react';

import {AppIcon, ChatBox, MyChatBox, Text, MyText} from '../ChatComponents';
import {ReportContext} from '../ReportPage';
import OptionScrollSelector from '../OptionScrollSelector';

export default function StepFour() {
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
      message: '칭찬 많이 해주세요',
      onPress: () => {
        handleAddInputValue('칭찬 많이 해주세요. ');
      },
    },
    {
      message: '숙제 지도 부탁드려요',
      onPress: () => {
        handleAddInputValue('숙제 지도 부탁드려요. ');
      },
    },
    {
      message: '응원과 격려 부탁드려요',
      onPress: () => {
        handleAddInputValue('응원과 격려 부탁드려요. ');
      },
    },
  ];

  useEffect(() => {
    if (chatSteps[3] === 0) {
      // 학생 당부의 말
      setInputDisabled(false);
    } else if (chatSteps[3] === 1) {
      // 입력한 거나오기
      handleNextChatStep(3, 2);
      handleNextReportStep();
    }
  }, [
    chatSteps,
    scrollDown,
    setInputDisabled,
    handleNextChatStep,
    handleNextReportStep,
  ]);

  return (
    <>
      {chatSteps[3] >= 0 && (
        <>
          <AppIcon />

          <ChatBox>
            <Text>
              {selectedStudent?.firstName} 학생의 학부모님께 전할{'\n'}
              당부의 말씀을 적어주세요.
            </Text>
          </ChatBox>

          <OptionScrollSelector
            title="지난 회차 리뷰에 이런 내용을 넣어보세요."
            options={options}
          />
        </>
      )}

      {chatSteps[3] >= 1 && (
        <>
          <MyChatBox>
            <MyText>{reportRequest.request}</MyText>
          </MyChatBox>
        </>
      )}
    </>
  );
}
