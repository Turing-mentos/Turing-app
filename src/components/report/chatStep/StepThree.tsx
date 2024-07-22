import React, {useState, useEffect, useContext} from 'react';
import styled from '@emotion/native';

import {AppIcon, ChatBox, MyChatBox, Text, MyText} from '../ChatComponents';
import {ReportContext} from '../ReportPage';

const ConditionItem = ({
  index,
  selected,
  onPress,
}: {
  index: number;
  selected: boolean;
  onPress: () => any;
}) => {
  const indexConvert = ['A', 'B', 'C', 'D', 'E'];
  const textConvert = ['매우 부족', '부족', '보통', '좋음', '매우 좋음'];

  const images: {[key: string]: any} = {
    A: require('../../../../assets/images/report/reportA.png'),
    B: require('../../../../assets/images/report/reportB.png'),
    C: require('../../../../assets/images/report/reportC.png'),
    D: require('../../../../assets/images/report/reportD.png'),
    E: require('../../../../assets/images/report/reportE.png'),
    A_disabled: require('../../../../assets/images/report/reportA-disabled.png'),
    B_disabled: require('../../../../assets/images/report/reportB-disabled.png'),
    C_disabled: require('../../../../assets/images/report/reportC-disabled.png'),
    D_disabled: require('../../../../assets/images/report/reportD-disabled.png'),
    E_disabled: require('../../../../assets/images/report/reportE-disabled.png'),
  };
  const source = selected
    ? images[indexConvert[index]]
    : images[indexConvert[index] + '_disabled'];

  return (
    <Item onPress={onPress}>
      <IconImage source={source} />
      <ItemText $selected={selected}>{textConvert[index]}</ItemText>
    </Item>
  );
};

export default function StepThree() {
  const {
    selectedStudent,
    scrollDown,
    setInputDisabled,
    reportRequest,
    chatSteps,
    handleNextChatStep,
    handleNextReportStep,
    handleChangeReportRequest,
  } = useContext(ReportContext);

  const [selectedIcon, setSelectedIcon] = useState<number>();

  const handleSelectIcon = (index: number) => {
    if (typeof selectedIcon === 'number') {
      return;
    }
    setSelectedIcon(index);

    const attitude: {[key: number]: string} = {
      0: '수업 태도 매우 부족.',
      1: '수업 태도 부족.',
      2: '수업 태도 보통.',
      3: '수업 태도 좋음.',
      4: '수업 태도 매우 좋음.',
    };

    handleChangeReportRequest('attitude', attitude[index]);
    handleNextChatStep(2, 2);
  };

  useEffect(() => {
    if (chatSteps[2] === 0) {
      // 학생의 수업태도는 어땠나요?
      handleNextChatStep(2, 1);
    } else if (chatSteps[2] === 1) {
      // 아이콘들 나오기
    } else if (chatSteps[2] === 2) {
      // 다음 스텝 이동
      handleNextChatStep(2, 3);
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
      {chatSteps[2] >= 0 && (
        <>
          <AppIcon />

          <ChatBox>
            <Text>
              {selectedStudent?.firstName} 학생의 수업 태도는 어땠나요?{'\n'}
              적극성, 성실성, 집중도를 떠올려보세요.
            </Text>
          </ChatBox>
        </>
      )}

      {chatSteps[2] >= 1 && (
        <>
          <ChatBox>
            <ItemList>
              {[0, 1, 2, 3, 4].map(v => (
                <ConditionItem
                  key={v}
                  index={v}
                  onPress={() => handleSelectIcon(v)}
                  selected={selectedIcon === v}
                />
              ))}
            </ItemList>
          </ChatBox>
        </>
      )}

      {chatSteps[2] >= 2 && (
        <>
          <MyChatBox>
            <MyText>{reportRequest.attitude}</MyText>
          </MyChatBox>
        </>
      )}
    </>
  );
}

const ItemList = styled.View`
  flex-direction: row;
  gap: 16px;
`;

const Item = styled.Pressable`
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const ItemText = styled.Text<{$selected: boolean}>`
  color: ${props =>
    props.$selected ? props.theme.color.BTN900 : props.theme.color.grey[600]};
  text-align: center;

  /* Text/M12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 18px */
`;

const IconImage = styled.Image`
  width: 50px;
  height: 40px;
`;
