import {Pressable} from 'react-native';
import React, {useState} from 'react';

import Icon from './icons/SvgIcon';

interface ToggleProps {
  defaultValue?: boolean;
  handleOn?: () => any;
  handleOff?: () => any;
  width?: number;
  height?: number;
}

export default function Toggle({
  defaultValue = false,
  handleOn = () => {},
  handleOff = () => {},
  width = 48,
  height = 28,
}: ToggleProps) {
  const [on, setOn] = useState(defaultValue);
  const handleToggle = () => {
    setOn(prev => !prev);
  };

  const toggleName = on ? 'ToggleOn' : 'ToggleOff';

  if (on) {
    handleOn();
  } else {
    handleOff();
  }

  return (
    <Pressable onPress={handleToggle}>
      <Icon name={toggleName} width={width} height={height} />
    </Pressable>
  );
}
