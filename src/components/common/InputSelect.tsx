import {Image} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import {SimpleSheet, useSimpleSheet} from 'react-native-simple-sheet';
import SimpleSheetSelectForm from './SimpleSheetSelectForm';

interface SelectOption {
  key: string | number;
  value: string | number;
  label: string;
}

interface InputSelectProps {
  onSelect: (args: any) => any;
  selectOptions: SelectOption[];
  placeholder?: string;
  value?: string;
  title: string;
}

export default function InputSelect({
  title,
  value,
  onSelect,
  selectOptions,
  placeholder,
}: InputSelectProps) {
  const sheet = useSimpleSheet();
  const label = selectOptions?.find(opt => opt.value === value)?.label;

  const content = label ? (
    <Value>{label}</Value>
  ) : (
    <Placeholder>{placeholder}</Placeholder>
  );

  const openSelectSheet = () => {
    sheet.open(props => (
      <SimpleSheet {...props}>
        <SimpleSheetSelectForm
          title={title}
          defaultValue={value}
          selectOptions={selectOptions}
          onSelect={onSelect}
          close={props.close}
        />
      </SimpleSheet>
    ));
  };

  return (
    <Container onPress={openSelectSheet}>
      {content}
      <Image source={require('../../../assets/images/arrow_downward.png')} />
    </Container>
  );
}

const Container = styled.Pressable`
  padding: 12px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${props => props.theme.color.grey[300]};
  border-radius: 5px;
`;

const Placeholder = styled.Text`
  color: ${props => props.theme.color.grey[600]};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const Value = styled.Text`
  color: ${props => props.theme.color.BTN900};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;
