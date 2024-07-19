import React, {useRef, useState, useEffect} from 'react';
import styled from '@emotion/native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {format} from 'date-fns';

import SelectBox from '../../common/SelectBox';
import SelectModal from './SelectModal';
import Accordion from '../../common/Accordion';
import LessonTime from './LessonTime';
import {Button} from 'react-native';
import InputNumber from '../../common/InputNumber';
import DatePickerItem from '../../common/DatePickerItem';

interface NewLessonStepTwoProps {
  studentProfile: any;
  handleChangeProfile: (identifier: any, value: any) => any;
}

interface Time {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

const formatValue = (value: string | undefined) => {
  if (!value) return '';
  const numberValue = parseInt(value.replace(/[^\d]/g, ''), 10);
  if (isNaN(numberValue)) return '';
  return numberValue.toLocaleString('ko-KR') + '원';
};

const subjects = [
  {key: 0, value: '국어', label: '국어'},
  {key: 1, value: '영어', label: '영어'},
  {key: 2, value: '수학', label: '수학'},
  {key: 3, value: '사회탐구', label: '사회탐구'},
  {key: 4, value: '과학탐구', label: '과학탐구'},
  {key: 5, value: '논술', label: '논술'},
];

const dayConvert = ['월', '화', '수', '목', '금', '토', '일'];

const generateInitialDayTimeState = (day: number) => {
  return {
    day,
    startTime: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0,
    },
    endTime: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0,
    },
  };
};

export default function NewLessonStepTwo({
  studentProfile,
  handleChangeProfile,
}: NewLessonStepTwoProps) {
  const subjectModalRef = useRef<BottomSheetModal>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedTime, setSelectedTime] = useState(
    dayConvert.map((_, idx) => generateInitialDayTimeState(idx)),
  );
  const [startDate, setStartDate] = useState(new Date());

  const timeConverter = ({hour, minute}: Time) => {
    const meridiem = hour < 12 ? '오전' : '오후';
    const convertedHour = hour % 12 === 0 ? 12 : hour % 12;
    const convertedMinute = minute < 10 ? '0' + minute : minute;

    return `${meridiem} ${convertedHour}:${convertedMinute}`;
  };

  const subTitle = studentProfile.studyTimes
    .map(v => {
      const {startTime, endTime} = v;

      return `(${dayConvert[v.day]})${timeConverter(
        startTime,
      )} ~ ${timeConverter(endTime)}`;
    })
    .join('\n');

  const daySubTitle = selectedDays.map(v => dayConvert[v]).join(', ');
  const handleSelectDay = (day: number) => {
    setSelectedDays(prev => {
      if (prev.includes(day)) {
        return prev.filter(v => v !== day).sort((a, b) => a - b);
      } else {
        return prev.concat(day).sort((a, b) => a - b);
      }
    });
    setSelectedTime(prev =>
      prev.map(time =>
        time.day === day ? generateInitialDayTimeState(day) : time,
      ),
    );
  };

  const handleChangeTime = (day: number, type: 'startTime' | 'endTime') => {
    return ({hour, minute, second, nano}: Time) => {
      setSelectedTime(prev =>
        prev.map(v => {
          if (v.day === day) {
            return {
              ...v,
              [type]: {hour, minute, second, nano},
            };
          }
          return v;
        }),
      );
    };
  };

  const handleChangeDate = (date: Date) => {
    setStartDate(new Date(date));
  };

  useEffect(() => {
    handleChangeProfile(
      'studyTimes',
      selectedTime.filter(v => selectedDays.includes(v.day)),
    );
  }, [selectedTime, selectedDays, handleChangeProfile]);

  useEffect(() => {
    handleChangeProfile('startDate', format(startDate, 'yyyy-MM-dd'));
  }, [startDate, handleChangeProfile]);

  return (
    <>
      <TitleContainer>
        <Title>과외 정보</Title>
        <TitleStep>(2/2)</TitleStep>
      </TitleContainer>

      <Group>
        <SelectBox
          label="과목"
          title="과목 선택"
          placeholder="과목 선택"
          selectOptions={subjects}
          value={studentProfile.subject}
          onSelect={value => handleChangeProfile('subject', value)}
        />
      </Group>

      <Line />

      <Group>
        <SubTitle>수업 일정</SubTitle>
        <Accordion title="요일" subTitle={daySubTitle}>
          <DayContainer>
            {dayConvert.map((v, idx) => {
              const isSelected = selectedDays.includes(idx);

              return (
                <DayItem
                  key={v}
                  $isSelected={isSelected}
                  onPress={() => handleSelectDay(idx)}>
                  <DayText $isSelected={isSelected}>{v}</DayText>
                </DayItem>
              );
            })}
          </DayContainer>
        </Accordion>

        <Accordion
          title="시간"
          subTitle={subTitle}
          disabled={selectedDays.length === 0}
          disableMessage="요일을 선택해주세요!">
          {selectedDays.map(selectedDay => (
            <LessonTime
              key={selectedDay}
              day={selectedDay}
              handleChangeStartTime={handleChangeTime(selectedDay, 'startTime')}
              handleChangeEndTime={handleChangeTime(selectedDay, 'endTime')}
            />
          ))}
        </Accordion>
      </Group>

      <Line />

      <Group>
        <SubTitle>기준 회차</SubTitle>

        <InputGroup>
          <InputLabel>정산 기준 횟수</InputLabel>
          <InputContainer>
            <InputNumber
              placeholder="8"
              value={studentProfile.baseSession}
              onChangeText={text => handleChangeProfile('baseSession', text)}
            />
          </InputContainer>
        </InputGroup>

        <InputGroup>
          <InputLabel>수업 시작일</InputLabel>
          <InputContainer>
            <DatePickerItem onSelect={handleChangeDate} />
          </InputContainer>
        </InputGroup>

        <InputGroup>
          <InputLabel>시간당 급여</InputLabel>
          <InputContainer>
            <InputNumber
              placeholder="0원"
              value={studentProfile.wage}
              onChangeText={text => handleChangeProfile('wage', text)}
              formatValue={formatValue}
            />
          </InputContainer>
        </InputGroup>
      </Group>

      <SelectModal
        ref={subjectModalRef}
        onSelect={value => handleChangeProfile('subject', value)}
        selectOptions={subjects}
      />
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

const Group = styled.View`
  padding: 20px 0;
  gap: 8px;
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

const Line = styled.View`
  height: 2px;
  background-color: ${props => props.theme.color.grey[150]};
`;

const DayContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const DayItem = styled.Pressable<{$isSelected: boolean}>`
  width: 35px;
  height: 35px;
  border-radius: 18px;

  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.$isSelected ? '#161E33' : props.theme.color.grey[200]};

  background-color: ${props =>
    props.$isSelected ? '#161E33' : props => props.theme.color.grey[100]};

  justify-content: center;
  align-items: center;
`;

const DayText = styled.Text<{$isSelected: boolean}>`
  color: ${props =>
    props.$isSelected
      ? props.theme.color.grey[100]
      : props.theme.color.grey[700]};

  /* Text/R14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: ${props => (props.$isSelected ? '600' : '400')};
  line-height: 21px; /* 21px */
`;

const InputGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InputLabel = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;

const InputContainer = styled.View`
  width: 181px;
`;
