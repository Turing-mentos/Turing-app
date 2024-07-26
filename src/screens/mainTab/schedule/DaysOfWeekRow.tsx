import React from 'react';
import styled from '@emotion/native';

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const DayText = styled.Text<{isWeekend: number}>`
  font-size: 12px;
  font-family: 'Pretendard';
  color: ${props => props.isWeekend === 0 ? '#ff2727' : 
    props.isWeekend === 6 ? '#287eff' : '#192239'};
  text-align: center;
  line-height: 18px;
`;

const DayContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 10px 0;
`;

export default function DaysOfWeekRow(){
  return (
    <DayContainer>
      {daysOfWeek.map((day, index) => (
        <DayText key={index} isWeekend={index}>
          {day}
        </DayText>
      ))}
    </DayContainer>
  );
};

