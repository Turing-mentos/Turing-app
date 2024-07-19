import React, {useState} from 'react';
import styled from '@emotion/native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import DefaultButton from '../../buttons/DefaultButton';

import NewLessonStepOne from './NewLessonStepOne';
import NewLessonStepTwo from './NewLessonStepTwo';

export default function NewLessonPage() {
  const [step, setStep] = useState(0);
  const [studentProfile, setStudentProfile] = useState({
    firstName: '',
    lastName: '',
    grade: '',
    schoolName: '',
    subject: '',
  });

  const canGoNext =
    studentProfile.firstName &&
    studentProfile.lastName &&
    studentProfile.grade &&
    studentProfile.schoolName;

  const goNext = () => {
    if (canGoNext) {
      setStep(1);
    }
  };

  function handleTextChange(
    identifier: keyof typeof studentProfile,
    value: string,
  ) {
    setStudentProfile(prev => ({
      ...prev,
      [identifier]: value,
    }));
  }

  return (
    <BottomSheetModalProvider>
      <Container>
        <FormContainer>
          {step === 0 && (
            <NewLessonStepOne
              studentProfile={studentProfile}
              handleTextChange={handleTextChange}
            />
          )}

          {step === 1 && (
            <NewLessonStepTwo
              studentProfile={studentProfile}
              handleTextChange={handleTextChange}
            />
          )}
        </FormContainer>

        <ButtonContainer>
          <DefaultButton
            type={canGoNext ? 'normal' : 'disable'}
            label="다음"
            onPress={goNext}
          />
        </ButtonContainer>
      </Container>
    </BottomSheetModalProvider>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
  padding: 20px 20px 80px 20px;
`;

const FormContainer = styled.ScrollView`
  flex: 1;
`;

const ButtonContainer = styled.View``;
