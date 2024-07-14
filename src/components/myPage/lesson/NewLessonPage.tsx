import React, {useState, useRef, useCallback, useMemo} from 'react';
import styled from '@emotion/native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import DefaultButton from '../../buttons/DefaultButton';
import InputText from '../../common/InputText';
import {Button, Text, View} from 'react-native';

const snapPoints = ['25%', '50%'];

export default function NewLessonPage() {
  const [studentProfile, setStudentProfile] = useState({
    firstName: '',
    lastName: '',
    grade: '',
    schoolName: '',
  });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
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

  return (
    <Container>
      <FormContainer>
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
          <Button onPress={handlePresentModalPress} title="Present Modal" />

          <BottomSheetModalProvider>
            <BottomSheetContainer>
              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                <ContentContainer>
                  <Text>Awesome</Text>
                </ContentContainer>
              </BottomSheetModal>
            </BottomSheetContainer>
          </BottomSheetModalProvider>
        </Section>
      </FormContainer>

      <DefaultButton type="normal" label="다음" />
    </Container>
  );
}

const BottomSheetContainer = styled.View`
  flex: 1;
  padding: 24px;
  justify-content: center;
  /* background-color: grey; */
`;

const ContentContainer = styled.View`
  flex: 1;
  background-color: red;
  align-items: center;
`;

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
