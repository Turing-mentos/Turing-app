import React, {useEffect, useContext, useState} from 'react';
import styled from '@emotion/native';

import {AppIcon, ChatBox, MyChatBox, Text, MyText} from '../ChatComponents';
import {ReportContext} from '../ReportPage';

const SelectButton = ({
  selected,
  index,
  onPress,
}: {
  selected: boolean;
  index: number;
  onPress: () => any;
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const text = ['네', '아니오'];

  return (
    <SelectButtonContainer
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      $pressed={isPressed}
      $selected={selected}>
      <SelectButtonText $pressed={isPressed}>{text[index]}</SelectButtonText>
    </SelectButtonContainer>
  );
};

export default function StepFive() {
  const {
    scrollDown,
    setInputDisabled,
    chatSteps,
    handleNextChatStep,
    handleNextReportStep,
    handleChangeReportRequest,
  } = useContext(ReportContext);

  const [selectedButton, setSelectedButton] = useState<number>();

  const handleSelectButton = (index: number) => {
    if (typeof selectedButton === 'number') {
      return;
    }
    setSelectedButton(index);
    handleNextChatStep(4, 1);
    handleChangeReportRequest('pay', index === 0 ? true : false);
  };

  useEffect(() => {
    if (chatSteps[4] === 0) {
      // 과외비 요청 문구 포함?
    } else if (chatSteps[4] === 1) {
      // 입력한 거나오기
      handleNextChatStep(4, 2);
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
      {chatSteps[4] >= 0 && (
        <>
          <AppIcon />

          <ChatBox>
            <Text>과외비 정산 요청 문구를 포함할까요?</Text>

            <Buttons>
              <SelectButton
                index={0}
                selected={selectedButton === 0}
                onPress={() => handleSelectButton(0)}
              />
              <SelectButton
                index={1}
                selected={selectedButton === 1}
                onPress={() => handleSelectButton(1)}
              />
            </Buttons>
          </ChatBox>
        </>
      )}

      {chatSteps[4] >= 1 && (
        <>
          <MyChatBox>
            <MyText>
              {selectedButton === 0
                ? '과외비 정산 요청할래요.'
                : '과외뵈 정산 요청 안할래요.'}
            </MyText>
          </MyChatBox>
        </>
      )}
    </>
  );
}

const Buttons = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const SelectButtonContainer = styled.Pressable<{
  $pressed: boolean;
  $selected: boolean;
}>`
  flex: 1;
  padding: 12px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;

  background-color: ${props => {
    if (props.$selected) {
      return props.theme.color.blue[200];
    }
    if (props.$pressed) {
      return props.theme.color.grey[200];
    }
    return props.theme.color.grey[150];
  }};
`;

const SelectButtonText = styled.Text<{$pressed: boolean}>`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`;
