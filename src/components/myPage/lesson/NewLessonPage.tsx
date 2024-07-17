import React, {useState, useRef, useCallback, useMemo} from 'react';
import styled from '@emotion/native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import DefaultButton from '../../buttons/DefaultButton';
import InputText from '../../common/InputText';
import RadioItem from '../../common/RadioItem';
import InputBox from '../../common/InputBox';
import SelectBox from '../../common/SelectBox';
import SelectModal from './SelectModal';

const grades = [
  {key: 0, value: 'N수', label: 'N수'},
  {key: 1, value: '고3', label: '고3'},
  {key: 2, value: '고2', label: '고2'},
  {key: 3, value: '고1', label: '고1'},
  {key: 4, value: '중3', label: '중3'},
  {key: 5, value: '중2', label: '중2'},
  {key: 6, value: '중1', label: '중1'},
  {key: 7, value: '초6', label: '초6'},
  {key: 8, value: '초5', label: '초5'},
  {key: 9, value: '초4', label: '초4'},
  {key: 10, value: '초3', label: '초3'},
  {key: 11, value: '초2', label: '초2'},
  {key: 12, value: '초1', label: '초1'},
];

const subjects = [
  {key: 0, value: '국어', label: '국어'},
  {key: 1, value: '영어', label: '영어'},
  {key: 2, value: '수학', label: '수학'},
  {key: 3, value: '사회탐구', label: '사회탐구'},
  {key: 4, value: '과학탐구', label: '과학탐구'},
  {key: 5, value: '논술', label: '논술'},
];

export default function NewLessonPage() {
  const [step, setStep] = useState(0);
  const [studentProfile, setStudentProfile] = useState({
    firstName: '',
    lastName: '',
    grade: '',
    schoolName: '',
    subject: '',
  });
  const gradeModalRef = useRef<BottomSheetModal>(null);
  const handleGradeModalPress = useCallback(() => {
    gradeModalRef.current?.present();
  }, []);

  const subjectModalRef = useRef<BottomSheetModal>(null);
  const handleSubjectModalPress = useCallback(() => {
    subjectModalRef.current?.present();
  }, []);

  function handleTextChange(
    identifier: keyof typeof studentProfile,
    value: string,
  ) {
    setStudentProfile(prev => ({
      ...prev,
      [identifier]: value,
    }));
  }

  function handleSubmit() {
    if (step === 0) {
      setStep(1);
    } else {
      console.log('submit!');
    }
  }

  return (
    <BottomSheetModalProvider>
      <Container>
        <FormContainer>
          {step === 0 && (
            <>
              <TitleContainer>
                <Title>학생 프로필</Title>
                <TitleStep>(1/2)</TitleStep>
              </TitleContainer>

              <Section>
                <SubTitle>학생명</SubTitle>

                <InputText
                  placeholder="성"
                  value={studentProfile.lastName}
                  onChangeText={value => handleTextChange('lastName', value)}
                />
                <InputText
                  placeholder="이름"
                  value={studentProfile.firstName}
                  onChangeText={value => handleTextChange('firstName', value)}
                />
              </Section>

              <Section>
                <SubTitle>기본 정보</SubTitle>

                <SelectBox
                  label="학년"
                  placeholder="학년 선택"
                  onPress={handleGradeModalPress}
                  value={studentProfile.grade}
                />
                <InputBox
                  label="학교명"
                  placeholder="ex. 튜링고, 튜링중"
                  onChangeText={value => handleTextChange('schoolName', value)}
                  value={studentProfile.schoolName}
                />
              </Section>
            </>
          )}

          {step === 1 && (
            <>
              <TitleContainer>
                <Title>과외 정보</Title>
                <TitleStep>(2/2)</TitleStep>
              </TitleContainer>
              
              <SelectBox
                label="과목"
                placeholder="과목 선택"
                onPress={handleSubjectModalPress}
                value={studentProfile.subject}
              />
            </>
          )}
        </FormContainer>

        <DefaultButton type="normal" label="다음" onPress={handleSubmit} />

        <SelectModal
          ref={gradeModalRef}
          onSelect={value =>
            setStudentProfile(prev => ({...prev, grade: value}))
          }
          selectOptions={grades}
        />
        <SelectModal
          ref={subjectModalRef}
          onSelect={value =>
            setStudentProfile(prev => ({...prev, subject: value}))
          }
          selectOptions={subjects}
        />
      </Container>
    </BottomSheetModalProvider>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
  padding: 20px 20px 80px 20px;
`;

const FormContainer = styled.View`
  flex: 1;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;

const TitleStep = styled.Text`
  color: ${props => props.theme.color.grey[400]};

  /* Text/M18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px;
`;

const SubTitle = styled.Text`
  color: ${props => props.theme.color.grey[600]};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;

const Section = styled.View`
  margin-top: 24px;
  gap: 8px;
`;

const Label = styled.Text`
  color: var(--Main-BTN900, #192239);
  color: ${props => props.theme.color.BTN900};

  /* Text/R14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 21px */
`;
