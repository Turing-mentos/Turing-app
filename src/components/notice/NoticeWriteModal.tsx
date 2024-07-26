import React, {useState, useCallback, useEffect} from 'react';
import styled from '@emotion/native';

import {Homework} from '../../api/homework-yeop';
import TypeAccordion from './newNotice/TypeAccordion';
import TitleAccordion from './newNotice/TitleAccordion';
import RangeAccordion from './newNotice/RangeAccordion';
import ContentAccordion from './newNotice/ContentAccordion';
import MemoAccordion from './newNotice/MemoAccordion';
import Button from '../common/Button';

const rangeTypeConverter = {
  페이지: 'p',
  챕터: 'ch',
  번호: 'n',
  회차: 'test',
  강의: 'lec',
  '설정 안 함': 'none',
};

interface NoticeWriteModalProps {
  addHomework: (homework: Homework) => any;
  close: (...args: any[]) => any;
  initialHomework?: Homework;
}

export default function NoticeWriteModal({
  addHomework,
  close,
  initialHomework,
}: NoticeWriteModalProps) {
  const [homework, setHomework] = useState<Homework>({
    category: '',
    title: '',
    rangeType: '',
    rangeStart: 0,
    rangeEnd: 0,
    content: '',
    memo: '',
  });

  const canSubmit =
    homework.category !== '' &&
    homework.title !== '' &&
    homework.rangeType !== '' &&
    homework.content !== '';

  const handleChangeHomework = useCallback(
    (identifier: keyof typeof homework, value: any) => {
      setHomework(prev => ({...prev, [identifier]: value}));
    },
    [],
  );

  const handleSubmit = async () => {
    addHomework(homework);
    close();
  };

  useEffect(() => {
    if (initialHomework) {
      setHomework(initialHomework);
    }
  }, [initialHomework]);

  return (
    <Container>
      <ScrollViewContainer>
        <NoticeForm>
          <TypeAccordion
            homework={homework}
            handleChangeHomework={handleChangeHomework}
          />
          <TitleAccordion
            homework={homework}
            handleChangeHomework={handleChangeHomework}
          />
          <RangeAccordion
            homework={homework}
            handleChangeHomework={handleChangeHomework}
          />
          <ContentAccordion
            homework={homework}
            handleChangeHomework={handleChangeHomework}
          />
          <MemoAccordion
            homework={homework}
            handleChangeHomework={handleChangeHomework}
          />
        </NoticeForm>
      </ScrollViewContainer>

      <Line />

      <Tags>
        {Object.entries(homework)
          .filter(([_, value]) => {
            if (!value) {
              return false;
            }
            return true;
          })
          .map(([key, value]) => {
            if (key === 'rangeType' && value !== '설정 안 함') {
              return (
                <Tag key={key}>
                  <TagText>{`${rangeTypeConverter[value]}.${homework.rangeStart}~${homework.rangeEnd}`}</TagText>
                </Tag>
              );
            } else if (key === 'rangeStart' || key === 'rangeEnd') {
              return;
            } else {
              return (
                <Tag key={key}>
                  <TagText>{value}</TagText>
                </Tag>
              );
            }
          })}
      </Tags>

      <Buttons>
        <Button
          label={initialHomework ? '저장' : '추가'}
          onPress={handleSubmit}
          disabled={!canSubmit}
        />
      </Buttons>
    </Container>
  );
}

const Container = styled.View``;

const ScrollViewContainer = styled.ScrollView`
  /* flex: 1; */
  overflow: hidden;
  height: 410px;
`;

const NoticeForm = styled.View`
  gap: 8px;
`;

const Line = styled.View`
  margin-top: 12px;
  height: 1px;
  background-color: ${props => props.theme.color.grey[200]};
`;

const Buttons = styled.View`
  margin-top: 40px;
  margin-bottom: 80px;
`;

const Tags = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.View`
  border-radius: 5px;
  padding: 4px 8px;
  background-color: ${props => props.theme.color.BG100};
`;

const TagText = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 21px */
`;
