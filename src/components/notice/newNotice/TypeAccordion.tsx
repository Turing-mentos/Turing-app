import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';

import Accordion from '../../common/Accordion';
import {Homework} from '../../../api/homework-yeop';
import theme from '../../../styles/theme';

const types = [
  '독해',
  '문법',
  '어휘',
  '듣기',
  '작문',
  '회화',
  'TEST',
  '직접 입력',
];

interface TypeAccordionProps {
  handleChangeHomework: (...args: any[]) => any;
  homework: Homework;
}

export default function TypeAccordion({
  handleChangeHomework,
  homework,
}: TypeAccordionProps) {
  const [selectedType, setSelectedType] = useState<string>('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (selectedType === '직접 입력') {
      handleChangeHomework('category', value);
    } else {
      handleChangeHomework('category', selectedType);
    }
  }, [selectedType, handleChangeHomework, value]);

  return (
    <Accordion title="유형" subTitle={homework.category}>
      <SelectContainer>
        {types.map(v => (
          <SelectButton
            key={v}
            onPress={() => setSelectedType(v)}
            $selected={selectedType === v}>
            <SelectText $selected={selectedType === v}>{v}</SelectText>
          </SelectButton>
        ))}
      </SelectContainer>

      {selectedType === '직접 입력' && (
        <InputContainer>
          <TextInput
            value={value}
            onChangeText={text => setValue(text)}
            maxLength={10}
            placeholderTextColor={theme.color.grey[500]}
            placeholder="ex. 교재명, 테스트명, 강의명, 프린트명 등"
          />
          <TextCount>{`${value?.length}/10`}</TextCount>
        </InputContainer>
      )}
    </Accordion>
  );
}

const SelectContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const SelectButton = styled.Pressable<{$selected: boolean}>`
  padding: 4px 12px;
  border-radius: 5px;
  background-color: ${props =>
    props.$selected ? props.theme.color.BTN900 : props.theme.color.grey[100]};
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.$selected ? props.theme.color.BTN900 : props.theme.color.grey[300]};
`;

const SelectText = styled.Text<{$selected: boolean}>`
  color: ${props =>
    props.$selected ? props.theme.color.grey[100] : props.theme.color.BTN900};

  /* Text/M16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;

const InputContainer = styled.View`
  margin-top: 8px;
  padding: 12px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: ${props => props.theme.color.grey[150]};
`;

const TextInput = styled.TextInput`
  color: ${props => props.theme.color.BTN900};
  flex: 1;

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

const TextCount = styled.Text`
  color: ${props => props.theme.color.grey[700]};
  text-align: right;

  /* Text/R12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;
