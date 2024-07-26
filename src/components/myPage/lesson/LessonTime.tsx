import React from 'react';
import styled from '@emotion/native';

import TimePickerItem from '../../common/TimePickerItem';

interface Time {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

type ChangeTimeHandler = ({hour, minute, second, nano}: Time) => void;

interface LessonTimeProps {
  day: number;
  handleChangeStartTime: ChangeTimeHandler;
  handleChangeEndTime: ChangeTimeHandler;
}

const dayConverter = ['일', '월', '화', '수', '목', '금', '토'];

export default function LessonTime({
  day,
  handleChangeStartTime,
  handleChangeEndTime,
}: LessonTimeProps) {
  return (
    <DayTimePickerContainer>
      <DayTitle>{dayConverter[day]}요일</DayTitle>

      <DayPeriodContainer>
        <TimePickerItem
          onSelect={(hour, minute) => {
            handleChangeStartTime({
              hour,
              minute,
              second: 0,
              nano: 0,
            });
          }}
        />
        <WaveText>~</WaveText>
        <TimePickerItem
          onSelect={(hour, minute) => {
            handleChangeEndTime({
              hour,
              minute,
              second: 0,
              nano: 0,
            });
          }}
        />
      </DayPeriodContainer>
    </DayTimePickerContainer>
  );
}

const DayTimePickerContainer = styled.View`
  gap: 12px;
`;

const DayTitle = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 24px */
`;

const DayPeriodContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

const WaveText = styled.Text`
  color: #000;
  text-align: center;

  /* Text/R24 */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 36px */
`;
