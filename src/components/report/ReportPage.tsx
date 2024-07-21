import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styled from '@emotion/native';

import ProgressBar from '../progressbar/ProgressBar';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

export default function ReportPage() {
  const [step, setStep] = useState(0);

  return (
    <Container>
      <ProgressStatus>
        <ProgressBar currentCredit={step} maxNum={5} />
        <ProgressBarText>{(step / 5) * 100}%</ProgressBarText>
      </ProgressStatus>

      <ScrollContainer>
        <ChattingWindow>
          <StepOne />
          <StepTwo />
        </ChattingWindow>
      </ScrollContainer>

      <ChatInputContainer>
        <Text>Teset</Text>
      </ChatInputContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.BG100};
`;

const ProgressStatus = styled.View`
  padding: 0 20px;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const ProgressBarText = styled.Text`
  color: ${props => props.theme.color.grey[700]};

  /* Text/SB12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 18px */
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px 20px 40px 20px;
`;

const ChattingWindow = styled.View`
  gap: 12px;
`;

const ChatInputContainer = styled.View`
  padding: 8px 19px;
  background-color: ${props => props.theme.color.grey[100]};
`;
