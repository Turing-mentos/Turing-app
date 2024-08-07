import {Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';

import Icon from './icons/SvgIcon';

interface ToggleProps {
  defaultValue?: boolean;
  handleToggle?: (...args: any[]) => any;
  width?: number;
  height?: number;
}

export default function Toggle({
  defaultValue,
  handleToggle = () => {},
  width = 48,
  height = 28,
}: ToggleProps) {
  const [on, setOn] = useState(defaultValue);
  const handleToggleClick = async () => {
    setOn(prev => !prev);
    await handleToggle();
  };

  useEffect(() => {
    setOn(defaultValue);
  }, [defaultValue]);

  const toggleName = on ? 'ToggleOn' : 'ToggleOff';

  return (
    <Pressable onPress={handleToggleClick}>
      <Icon name={toggleName} width={width} height={height} />
    </Pressable>
  );
}
