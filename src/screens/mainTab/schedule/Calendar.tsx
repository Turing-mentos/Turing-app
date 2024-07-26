import * as React from "react";
import styled from '@emotion/native';

interface Time {
    hour: number;
    minute: number;
    second: number;
    nano: number;
}
  

interface DailySchedule {
    scheduleId: number;
    date: string;
    studentName: string;
    subject: string;
    session: number;
    startTime: Time;
    endTime: Time;
    studyRoomId: number;
    baseSession: number;
}

interface MonthlySchedule {
    totalSchedule: DailySchedule[];
}

// {totalSchedule}: MonthlySchedule
export default function Calendar(){

    const today = new Date();
    const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
    const [currentYear, setCurrentYear] = React.useState(today.getFullYear());
    const INITIAL_DATE = today.toISOString().split('T')[0];

    const getDayOfWeek = (date) => {
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        return days[date.getDay()];
    };

  // to get sunday of target week that is first day 
    const getFirstDayOfWeek = (date) => { 
        const firstDay = new Date(date);
        firstDay.setDate(firstDay.getDate() - firstDay.getDay()); // Adjust to the previous Sunday
        return firstDay;
    };
  // to format date to YYYY-MM-DD
    const formatDate = (date) => {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    // Generate the dates for the calendar grid
    const generateCalendarDates = () => {
        const startDate = getFirstDayOfWeek(new Date(currentYear, currentMonth, 1));
        const dates = Array.from({ length: 35 }).map((_, index) => {
            const date = new Date(startDate);
            date.setDate(date.getDate() + index);
            return formatDate(date);
        });
        return dates;
    };

    const [selectedDate, setSelectedDate] = React.useState(INITIAL_DATE);
    const calendarDates = generateCalendarDates();
    
    const selectDate = (date) => {
        const dateObj = new Date(date);
        const monthOfSelectedDate = dateObj.getMonth();
        
        if (monthOfSelectedDate !== currentMonth) {
        setCurrentMonth(monthOfSelectedDate);  // Update the currentMonth if different
        }

        setSelectedDate(date);  // Set the selected date
    };

    const isDateSelected = (date) => {
        return selectedDate === date;
    };



    
    const WeekRow = ({ weekDates, selectDate, isDateSelected, currentMonth }) => {
        return (
            <WeeklyContainer>
                {weekDates.map(date => {
                const dateObj = new Date(date);
                const isSelected = isDateSelected(date);
                const isSunday = dateObj.getDay() === 0;
                const isSaturday = dateObj.getDay() === 6;
                const isOutOfMonth = dateObj.getMonth() !== currentMonth;
                const isCurrentday = date === today.toISOString().split('T')[0];
                return (
                    <DailyContainer key={date} isSelectedDate={isSelected} isOutOfMonth={isOutOfMonth}onPress={() => selectDate(date)}>
                        <CurrentDay isCurrentDay={isCurrentday}>
                        <DailyText isCurrentday={isCurrentday} isOutOfMonth={isOutOfMonth} isSaturday={isSaturday} isSunday={isSunday}>{dateObj.getDate()}</DailyText>
                        </CurrentDay>
                    </DailyContainer>
                    );
                })}
            </WeeklyContainer>
        );
    };


    const CalendarGrid = ({ calendarDates, selectDate, isDateSelected, currentMonth }) => {
        const weeks = [];
        for (let i = 0; i < calendarDates.length; i += 7) {
            weeks.push(calendarDates.slice(i, i + 7));
        }
        return (
        <CalendarGridContainer>
            {weeks.map((weekDates, index) => (
            <React.Fragment key={index}>
                <WeekRow weekDates={weekDates} selectDate={selectDate} isDateSelected={isDateSelected} currentMonth={currentMonth} />
                {index < weeks.length - 1 && <WeeklyLine/>}
            </React.Fragment>
            ))}
        </CalendarGridContainer>
        );
    };
    return(
        <CalendarGrid calendarDates={calendarDates} selectDate={selectDate} isDateSelected={isDateSelected} currentMonth={currentMonth} />
    )
}
const WeeklyContainer = styled.View`
    flexDirection: row;
    width: 100%;
    overflow: hidden;
`;
const DailyContainer = styled.TouchableOpacity<{isSelectedDate: boolean, isOutOfMonth: boolean}>`
    background-color: ${props => props.isSelectedDate ? '#F1F4FD' : '#FEFEFE'};
    padding-vertical: 4px;
    padding-horizontal: 0;
    height: 76px;
    width: 50px;
    align-items: center;
    overflow: hidden;
`;
const DailyText = styled.Text<{isSunday: boolean, isSaturday: boolean, isCurrentday: boolean, isOutOfMonth: boolean}>`
    color: ${props =>  props.isSunday ? '#ff2727' : 
                       props.isSaturday ? '#287eff' : 
                       props.isCurrentday ? '#fefefe' :
                       props.isOutOfMonth ? '#9ea3b4' : '#192239'};
    text-align: center;
    font-family: Pretendard;
    font-weight: 500;
    line-height: 18px;
    font-size: 12px;
`;

const CurrentDay = styled.View<{isCurrentDay: boolean}>`
    background-color: ${props => props.isCurrentDay ? '#192239' : ''};
    border-radius: 56px;
    height: 20px;
    width: 20px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;
const CalendarGridContainer = styled.View`
    flex-direction: column;
    overflow: hidden;
    align-items: center;
`;
const WeeklyLine = styled.View`
    background-color: #f4f6fb;
    height: 1px;
    width: 390px;
`;