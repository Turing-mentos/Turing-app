import React from 'react';
import styled from '@emotion/native';
import {format, addDays} from 'date-fns';
import {Schedule} from '../../api/home';
import {groupSchedulesByDate} from '../../utils/time';
import theme from '../../styles/theme';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const studyRoomColorEnum = ['P', 'B', 'M', 'G', 'G', 'Y', 'O'];

const formatTime = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  const meridiem = hour < 12 ? '오전' : '오후';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${meridiem} ${formattedHour}시 ${minute === 0 ? '' : minute + '분'}`;
};

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

function CalendarDate({
  localDate,
  daySchedules,
  studyRoomColors,
}: {
  localDate: string;
  daySchedules: Schedule[];
  studyRoomColors: {[key: string]: string};
}) {
  const newLocalDate = new Date(localDate);
  const today = new Date();
  const day = newLocalDate.getDay();
  const date = newLocalDate.getDate();
  const extraLength = daySchedules.length - 3;

  const selected =
    format(today, 'yyyy-MM-dd') === format(newLocalDate, 'yyyy-MM-dd');

  const convertDay = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <CalendarItem>
      <Day>{convertDay[day]}</Day>

      <DateContainer $selected={selected}>
        <DateText $selected={selected}>{date}</DateText>
      </DateContainer>

      <CalendarItemFooter>
        <CircleContainer>
          {daySchedules.slice(0, 3).map(schedule => (
            <Circle
              key={schedule.scheduleId}
              $backgroundColor={
                theme.color.student[studyRoomColors[schedule.studyRoomId]]
              }
            />
          ))}
        </CircleContainer>
        {extraLength > 0 && <ExtraCount>+{extraLength}</ExtraCount>}
      </CalendarItemFooter>
    </CalendarItem>
  );
}

interface HomeScheduleProps {
  schedules: Schedule[];
  studyRoomIds: number[];
}

export default function HomeSchedule({
  schedules,
  studyRoomIds,
}: HomeScheduleProps) {
  const navigation = useNavigation();
  const today = new Date();
  const todayString = format(today, 'yyyy-MM-dd');
  const dates = Array.from({length: 10}, (_, i) => addDays(today, i));
  const dateSchedules = groupSchedulesByDate(schedules);
  const todaySchedule = dateSchedules[todayString] || [];
  const studyRoomColors: {[key: string]: string} = {};
  studyRoomIds
    .sort((a, b) => a - b)
    .forEach((studyRoomId, idx) => {
      studyRoomColors[studyRoomId] = studyRoomColorEnum[idx % 7];
    });

  return (
    <Container>
      <Header>
        <Title>
          오늘의 수업 <Blue>{todaySchedule.length}건</Blue>
        </Title>

        <Pressable onPress={() => navigation.navigate('Schedule')}>
          <IconImage
            source={require('../../../assets/images/arrow_rightward_big.png')}
          />
        </Pressable>
      </Header>

      <ScrollViewContainer horizontal>
        <CalendarContainer>
          {dates.map(date => {
            const localDate = format(date, 'yyyy-MM-dd');

            return (
              <CalendarDate
                key={date.toString()}
                daySchedules={dateSchedules[localDate] || []}
                localDate={localDate}
                studyRoomColors={studyRoomColors}
              />
            );
          })}
        </CalendarContainer>
      </ScrollViewContainer>

      <Line />

      <Footer>
        {todaySchedule
          // .filter(schedule => {
          //   const now = format(new Date(), 'HH:mm');
          //   const {startTime} = schedule;
          //   return timeToMinutes(startTime) - timeToMinutes(now) > 30;
          // })
          .map(schedule => (
            <OneScheduleContainer key={schedule.scheduleId}>
              <Badge
                $backgroundColor={
                  theme.color.student[studyRoomColors[schedule.studyRoomId]]
                }>
                <BadgeText>
                  {schedule.studentName} | {schedule.subject}
                </BadgeText>
              </Badge>
              <BadgeText>
                {formatTime(schedule.startTime)} ~{' '}
                {formatTime(schedule.endTime)}
              </BadgeText>
            </OneScheduleContainer>
          ))}
      </Footer>
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 16px;
  border-radius: 5px;
  background-color: ${props => props.theme.color.grey[100]};
  gap: 12px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

const Blue = styled.Text`
  color: ${props => props.theme.color.blue[850]};
`;

const ScrollViewContainer = styled.ScrollView``;

const CalendarContainer = styled.View`
  flex-direction: row;
  gap: 20px;
`;

const Line = styled.View`
  height: 1px;
  background-color: ${props => props.theme.color.grey[150]};
`;

const Footer = styled.View`
  gap: 8px;
`;

const IconImage = styled.Image`
  width: 18px;
  height: 18px;
`;

const CalendarItem = styled.View`
  align-self: flex-start;
  gap: 4px;
  align-items: center;
`;

const Day = styled.Text`
  color: ${props => props.theme.color.grey[800]};
  text-align: center;

  /* Text/M12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 18px */
`;

const DateContainer = styled.View<{$selected: boolean}>`
  padding: 3px 4px;
  background-color: ${props =>
    props.$selected ? props.theme.color.BTN900 : props.theme.color.grey[100]};
  border-radius: 50px;
  width: 30px;
  height: 29px;
`;

const DateText = styled.Text<{$selected: boolean}>`
  color: ${props =>
    props.$selected
      ? props.theme.color.grey[100]
      : props.theme.color.grey[800]};
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 23.4px; /* 23.4px */
`;

const CalendarItemFooter = styled.View``;

const CircleContainer = styled.View`
  flex-direction: row;
  gap: 2px;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.View<{$backgroundColor: string}>`
  background-color: ${props => props.$backgroundColor};
  width: 8px;
  height: 8px;
  border-radius: 50px;
`;

const ExtraCount = styled.Text`
  color: ${props => props.theme.color.grey[500]};
  text-align: right;
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 12px */
`;

const OneScheduleContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const Badge = styled.View<{$backgroundColor: string}>`
  padding: 2px 8px;
  background-color: ${props => props.$backgroundColor};
  border-radius: 5px;
`;

const BadgeText = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;
