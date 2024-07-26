import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Homework from './Homework.tsx';
import RemindButtonIcon from '../../../../assets/images/Notice/ReminderIcon.svg';
import {showToast} from '../../../components/common/Toast';
import ProgressBar from './ProgressBar.tsx';
import styled from '@emotion/native';
import TimeLimitView from './TimeLimit.tsx';
import useUserStore from '../../../store/useUserStore.ts';
import {NotificationAPI} from '../../../api/notification.ts';
import {HomeworkAPI} from '../../../api/homework-yeop.ts';
import HomeworkCompleteModal from '../../../components/homework/HomeworkCompleteModal.tsx';
import Modal from '../../../components/common/Modal.tsx';

interface homeworkDto {
  homeworkId: number;
  category: string;
  title: string;
  rangeType: string;
  rangeStart: number;
  rangeEnd: number;
  content: string;
  memo?: string;
  isDone: boolean;
}

interface homeworkListProps {
  notebookId: number;
  studentName: string; // 박민영
  subject: string; // 영어
  deadline: string; //2024-07-25T03:42:53.267Z
  isDone?: boolean;
  homeworkDtoList: homeworkDto[]; // homework contents
}

const ArrowDown = () => (
  <HeaderContainer>
    <Image source={require('../../../../assets/images/arrow_downward.png')} />
  </HeaderContainer>
);

const ArrowUp = () => (
  <HeaderContainer>
    <Image source={require('../../../../assets/images/arrow_upward.png')} />
  </HeaderContainer>
);

const calculateRemainingTime = deadline => {
  const now = new Date();
  const dueDate = new Date(deadline);
  const timeDiff = dueDate.getTime() - now.getTime();
  const days = Math.floor(timeDiff / (1000 * 3600 * 24));
  const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));

  if (days > 0) {
    return `수업 ${days}일 전`; // 일 단위로 표시
  } else if (hours > 0) {
    return `수업 ${hours}시간 전`; // 시간 단위로 표시
  } else {
    return `수업 종료`; // 매우 가까운 경우
  }
};

