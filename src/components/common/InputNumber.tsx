import {TextInput, TextInputProps} from 'react-native';
import React, {useState, useRef} from 'react';
import styled from '@emotion/native';
import theme from '../../styles/theme';

interface CustomProps {
  formatValue?: (args: any) => any;
}

type InputNumberProps = TextInputProps & CustomProps;

export default function InputNumber({
  value,
  formatValue = value => value,
  ...rest
}: InputNumberProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    setFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <>
      <Input
        {...rest}
        ref={inputRef}
        value={value}
        keyboardType="number-pad"
        onFocus={handleFocus}
        onBlur={handleBlur}
        $focused={focused}
        placeholderTextColor={theme.color.grey[600]}
      />
      <Text $focused={focused} onPress={handleFocus} $exists={!!value}>
        {value ? formatValue(value) : rest.placeholder}
      </Text>
    </>
  );
}

const Text = styled.Text<{$focused: boolean; $exists: boolean}>`
  display: ${props => props.$focused && 'none'};
  padding: 8px 16px;
  border-radius: 5px;
  background-color: ${props =>
    props.$focused ? props.theme.color.blue[400] : props.theme.color.grey[200]};
  color: ${props =>
    props.$exists ? props.theme.color.BTN900 : props.theme.color.grey[600]};
  text-align: center;
  font-size: 18px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
`;

const Input = styled.TextInput<{$focused: boolean}>`
  display: ${props => !props.$focused && 'none'};
  padding: 8px 16px;
  border-radius: 5px;
  background-color: ${props => props.theme.color.blue[400]};
  color: ${props => props.theme.color.grey[100]};
  text-align: center;
  font-size: 18px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  /* line-height: 27px; */
`;
