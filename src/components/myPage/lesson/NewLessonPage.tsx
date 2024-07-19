import React, {useState, useCallback} from 'react';
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
    baseSession: '',
    wage: '',
    studyTimes: [],
    startDate: '',
  });

  const canGoNext = () => {
    if (step === 0) {
      return (
        studentProfile.firstName &&
        studentProfile.lastName &&
        studentProfile.grade &&
        studentProfile.schoolName
      );
    } else if (step === 1) {
      return (
        studentProfile.firstName &&
        studentProfile.lastName &&
        studentProfile.grade &&
        studentProfile.schoolName &&
        studentProfile.subject &&
        studentProfile.baseSession &&
        studentProfile.wage &&
        studentProfile.studyTimes.length > 0 &&
        studentProfile.startDate
      );
    }
  };

  const handleSubmit = () => {
    console.log('student profile:', studentProfile);
  };

  const goNext = () => {
    if (!canGoNext()) {
      return;
    }

    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      handleSubmit();
    }
  };

  const handleChangeProfile = useCallback(
    (identifier: keyof typeof studentProfile, value: any) => {
      setStudentProfile(prev => ({
        ...prev,
        [identifier]: value,
      }));
    },
    [],
  );

  return (
    <BottomSheetModalProvider>
      <Container>
        <FormContainer>
          {step === 0 && (
            <NewLessonStepOne
              studentProfile={studentProfile}
              handleChangeProfile={handleChangeProfile}
            />
          )}

          {step === 1 && (
            <NewLessonStepTwo
              studentProfile={studentProfile}
              handleChangeProfile={handleChangeProfile}
            />
          )}
        </FormContainer>

        <ButtonContainer>
          <DefaultButton
            type={canGoNext() ? 'normal' : 'disable'}
            label={step === 0 ? '다음' : '완료'}
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
