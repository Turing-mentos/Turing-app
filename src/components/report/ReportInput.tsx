import React, {useRef} from 'react';
import styled from '@emotion/native';
import {TextInputProps, TextInput, Pressable} from 'react-native';

import Icon from '../common/icons/SvgIcon';
import theme from '../../styles/theme';

interface ReportInputProps {
  disabled?: boolean;
  placeholder?: string;
}

export default function ReportInput({
  disabled = false,
  placeholder = '키워드를 자유롭게 입력해주세요.',
  onSubmitEditing,
  ...rest
}: ReportInputProps & TextInputProps) {
  const inputRef = useRef<TextInput>(null);

  const handleIconPress = () => {
    if (inputRef.current) {
      inputRef.current.blur(); // Ensure the input loses focus to trigger onSubmitEditing
      if (onSubmitEditing) {
        onSubmitEditing({nativeEvent: {text: inputRef.current.value}});
      }
    }
  };

  return (
    <Container $disabled={disabled}>
      {disabled && (
        <DisableMessage>채팅창 속 선택지를 클릭해주세요.</DisableMessage>
      )}
      {!disabled && (
        <Input
          {...rest}
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor={theme.color.grey[500]}
          multiline
          blurOnSubmit={true}
          onSubmitEditing={onSubmitEditing}
        />
      )}

      <Pressable onPress={handleIconPress}>
        <Icon name={disabled ? 'InputEnterDisabled' : 'InputEnter'} />
      </Pressable>
    </Container>
  );
}

const Container = styled.Pressable<{$disabled: boolean}>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-radius: 50px;
  background-color: ${props =>
    props.$disabled ? props.theme.color.grey[150] : props.theme.color.BG100};
`;

const Input = styled.TextInput`
  color: ${props => props.theme.color.BTN900};
  flex: 1;

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

const DisableMessage = styled.Text`
  color: ${props => props.theme.color.grey[400]};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;
