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
  const [check, setCheck] = React.useState(false);
  const [completion, setCompletion] = React.useState<homeworkDto[]>([]);

  const [homeworkCompletion, setHomeworkCompletion] = React.useState<homeworkDto[]>([]);

  React.useEffect(() => {
    setHomeworkCompletion(homeworkDtoList.map(homework => ({
      ...homework,
      isDone: homework.isDone || false
    })));
  }, [homeworkDtoList]);

  // 체크 상태 변경 처리
  const handleCheck = (homeworkId: number, checked: boolean) => {
    const updatedHomework = homeworkCompletion.map(homework =>
      homework.homeworkId === homeworkId ? {...homework, isDone: checked} : homework
    );
    setHomeworkCompletion(updatedHomework);
  };

  // 진행 상태 계산
//   const calculateCompletion = () => {
//     const totalTasks = homeworkCompletion.length;
//     const completedTasks = homeworkCompletion.filter(task => task.isDone).length;
//     return {
//       totalTasks,
//       completedTasks,
//       completionRate: totalTasks > 0 ? (completedTasks / totalTasks * 100).toFixed(0) + '%' : '0%'
//     };
//   };
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


  const calculateRemainingDays = (deadline) => {
    const today = new Date();
    const dueDate = new Date(deadline);
    const timeDiff = dueDate.getTime() - today.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(check);
    return days;
  };
  
  
  const handleToggle = () => {
    setExpanded(prev => !prev);
  };
  
  const remainingDays = calculateRemainingDays(deadline);

  return (
    <AccordionContainer>
      <AccordionHeader>
        <AccordionTitleGroup>
            <ToggleGroup>
            <AccordionTitle>{studentName + ' | ' + subject}</AccordionTitle>
            <Pressable onPress={handleToggle}>
            {expanded ? <ArrowUp /> : <ArrowDown />}
            </Pressable>
            </ToggleGroup>
            <ProgressGroup>
                <ProgressScale>{completionRate + '%'}</ProgressScale>
                <ProgressNum>{'('+completedTasks + '/' + totalTasks+')'}</ProgressNum>
            </ProgressGroup>
        </AccordionTitleGroup>
      </AccordionHeader>
      <TimeLimitContainer>
      <TimeLimitView deadline={'수업 ' + remainingDays + '일 전'}/>
      </TimeLimitContainer>
      <ProgressBar completionRate={completionRate}></ProgressBar>
      <Line />
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
          <Line />
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

const AccordionContainer = styled.View`
  padding: 12px 16px;
  background-color: #FEFEFE;
  border-radius: 5px;
  gap: 12px;
`;

const AccordionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const TimeLimitContainer = styled.View`
  align-items: right;
  
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

const Line = styled.View`
  height: 2px;
  background-color: ${props => props.theme.color.grey[150]};
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