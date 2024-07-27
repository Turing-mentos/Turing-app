import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';

import Accordion from '../../common/Accordion';
import {Homework} from '../../../api/homework-yeop';
import Icon from '../../common/icons/SvgIcon';

interface RangeAccordionProps {
  handleChangeHomework: (...args: any[]) => any;
  homework: Homework;
}

const rangeTypes = ['페이지', '챕터', '번호', '회차', '강의', '설정 안 함'];
const rangeTypeConverter = {
  페이지: 'p',
  챕터: 'ch',
  번호: 'n',
  회차: 'test',
  강의: 'lec',
  '설정 안 함': 'none',
};

export default function RangeAccordion({
  handleChangeHomework,
  homework,
}: RangeAccordionProps) {
  const [rangeType, setRangeType] = useState<string>('');
  const [rangeStart, setRangeStart] = useState('0');
  const [rangeEnd, setRangeEnd] = useState('0');
  const [isSingle, setIsSingle] = useState(false);

  useEffect(() => {
    handleChangeHomework('rangeStart', +rangeStart);
  }, [rangeStart, handleChangeHomework]);

  useEffect(() => {
    handleChangeHomework('rangeEnd', +rangeEnd);
  }, [rangeEnd, handleChangeHomework]);

  useEffect(() => {
    handleChangeHomework('rangeType', rangeType);
  }, [rangeType, handleChangeHomework]);

  useEffect(() => {
    if (isSingle) {
      setRangeEnd(rangeStart);
    }
  }, [isSingle, handleChangeHomework, rangeStart]);

  return (
    <Accordion
      title="범위"
      subTitle={
        rangeType === '설정 안 함' || rangeType === ''
          ? ''
          : `${rangeTypeConverter[rangeType]}.${rangeStart}~${rangeEnd}`
      }>
      <ScrollViewContainer horizontal>
        <SelectContainer>
          {rangeTypes.map(type => (
            <SelectButton
              $selected={type === rangeType}
              key={type}
              onPress={() => setRangeType(type)}>
              <SelectText $selected={type === rangeType}>{type}</SelectText>
            </SelectButton>
          ))}
        </SelectContainer>
      </ScrollViewContainer>

      {rangeType !== '설정 안 함' && rangeType !== '' && (
        <RangeContainer>
          <Range>
            <RangeTypeText>{rangeTypeConverter[rangeType]}.</RangeTypeText>
            <RangeInput
              keyboardType="number-pad"
              value={rangeStart + ''}
              onChangeText={text => setRangeStart(text)}
            />
            <Wave>~</Wave>
            <RangeTypeText>{rangeTypeConverter[rangeType]}.</RangeTypeText>
            <RangeInput
              keyboardType="number-pad"
              value={rangeEnd + ''}
              onChangeText={text => setRangeEnd(text)}
              readOnly={isSingle}
            />
          </Range>

          <Line />

          <SingleContainer onPress={() => setIsSingle(prev => !prev)}>
            <Icon
              name={isSingle ? 'CheckBlack' : 'CheckGrey'}
              width={18}
              height={18}
            />
            <SingleText $selected={isSingle}>단일 범위</SingleText>
          </SingleContainer>
        </RangeContainer>
      )}
    </Accordion>
  );
}

const RangeContainer = styled.View`
  margin-top: 4px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.color.grey[200]};
  padding: 8px 16px;
  gap: 8px;
`;

const SelectContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ScrollViewContainer = styled.ScrollView``;

const SelectButton = styled.Pressable<{$selected: boolean}>`
  padding: 4px 12px;
  border-radius: 50px;
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

const Range = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const RangeTypeText = styled.Text`
  color: ${props => props.theme.color.grey[500]};

  /* Text/R18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px; /* 27px */
`;

const Wave = styled.Text`
  color: ${props => props.theme.color.BTN900};
  text-align: center;

  /* Text/R24 */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 36px */
`;

const RangeInput = styled.TextInput<{readOnly?: boolean}>`
  padding: 8px 16px;
  width: 88px;
  border-radius: 5px;
  background-color: ${props =>
    props.readOnly ? props.theme.color.grey[300] : props.theme.color.grey[200]};
  text-align: center;
  color: ${props =>
    props.readOnly ? props.theme.color.grey[400] : props.theme.color.BTN900};
`;

const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${props => props.theme.color.grey[150]};
`;

const SingleContainer = styled.Pressable`
  flex-direction: row;
  align-self: flex-end;
  align-content: center;
  gap: 4px;
`;

const SingleText = styled.Text<{$selected: boolean}>`
  color: ${props =>
    !props.$selected ? props.theme.color.grey[400] : props.theme.color.BTN900};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21pxs; /* 21px */
`;
