import React, {useState, useEffect, useContext} from 'react';
import styled from '@emotion/native';

import {AppIcon, ChatBox, MyChatBox, Text, MyText} from '../ChatComponents';
import {ReportAPI, StudentInfo} from '../../../api/report';
import {showToast} from '../../common/Toast';
import StudentButton from '../StudentButton';
import {ReportContext} from '../ReportPage';

export default function StepOne() {
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState(0);

  const {
    handleNextReportStep,
    handleChangeReportRequest,
    handleSelectStudent,
    reportRequest,
    chatSteps,
    handleNextChatStep,
  } = useContext(ReportContext);

  const handleStartProcess = () => {
    if (students.length > 0) {
      if (chatSteps[0] === 1) {
        handleNextChatStep(0, 2);
      }
    } else {
      showToast('리포트 생성을 위해 과외 정보를 등록해주세요!');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await ReportAPI.getStudentsInfo();
      if (response.data) {
        setStudents(response.data);
      }
    } catch (err) {
      console.log('fetchStudents err:', err);
    }
  };

  const selectStudent = (studentId: number) => {
    const selectedStudent = students.find(
      student => student.studentId === studentId,
    );

    if (selectedStudent?.currentSession === 0) {
      showToast('아직 회차를 진행하진 학생은 생성할 수 없습니다!');
      return;
    }

    if (!selectedStudentId) {
      setSelectedStudentId(studentId);
      handleNextChatStep(0, 4);
    }
  };

  useEffect(() => {
    const selectedStudent = students.find(
      v => v.studentId === selectedStudentId,
    );
    handleChangeReportRequest('subject', selectedStudent?.subject);
    handleChangeReportRequest(
      'name',
      `${selectedStudent?.lastName}${selectedStudent?.firstName}`,
    );
    handleChangeReportRequest('studentId', selectedStudentId);

    handleSelectStudent(selectedStudent);
  }, [
    selectedStudentId,
    handleChangeReportRequest,
    students,
    handleSelectStudent,
  ]);

  useEffect(() => {
    if (chatSteps[0] === 0) {
      // 안녕하세요 튜링입니다.
      handleNextChatStep(0, 1);
      fetchStudents();
    } else if (chatSteps[0] === 1) {
      // 리포트 생성 시작하기
    } else if (chatSteps[0] === 2) {
      // 리포트 생성 시작할래요
      handleNextChatStep(0, 3);
    } else if (chatSteps[0] === 3) {
      // 어떤 학생의 리포트를 만들까요?
      fetchStudents();
      // goNextChatStep(3);
    } else if (chatSteps[0] === 4) {
      // ~~ 학생의 리포트 만들기
      handleNextChatStep(0, 5);
    } else if (chatSteps[0] === 5) {
      // 여기는 Step Two!
      handleNextChatStep(0, 6);
      handleNextReportStep();
    }
  }, [chatSteps, handleNextReportStep, handleNextChatStep]);

  return (
    <>
      <AppIcon />

      {chatSteps[0] >= 0 && (
        <ChatBox>
          <Text>안녕하세요. 튜링입니다.</Text>
        </ChatBox>
      )}

      {chatSteps[0] >= 1 && (
        <ChatBox>
          <Text>
            저에게 몇 가지 정보를 주시면,{'\n'}
            학부모님께 전달 드릴 수 있는 {'\n'}
            학생 리포트를 생성해드려요!
          </Text>

          <ProcessStart onPress={handleStartProcess}>
            <ProcessStartText>리포트 생성 시작하기</ProcessStartText>
          </ProcessStart>
        </ChatBox>
      )}

      {chatSteps[0] >= 2 && (
        <>
          <MyChatBox>
            <MyText>리포트 생성 시작할래요</MyText>
          </MyChatBox>
        </>
      )}

      {chatSteps[0] >= 3 && (
        <>
          <AppIcon />

          <ChatBox>
            <Text>어떤 학생의 리포트를 만들까요?</Text>
            {students.map(student => (
              <StudentButton
                key={student.studentId}
                name={`${student.lastName}${student.firstName}`}
                subject={student.subject}
                currentSession={student.currentSession}
                totalSession={student.totalSession}
                selected={student.studentId === selectedStudentId}
                onPress={() => selectStudent(student.studentId)}
              />
            ))}
          </ChatBox>
        </>
      )}

      {chatSteps[0] >= 4 && (
        <>
          <MyChatBox>
            <MyText>
              {`${reportRequest.name}`}({reportRequest.subject}) 학생의 리포트
              만들기
            </MyText>
          </MyChatBox>
        </>
      )}
    </>
  );
}

const ProcessStart = styled.TouchableOpacity`
  padding: 12px 27px;
  border-radius: 5px;
  background-color: ${props => props.theme.color.BTN900};
`;

const ProcessStartText = styled.Text`
  color: ${props => props.theme.color.grey[100]};

  /* Text/SB16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 24px */
`;
