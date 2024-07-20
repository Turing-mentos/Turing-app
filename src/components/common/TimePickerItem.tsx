import React, {useState} from 'react';
import styled from '@emotion/native';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';

interface TimePickerProps {
  onSelect: (hour: number, minute: number) => void;
}

export default function TimePickerItem({onSelect}: TimePickerProps) {
  const defaultTime = new Date();
  defaultTime.setHours(0);
  defaultTime.setMinutes(0);
  const [time, setTime] = useState(defaultTime);
  const [open, setOpen] = useState(false);
  const meridiem = time.getHours() < 12 ? '오전' : '오후';

  const onConfirm = (date: Date) => {
    setOpen(false);
    setTime(date);
    onSelect(date.getHours(), date.getMinutes());
  };

  return (
    <>
      <TimePickerButton $focused={open} onPress={() => setOpen(true)}>
        <TimeText $focused={open}>{`${meridiem} ${format(
          time,
          'h:mm',
        )}`}</TimeText>
      </TimePickerButton>

      <DatePicker
        modal
        mode="time"
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

const TimePickerButton = styled.Pressable<{$focused: boolean}>`
  flex: 1;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background-color: ${props =>
    props.$focused ? props.theme.color.blue[400] : props.theme.color.grey[200]};
`;

const TimeText = styled.Text<{$focused: boolean}>`
  color: ${props =>
    props.$focused ? props.theme.color.grey[100] : props.theme.color.BTN900};
  text-align: center;

  /* Text/R18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
`;
