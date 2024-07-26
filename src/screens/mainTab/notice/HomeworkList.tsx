import * as React from "react";
import {Text, StyleSheet, View, Image, Pressable} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Homework from './Homework.tsx';
import RemindButtonIcon from '../../../../assets/images/Notice/ReminderIcon.svg';
import { TouchableOpacity } from "react-native-gesture-handler";
import {showToast} from '../../../components/common/Toast';
import ProgressBar from './ProgressBar.tsx';
import styled from '@emotion/native';
import TimeLimitView from './TimeLimit.tsx';
interface homeworkDto {
    homeworkId: number;
    category: string;
    title: string;
    rangeType: string;
    rangeStart: number;
    rangeEnd: number;
    content: string;
    memo?: string;
    isDone?: boolean;
}

interface homeworkListProps {
  notebookId: number;
  studentName: string; // 박민영
  subject: string;  // 영어
  deadline: string; //2024-07-25T03:42:53.267Z
  isDone?: boolean;
  homeworkDtoList: homeworkDto[];// homework contents
}

const ArrowDown = () => (
    <Image source={require('../../../../assets/images/arrow_downward.png')} />
);
  
const ArrowUp = () => (
    <Image source={require('../../../../assets/images/arrow_upward.png')} />
);

export default function HomeworkList({
  studentName,
  subject,
  deadline,
  isDone,
  homeworkDtoList,
  }: homeworkListProps) {
  const [expanded, setExpanded] = React.useState(true);
  const [homeworkCompletion, setHomeworkCompletion] = React.useState<homeworkDto[]>([]);

  React.useEffect(() => {
    setHomeworkCompletion(homeworkDtoList.map(homework => ({
      ...homework,
      isDone: homework.isDone || false
    })));
  }, [homeworkDtoList]);
  const allCompleted = homeworkCompletion.every(homework => homework.isDone);
  // 체크 상태 변경 처리
  const handleCheck = (homeworkId: number, checked: boolean) => {
    const updatedHomework = homeworkCompletion.map(homework =>
      homework.homeworkId === homeworkId ? {...homework, isDone: checked} : homework
    );
    setHomeworkCompletion(updatedHomework);
  };

  const calculateCompletion = () => {
    const totalTasks = homeworkCompletion.length;
    const completedTasks = homeworkCompletion.filter(task => task.isDone).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0; // 반환값을 숫자로 변경
    return {
      totalTasks,
      completedTasks,
      completionRate // 숫자 형태로 반환
    };
  };
  const {totalTasks, completedTasks, completionRate} = calculateCompletion();


  const calculateRemainingTime = (deadline) => {
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
  
  
  const handleToggle = () => {
    setExpanded(prev => !prev);
  };
  
  const remainingDays = calculateRemainingTime(deadline);

  return (
    <AccordionContainer allCompleted={allCompleted}>
      <AccordionHeader>
        <AccordionTitleGroup>
            <ToggleGroup>
            <AccordionTitle>{studentName + ' | ' + subject}</AccordionTitle>
            <HeaderContainer>
                <Pressable onPress={handleToggle}>
                {expanded ? <ArrowUp /> : <ArrowDown />}
                </Pressable>
            </HeaderContainer>
            </ToggleGroup>
            <ProgressGroup>
                <ProgressScale>{completionRate + '%'}</ProgressScale>
                <ProgressNum>{'('+completedTasks + '/' + totalTasks+')'}</ProgressNum>
            </ProgressGroup>
        </AccordionTitleGroup>
      </AccordionHeader>
      <TimeLimitContainer>
      <TimeLimitView deadline={remainingDays}/>
      </TimeLimitContainer>
      <ProgressBar completionRate={completionRate}></ProgressBar>
      <Line allCompleted={allCompleted}/>
      {expanded && (
        <>
            {homeworkCompletion.map((homework) => (
        <Homework
          key={homework.homeworkId}
          label={`[${homework.category}] ${homework.title} -> ${homework.rangeType}.${homework.rangeStart}~${homework.rangeType}.${homework.rangeEnd} ${homework.content}`}
        //   isDone={homework.isDone}
          onPress={(checked: boolean) => handleCheck(homework.homeworkId, checked)}
        />
      ))} 
          <Line allCompleted={allCompleted}/>
            <TouchableButton>
                {/* <ButtonContainer> */}
                    <GradientButton colors={['#9708cc', '#287eff']} useAngle={true} angle={74.51}>
                        <ButtonText>리마인드 콕 찌르기  </ButtonText>
                        <RemindButtonIcon/>
                    </GradientButton>
                {/* </ButtonContainer> */}
            </TouchableButton>
        </>
      )}
    </AccordionContainer>
  );
}
const AccordionContainer = styled.View<{ allCompleted: boolean }>`
  padding: 12px 16px;
  background-color: ${props => props.allCompleted ? '#E6E8F0' : '#FEFEFE'};
  border-radius: 5px;
  gap: 12px;
`;

const TimeLimitContainer = styled.View`
  align-items: flex-end; // 우측 정렬
  width: 100%; // 부모 컨테이너의 전체 너비 사용
  margin-bottom: -10.0px;
  margin-top: -10.0px;
`;

const AccordionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderContainer = styled.View`
  flex-direction: column;
  align-items: flex-end; // 우측 정렬
`;

const AccordionTitleGroup = styled.View`
  flex-direction: column;
  gap: 12px;
  align-items: left;
  justify-content: space-between;
`;
const ProgressGroup = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: left;
`;
const ToggleGroup = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: right;
`;

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
  color: #C2C7D3;

  /* Text/M22 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  text-align: left;
  line-height: 30px; /* 33px */
`;

const Line = styled.View<{ allCompleted: boolean }>`
  height: 2px;
  background-color: ${props => !props.allCompleted? props.theme.color.grey[150] : '#D4D8E2'};
`;

const GradientButton = styled(LinearGradient)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 0px;
  border-Radius: 55px;
  width: 250px;
`;

const ButtonText = styled.Text`
  color: #FEFEFE;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  font-family: Pretendard;
`;
  
const TouchableButton = styled.TouchableOpacity`
    margin: 12px;
    flex-direction: column;
    align-items: center;
`;
const ButtonContainer = styled.View`
  flex-direction: column;
  align-items: center;
  
`;