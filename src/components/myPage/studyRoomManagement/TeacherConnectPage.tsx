import React, {useState, useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  Keyboard,
} from 'react-native';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import Button from '../../common/Button';
import {SimpleSheet, useSimpleSheet} from 'react-native-simple-sheet';

export default function TeacherConnectPage() {
  const navigation = useNavigation();
  const sheet = useSimpleSheet();
  const [focusedIndex, setFocusedIndex] = useState<number>();
  const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(''));

  const inputRefs = useRef<(TextInput | null)[]>([]);

  const HelpContent = (
    <HelpContainer>
      <HelpTitle>튜링 학생 계정 이용 안내</HelpTitle>
      <HelpBody>
        튜링 학생 계정 활성화를 위해서는 과외 선생님이 먼저 튜링에 수업 등록을
        해주셔야 해요!{'\n'}
        과외 선생님에게 [마이페이지&gt;과외수업 추가하기&gt;학생계정연결&gt;코드
        공유를 요청해주세요.
      </HelpBody>
    </HelpContainer>
  );

  const handleOpenBottomSheet = () => {
    sheet.open(props => <SimpleSheet {...props}>{HelpContent}</SimpleSheet>);
  };

  const handleSubmit = () => {
    const code = inputValues.join('');
    navigation.navigate('TeacherConnectInfo', {code});
  };

  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.slice(0, 1); // 한 글자만 남기고 잘라냅니다.
    }

    setInputValues(prev => {
      const newValues = [...prev];
      newValues[index] = text;
      return newValues;
    });

    if (text && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0) {
      if (index === 5 && inputValues[index]) {
        inputRefs.current[index]?.clear();
        return;
      }

      if (!inputValues[index]) {
        inputRefs.current[index - 1]?.clear();
      }
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
        <Container>
          <FormContainer>
            <BubbleContainer>
              <Bubble>
                <BubbleText>공유 받은 선생님 코드를 입력해주세요.</BubbleText>
              </Bubble>
              <TriangleView />
            </BubbleContainer>

            <NumberForm>
              {[0, 1, 2, 3, 4, 5].map((_, index) => (
                <Number
                  key={index}
                  ref={ref => (inputRefs.current[index] = ref)}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={inputValues[index]}
                  onChangeText={text => handleChangeText(text, index)}
                  onKeyPress={event => handleKeyPress(event, index)}
                  onFocus={() => setFocusedIndex(index)}
                  $isFocused={index === focusedIndex}
                />
              ))}
            </NumberForm>
          </FormContainer>

          <Footer>
            <Pressable onPress={handleOpenBottomSheet}>
              <Helper>도움말</Helper>
            </Pressable>
            <Button
              label="완료"
              onPress={handleSubmit}
              disabled={inputValues.includes('')}
            />
          </Footer>
        </Container>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.BG100};
  padding: 20px 20px 136px 20px;
`;

const Helper = styled.Text`
  color: ${props => props.theme.color.grey[500]};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 18px */
  text-decoration-line: underline;
  text-align: center;
`;

const HelpContainer = styled.View`
  padding: 40px 30px;
  gap: 8px;
`;

const HelpTitle = styled.Text`
  color: ${props => props.theme.color.BTN900};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 30px */
`;

const HelpBody = styled.Text`
  color: ${props => props.theme.color.grey[800]};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 21px */
`;

const BubbleContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const Bubble = styled.View`
  align-self: flex-start;
  padding: 12px 16px;
  border-radius: 50px;
  background-color: ${props => props.theme.color.blue[800]};
`;

const BubbleText = styled.Text`
  color: ${props => props.theme.color.grey[100]};
  text-align: center;

  /* Text/SB16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 24px */
`;

const TriangleView = styled.View`
  width: 0;
  height: 0;
  border-left-width: 7px;
  border-right-width: 7px;
  border-top-width: 12px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: #287eff;
`;

const Footer = styled.View`
  gap: 24px;
`;

const FormContainer = styled.View`
  margin-top: 110px;
  flex: 1;
  align-items: center;
`;

const Number = styled.TextInput<{$isFocused: boolean}>`
  padding: 8px 12px;
  width: 44px;
  height: 52px;
  border-radius: 5px;
  background-color: ${props => props.theme.color.grey[100]};
  border-width: ${props => (props.$isFocused ? '1.4px' : '0')};
  border-color: ${props => props.theme.color.blue[800]};

  color: ${props => props.theme.color.BTN900};
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
`;

const NumberForm = styled.View`
  margin-top: 23px;
  flex-direction: row;
  gap: 6px;
`;
