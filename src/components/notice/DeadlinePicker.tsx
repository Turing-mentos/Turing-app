import React, {useState} from 'react';
import styled from '@emotion/native';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import Icon from '../common/icons/SvgIcon';

interface DatePickerItemProps {
  onSelect: (date: Date) => void;
}

const dayFormat = ['일', '월', '화', '수', '목', '금', '토'];

export default function DeadlinePicker({onSelect}: DatePickerItemProps) {
  const defaultTime = new Date();
  const [time, setTime] = useState(defaultTime);
  const [open, setOpen] = useState(false);
  const day = time.getDay();

  const onConfirm = (date: Date) => {
    setOpen(false);
    setTime(date);
    onSelect(date);
  };

  return (
    <>
      <TimePickerButton onPress={() => setOpen(true)}>
        <Icon name="Calendar" />
        <TimeText>{`${format(time, 'MM.dd')}(${
          dayFormat[day]
        }) 까지`}</TimeText>
      </TimePickerButton>

      <DatePicker
        modal
        mode="date"
        open={open}
        date={time}
        onConfirm={onConfirm}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

const TimePickerButton = styled.Pressable`
  padding: 4px 8px;
  flex-direction: row;
  align-items: center;

  border-radius: 5px;
  background-color: ${props => props.theme.color.BG100};
`;

const TimeText = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;
