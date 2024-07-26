import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';

import Accordion from '../../common/Accordion';
import {Homework} from '../../../api/homework-yeop';
import theme from '../../../styles/theme';

interface TitleAccordionProps {
  handleChangeHomework: (...args: any[]) => any;
  homework: Homework;
}

export default function TitleAccordion({
  handleChangeHomework,
  homework,
}: TitleAccordionProps) {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    handleChangeHomework('title', value);
  }, [value, handleChangeHomework]);

  return (
    <Accordion title="제목" subTitle={homework.title}>
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
    </Accordion>
  );
}

const InputContainer = styled.View`
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