export default function HomeworkList({
  studentName,
  subject,
  deadline,
  notebookId,
  isDone,
  homeworkDtoList,
}: homeworkListProps) {
  const {role} = useUserStore(state => state.user);
  const [expanded, setExpanded] = useState(true);
  const [homeworks, setHomeworks] = useState<homeworkDto[]>(homeworkDtoList);
  const [completedModal, setCompletedModal] = useState(false);

  const allCompleted = homeworks.every(homework => homework.isDone);

  // 체크 상태 변경 처리
  const handleCheck = async (homeworkId: number, checked: boolean) => {
    setHomeworks(prev => {
      const newHomeworks = prev.map(homework => {
        if (homeworkId === homework.homeworkId) {
          return {...homework, isDone: checked};
        }
        return homework;
      });

      const completed = newHomeworks.every(v => v.isDone);
      if (completed && role === 'student') {
        setCompletedModal(true);
      }

      return newHomeworks;
    });

    try {
      await HomeworkAPI.toggleCompleteHomework(homeworkId);
    } catch (err) {
      console.log('숙제 완료 토글 에러:', err);
    }
  };

  const calculateCompletion = () => {
    const totalTasks = homeworks.length;
    const completedTasks = homeworks.filter(task => task.isDone).length;
    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0; // 반환값을 숫자로 변경
    return {
      totalTasks,
      completedTasks,
      completionRate, // 숫자 형태로 반환
    };
  };

  const handleToggle = () => {
    setExpanded(prev => !prev);
  };

  const handleRemindClick = async () => {
    try {
      // await NotificationAPI.clickRemindNotification(notebookId);
      showToast(`${studentName} 학생에게 리마인드를 보냈어요!`, 'complete');
    } catch (err) {
      console.log('콕 찌르기 오류:', err);
    }
  };

  const {totalTasks, completedTasks, completionRate} = calculateCompletion();
  const remainingDays = calculateRemainingTime(deadline);

  return (
    <>
      <AccordionContainer allCompleted={allCompleted}>
        <AccordionHeader>
          <AccordionTitleGroup>
            <AccordionTitle>{studentName + ' | ' + subject}</AccordionTitle>

            <HeaderContainer>
              <Pressable onPress={handleToggle}>
                {expanded ? <ArrowUp /> : <ArrowDown />}
              </Pressable>
            </HeaderContainer>
          </AccordionTitleGroup>

          <ProgressGroup>
            <ProgressScale>
              {allCompleted ? '완료' : completionRate + '%'}
            </ProgressScale>
            <ProgressNum>
              {'(' + completedTasks + '/' + totalTasks + ')'}
            </ProgressNum>
          </ProgressGroup>
        </AccordionHeader>

        <TimeGroup>
          <TimeLimitContainer>
            <TimeLimitView deadline={remainingDays} />
          </TimeLimitContainer>

          <ProgressBar completionRate={completionRate} />
        </TimeGroup>

        <Line allCompleted={allCompleted} />
        {expanded && (
          <>
            {homeworks.map(homework => (
              <Homework
                key={homework.homeworkId}
                label={`[${homework.category}] ${homework.title} -> ${homework.rangeType}.${homework.rangeStart}~${homework.rangeType}.${homework.rangeEnd} ${homework.content}`}
                disabled={role === 'teacher'} // true -> 체크박스가 작동하지 않음
                memo={homework.memo}
                isDone={homework.isDone}
                onPress={(checked: boolean) =>
                  handleCheck(homework.homeworkId, checked)
                }
              />
            ))}

            {role === 'teacher' && (
              <TouchableButton onPress={handleRemindClick}>
                <GradientButton
                  colors={['#9708cc', '#287eff']}
                  useAngle={true}
                  angle={74.51}>
                  <ButtonText>리마인드 콕 찌르기 </ButtonText>
                  <RemindButtonIcon />
                </GradientButton>
              </TouchableButton>
            )}
          </>
        )}
      </AccordionContainer>

      <Modal
        isVisible={completedModal}
        close={() => {
          setCompletedModal(false);
        }}
        content={<HomeworkCompleteModal />}
      />
    </>
  );
}
const AccordionContainer = styled.View<{allCompleted: boolean}>`
  padding: 12px 16px;
  background-color: ${props => (props.allCompleted ? '#E6E8F0' : '#FEFEFE')};
  border-radius: 5px;
  gap: 8px;
`;

const TimeLimitContainer = styled.View`
  /* align-items: flex-end; // 우측 정렬 */
  position: absolute;
  top: -35px;
  right: 0;
`;

const AccordionHeader = styled.View`
  justify-content: space-between;
`;
const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: right; // 우측 정렬
`;

const AccordionTitleGroup = styled.View`
  flex-direction: row;
  gap: 12px;

  /* align-items: right; */
  justify-content: space-between;
`;
const ProgressGroup = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: left;
`;
// const ToggleGroup = styled.View`
//   width: ${filledWidth};
// `;

const AccordionTitle = styled.Text`
  color: #192239;

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  text-align: left
  line-height: 24px; /* 24px */
`;

const ProgressScale = styled.Text`
  color: var(--Main-BTN900, #192239);
  color: ${props => props.theme.color.BTN900};

  /* Text/M22 */
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  text-align: left
  line-height: 33px; /* 33px */
`;
const ProgressNum = styled.Text`
  color: #c2c7d3;

  /* Text/M22 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  text-align: left;
  line-height: 30px; /* 33px */
`;

const Line = styled.View<{allCompleted: boolean}>`
  height: 2px;
  background-color: ${props =>
    !props.allCompleted ? props.theme.color.grey[150] : '#D4D8E2'};
`;

const GradientButton = styled(LinearGradient)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 55px;
  /* width: 250px; */
`;

const ButtonText = styled.Text`
  color: #fefefe;
  font-size: 14px;
  line-height: 21px;
  font-weight: 600;
  font-family: Pretendard;
`;

const TouchableButton = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
`;

const TimeGroup = styled.View`
  margin-top: -6px;
`;
