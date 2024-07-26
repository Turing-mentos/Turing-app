import React, {useState, useEffect} from 'react';
import {Pressable} from 'react-native';
import styled from '@emotion/native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useSimpleSheet, SimpleSheet} from 'react-native-simple-sheet';
import {format} from 'date-fns';

import SimpleSheetContainer from '../common/SimpleSheetContainer';
import DeadlinePicker from './DeadlinePicker';
import IntroduceNotice from './IntroduceNotice';
import Button from '../common/Button';
import Icon from '../common/icons/SvgIcon';
import NoticeWriteModal from './NoticeWriteModal';
import {Homework, HomeworkAPI} from '../../api/homework-yeop';
import {NotebookAPI} from '../../api/notebook';
import {showToast} from '../common/Toast';

const rangeTypeConverter = {
  페이지: 'p',
  챕터: 'ch',
  번호: 'n',
  회차: 'test',
  강의: 'lec',
  '설정 안 함': 'none',
};

export default function NewNoticePage() {
  const route = useRoute();
  const navigation = useNavigation();
  const sheet = useSimpleSheet();
  const {name, subject, scheduleId} = route.params;

  const [deadline, setDeadline] = useState<Date>(new Date());
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [selectedHomeworks, setSelectedHomeworks] = useState<number[]>([]);
  const [edit, setEdit] = useState(false);

  const addHomework = (homework: Homework) => {
    setHomeworks(prev => [...prev, homework]);
  };

  const updateHomework = (index: number, homework: Homework) => {
    setHomeworks(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = homework;
      return newItems;
    });
  };

  const handleClickAddButton = () => {
    sheet.open(props => (
      <SimpleSheet {...props} avoidKeyboard={false}>
        <SimpleSheetContainer
          title={`숙제 ${homeworks.length + 1}`}
          close={props.close}>
          <NoticeWriteModal addHomework={addHomework} close={props.close} />
        </SimpleSheetContainer>
      </SimpleSheet>
    ));
  };

  const handleClickUpdateButton = (index: number) => {
    if (edit) {
      return;
    }

    sheet.open(props => (
      <SimpleSheet {...props} avoidKeyboard={false}>
        <SimpleSheetContainer title={`숙제 ${index + 1}`} close={props.close}>
          <NoticeWriteModal
            addHomework={homework => {
              updateHomework(index, homework);
            }}
            close={props.close}
            initialHomework={homeworks[index]}
          />
        </SimpleSheetContainer>
      </SimpleSheet>
    ));
  };

  const handleCreateNotebook = async () => {
    try {
      // 알림장 생성하기
      const notebookResponse = await NotebookAPI.createNotebook({
        scheduleId,
        deadline: format(deadline, 'yyyy-MM-dd'),
      });

      if (!notebookResponse.data) {
        throw new Error('notebook response data does not exist');
      }

      const {notebookId} = notebookResponse.data;
      // 각 숙제별 만들어내기
      Promise.all(
        homeworks.map(async homework => {
          await HomeworkAPI.createHomework({...homework, notebookId});
        }),
      );

      navigation.navigate('Notice', {isCreated: true});
    } catch (err) {
      showToast('알림장을 생성하는 도중 에러가 발생했습니다.');
      console.log('handleCreateNotebook err:', err);
    }
  };

  return (
    <Container>
      <Header>
        <Title>{`${name} | ${subject}`}</Title>
        <DeadlinePicker
          onSelect={date => {
            setDeadline(date);
          }}
        />
      </Header>

      <Line />

      <Body>
        {homeworks.length === 0 && <IntroduceNotice />}
        {homeworks.length > 0 && (
          <Homeworks>
            <HomeworksHeader>
              <HomeworksCount>숙제 {homeworks.length}개</HomeworksCount>
              <EditButton onPress={() => setEdit(prev => !prev)}>
                <EditText $edit={edit}>{edit ? '완료' : '편집'}</EditText>
              </EditButton>
            </HomeworksHeader>
            {homeworks.map((v, idx) => {
              const convertedRange =
                v.rangeType === '설정 안 함'
                  ? ''
                  : `${rangeTypeConverter[v.rangeType]}.${v.rangeStart}~${
                      v.rangeEnd
                    }`;
              const isSelected = selectedHomeworks.includes(idx);

              return (
                <EditHomeworkContainer key={idx}>
                  {edit && (
                    <Pressable
                      onPress={() => {
                        setSelectedHomeworks(prev => {
                          if (prev.includes(idx)) {
                            return prev.filter(item => item !== idx);
                          } else {
                            return [...prev, idx];
                          }
                        });
                      }}>
                      <Icon
                        name={isSelected ? 'EditChecked' : 'EditNonChecked'}
                      />
                    </Pressable>
                  )}
                  <HomeworkContainer
                    onPress={() => handleClickUpdateButton(idx)}>
                    <HomeworkText>{`[${v.category}] ${v.title} → ${convertedRange} ${v.content}`}</HomeworkText>
                    {v.memo && (
                      <HomeworkMemoContainer>
                        <Icon name="Memo" />
                        <HomeworkMemo>{v.memo}</HomeworkMemo>
                      </HomeworkMemoContainer>
                    )}
                  </HomeworkContainer>
                </EditHomeworkContainer>
              );
            })}
          </Homeworks>
        )}
      </Body>

      <Buttons>
        {!edit && (
          <>
            <AddButton onPress={handleClickAddButton}>
              <Icon name="PlusCircleGrey" />
              <AddButtonText>숙제 추가</AddButtonText>
            </AddButton>
            <Button
              label="알림장 생성하기"
              onPress={handleCreateNotebook}
              disabled={homeworks.length === 0}
            />
          </>
        )}
        {edit && (
          <Button
            label="삭제"
            disabled={selectedHomeworks.length === 0}
            onPress={() => {
              setHomeworks(prev =>
                prev.filter((v, idx) => !selectedHomeworks.includes(idx)),
              );
              setEdit(false);
              setSelectedHomeworks([]);
            }}
          />
        )}
      </Buttons>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
  padding: 20px 20px 128px 20px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px; /* 27px */
`;

const Line = styled.View`
  margin-top: 16px;
  height: 1px;
  background-color: ${props => props.theme.color.grey[150]};
`;

const Body = styled.View`
  flex: 1;
  margin-top: 12px;
`;

const Buttons = styled.View`
  gap: 12px;
`;

const AddButton = styled.TouchableOpacity`
  padding: 14px;
  border-radius: 5px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: 1px solid ${props => props.theme.color.grey[300]};
  background-color: ${props => props.theme.color.grey[100]};
`;

const AddButtonText = styled.Text`
  color: ${props => props.theme.color.grey[500]};

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;

const HomeworkContainer = styled.Pressable`
  flex: 1;
  padding: 12px 16px;
  border-radius: 5px;
  background-color: ${props => props.theme.color.BG100};
`;

const HomeworkText = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;

const HomeworkMemoContainer = styled.View`
  margin-top: 2px;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

const HomeworkMemo = styled.Text`
  color: ${props => props.theme.color.grey[700]};

  /* Text/M12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
`;

const Homeworks = styled.View`
  gap: 12px;
`;

const HomeworksHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HomeworksCount = styled.Text`
  ${props => props.theme.color.BTN900};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;

const EditButton = styled.Pressable``;

const EditText = styled.Text<{$edit: boolean}>`
  color: ${props =>
    props.$edit ? props.theme.color.blue[800] : props.theme.color.grey[500]};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;

const EditHomeworkContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;
