import {ScrollView} from 'react-native';
import React, {
  useState,
  useRef,
  createContext,
  useCallback,
  useEffect,
} from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

import KeyboardAvoid from '../common/KeyboardAvoid';

import ProgressBar from '../progressbar/ProgressBar';
import ReportInput from './ReportInput';
import StepOne from './chatStep/StepOne';
import StepTwo from './chatStep/StepTwo';
import StepThree from './chatStep/StepThree';
import StepFour from './chatStep/StepFour';
import StepFive from './chatStep/StepFive';
import StepSix from './chatStep/StepSix';

export const ReportContext = createContext({
  handleReset: () => {},
  handleNextReportStep: () => {},
  handleChangeReportRequest: (identifier, data) => {},
  handleAddInputValue: addText => {},
  handleSubmitInputValue: () => {},
  handleSelectStudent: student => {},
  setInputDisabled: boolean => {},
  scrollDown: () => {},

  reportRequest: {
    studentId: 0,
    name: '',
    subject: '',
    comment: '',
    attitude: '',
    request: '',
    pay: false,
  },
  selectedStudent: {
    firstName: '',
    lastName: '',
    subject: '',
    studentId: 0,
    currentSession: 0,
    totalSession: 0,
  },

  chatSteps: [0, 0, 0, 0, 0, 0],
  handleNextChatStep: (chatIndex, target) => {},
});

export default function ReportPage() {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [inputDisabled, setInputDisabled] = useState(true);
  const [chatSteps, setChatSteps] = useState([0, 0, 0, 0, 0, 0]);
  const [reportRequest, setReportRequest] = useState({
    studentId: 0,
    name: '',
    subject: '',
    comment: '',
    attitude: '',
    request: '',
    pay: false,
  });
  const [selectedStudent, setSelectedStudent] = useState({
    firstName: '',
    lastName: '',
    subject: '',
    studentId: 0,
    currentSession: 0,
    totalSession: 0,
  });

  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleReset = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Report'}],
      }),
    );
  }, [navigation]);

  const handleNextChatStep = useCallback(
    (chatIndex: number, target: number) => {
      setTimeout(() => {
        setChatSteps(prev =>
          prev.map((v, idx) => (chatIndex === idx ? target : v)),
        );
      }, 800);
    },
    [],
  );

  const handleSelectStudent = useCallback(student => {
    setSelectedStudent(student);
  }, []);

  const handleNextReportStep = useCallback(() => {
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 800);
  }, []);

  const handleChangeReportRequest = useCallback(
    (identifier: keyof typeof reportRequest, data: any) => {
      setReportRequest(prev => ({
        ...prev,
        [identifier]: data,
      }));
    },
    [],
  );

  const handleAddInputValue = useCallback(
    (addText: string) => {
      if (!inputDisabled) {
        setInputValue(prev => prev + addText);
      }
    },
    [inputDisabled],
  );

  const handleSubmitInputValue = useCallback(() => {
    if (step === 1) {
      handleChangeReportRequest('comment', inputValue);
      handleNextChatStep(1, 1);
    }

    if (step === 3) {
      handleChangeReportRequest('request', inputValue);
      handleNextChatStep(3, 1);
    }

    setInputValue('');
    setInputDisabled(true);
  }, [handleChangeReportRequest, inputValue, step, handleNextChatStep]);

  const handleChangeText = useCallback((text: string) => {
    setInputValue(text);
  }, []);

  const scrollDown = useCallback(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, []);

  useEffect(() => {
    scrollDown();
  }, [chatSteps, step, scrollDown]);

  return (
    <ReportContext.Provider
      value={{
        handleNextReportStep,
        handleChangeReportRequest,
        handleAddInputValue,
        handleSubmitInputValue,
        setInputDisabled,
        scrollDown,
        handleSelectStudent,
        selectedStudent,
        reportRequest,
        chatSteps,
        handleNextChatStep,
        handleReset,
      }}>
      <Container>
        <ProgressStatus>
          <ProgressBar currentCredit={step} maxNum={5} />
          <ProgressBarText>{(step / 5) * 100}%</ProgressBarText>
        </ProgressStatus>

        <KeyboardAvoid>
          <ScrollContainer ref={scrollViewRef}>
            <ChattingWindow>
              {step >= 0 && <StepOne />}
              {step >= 1 && <StepTwo />}
              {step >= 2 && <StepThree />}
              {step >= 3 && <StepFour />}
              {step >= 4 && <StepFive />}
              {step >= 5 && <StepSix />}
            </ChattingWindow>
          </ScrollContainer>

          <ChatInputContainer>
            <ReportInput
              value={inputValue}
              disabled={inputDisabled}
              onChangeText={text => handleChangeText(text)}
              onSubmitEditing={handleSubmitInputValue}
            />
          </ChatInputContainer>
        </KeyboardAvoid>
      </Container>
    </ReportContext.Provider>
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
  padding-bottom: 40px;
`;

const ChatInputContainer = styled.View`
  padding: 8px 19px;
  background-color: ${props => props.theme.color.grey[100]};
`;
