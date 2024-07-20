import React from 'react';
import styled from '@emotion/native';
import InputText from '../../common/InputText';
import InputBox from '../../common/InputBox';
import SelectBox from '../../common/SelectBox';

interface NewLessonStepOneProps {
  studentProfile: any;
  handleChangeProfile: (identifier: any, value: any) => any;
}

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

export default function NewLessonStepOne({
  studentProfile,
  handleChangeProfile,
}: NewLessonStepOneProps) {
  return (
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
          onChangeText={value => handleChangeProfile('lastName', value)}
        />
        <InputText
          placeholder="이름"
          value={studentProfile.firstName}
          onChangeText={value => handleChangeProfile('firstName', value)}
        />
      </Section>

      <Section>
        <SubTitle>기본 정보</SubTitle>

        <SelectBox
          label="학년"
          title="학년 선택"
          placeholder="학년 선택"
          selectOptions={grades}
          value={studentProfile.grade}
          onSelect={value => handleChangeProfile('grade', value)}
        />
        <InputBox
          label="학교명"
          placeholder="ex. 튜링고, 튜링중"
          onChangeText={value => handleChangeProfile('schoolName', value)}
          value={studentProfile.schoolName}
        />
      </Section>
    </>
  );
}

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
