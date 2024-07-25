import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';

import Icon from '../../common/icons/SvgIcon';
import {
  ReportAPI,
  ReportSummary,
  StudentInfo as IStudentInfo,
} from '../../../api/report';

interface GroupedReports {
  [yearMonth: string]: ReportSummary[];
}

const groupReportsByMonth = (
  targetReports: ReportSummary[],
): GroupedReports => {
  return targetReports.reduce((acc: GroupedReports, report: ReportSummary) => {
    const yearMonth = format(new Date(report.createdAt), 'yyyy. MM');

    if (!acc[yearMonth]) {
      acc[yearMonth] = [];
    }

    acc[yearMonth].push(report);
    return acc;
  }, {});
};

const NoContent = () => {
  return (
    <NoContentContainer>
      <Icon name="HelpQuestionGrey" />
      <NoContentTitle>아직 리포트 기록이 없어요</NoContentTitle>
      <NoContentBody>
        튜링과의 간단한 대화를 통해{'\n'}리포트를 생성하고 학부모님과
        소통하세요!
      </NoContentBody>
    </NoContentContainer>
  );
};

const ReportItem = ({
  name,
  subject,
  session,
  reportId,
}: {
  name: string;
  subject: string;
  session: number;
  reportId: number;
}) => {
  const navigation = useNavigation();

  return (
    <ReportButton
      onPress={() =>
        navigation.navigate('ReportDetail', {reportId, name, subject})
      }>
      <StudentInfo>
        {name} | {subject}
      </StudentInfo>
      <Session>
        <SessionText>{session}회차</SessionText>
      </Session>
    </ReportButton>
  );
};

const FilterButton = ({
  studentId,
  name,
  subject,
  selected = false,
  onPress,
}: {
  studentId: number;
  name: string;
  subject: string;
  selected?: boolean;
  onPress: (...args: any[]) => any;
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <FilterItem
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      $selected={selected}
      $pressed={isPressed}>
      {selected && <Icon name="BlueCheckSingle" />}
      <FilterItemText $selected={selected}>
        {studentId === -1 ? '전체' : `${name} | ${subject}`}
      </FilterItemText>
    </FilterItem>
  );
};

export default function PrevReportPage() {
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [students, setStudents] = useState<IStudentInfo[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number>(-1);

  const handleToggleFilter = () => {
    setFilterOpen(prev => !prev);
  };

  const all = {
    studentId: -1,
    lastName: '',
    firstName: '',
    subject: '',
  };

  const selectedStudent =
    students.find(student => selectedStudentId === student.studentId) || all;

  const selectedReports =
    selectedStudentId === -1
      ? reports
      : reports.filter(v => v.studentId === selectedStudentId);

  const groupedReports = groupReportsByMonth(selectedReports);

  const handleSelectStudent = (studentId: number) => {
    setSelectedStudentId(studentId);
    handleToggleFilter();
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await ReportAPI.getReportSummaryAll();
        if (response.data) {
          setReports(response.data);
        }
      } catch (err) {
        console.log('fetchReports error:', err);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await ReportAPI.getStudentsInfo();
        if (response.data) {
          setStudents(response.data);
        }
      } catch (err) {
        console.log('fetchStudents error:', err);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Container>
      <AccordionButton onPress={handleToggleFilter}>
        <AccordionButtonText>
          {selectedStudentId === -1
            ? '전체'
            : `${selectedStudent.lastName}${selectedStudent.firstName} | ${selectedStudent.subject}`}
        </AccordionButtonText>
        <Icon name="ArrowDownwardWhite" />
      </AccordionButton>

      {filterOpen && (
        <FilterContainer>
          <FilterButton
            key={selectedStudent.studentId}
            studentId={selectedStudent.studentId}
            name={`${selectedStudent.lastName}${selectedStudent.firstName}`}
            subject={selectedStudent.subject}
            onPress={() => handleSelectStudent(selectedStudent.studentId)}
            selected
          />
          {[all, ...students]
            .filter(v => v.studentId !== selectedStudentId)
            .map(student => (
              <FilterButton
                key={student.studentId}
                studentId={student.studentId}
                name={`${student.lastName}${student.firstName}`}
                subject={student.subject}
                onPress={() => handleSelectStudent(student.studentId)}
              />
            ))}
        </FilterContainer>
      )}

      <ScrollContainer>
        <BodyContainer>
          {Object.entries(groupedReports).length === 0 && <NoContent />}

          {Object.entries(groupedReports).length > 0 &&
            Object.entries(groupedReports)
              .sort((a, b) => (b[0] > a[0] ? 1 : -1))
              .map(([yearMonth, items]) => (
                <Section key={yearMonth}>
                  <SectionHeader>
                    <YearMonth>{yearMonth}</YearMonth>
                    <Line />
                  </SectionHeader>

                  <SectionBody>
                    {items.map(item => (
                      <ReportItem
                        key={item.reportId}
                        reportId={item.reportId}
                        name={item.name}
                        subject={item.subject}
                        session={item.session}
                      />
                    ))}
                  </SectionBody>
                </Section>
              ))}
        </BodyContainer>
      </ScrollContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
  padding: 0 20px;
`;

const ScrollContainer = styled.ScrollView`
  margin-top: 20px;
  flex: 1;
`;

const BodyContainer = styled.View`
  flex: 1;
  gap: 16px;
`;

const AccordionButton = styled.Pressable`
  margin-top: 10px;
  background-color: ${props => props.theme.color.BTN900};
  border-radius: 5px;
  padding: 2px 8px;
  align-self: flex-start;
  align-items: center;
  flex-direction: row;
  gap: 2px;
`;

const AccordionButtonText = styled.Text`
  color: ${props => props.theme.color.grey[100]};
  text-align: center;

  /* Text/SB14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 21px */
`;

const YearMonth = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 18px */
`;

const Section = styled.View`
  gap: 8px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${props => props.theme.color.grey[150]};
`;

const SectionBody = styled.View`
  gap: 8px;
`;

const ReportButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.color.grey[150]};
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  padding: 12px 20px;
  gap: 8px;
`;

const StudentInfo = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 18px */
`;

const Session = styled.View`
  padding: 2px 8px;
  border-radius: 50px;
  background-color: ${props => props.theme.color.grey[200]};
  justify-content: center;
  align-items: center;
`;

const SessionText = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M10 */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 15px */
`;

const NoContentContainer = styled.View`
  top: 93px;
  padding: 28px 16px;
  align-items: center;
  gap: 16px;
`;

const NoContentTitle = styled.Text`
  color: ${props => props.theme.color.grey[700]};

  /* Text/SB20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 30px */
`;

const NoContentBody = styled.Text`
  margin-top: 8px;
  color: ${props => props.theme.color.grey[700]};
  text-align: center;

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 24px */
`;

const FilterContainer = styled.View`
  position: absolute;
  z-index: 999;
  left: 20px;
  top: 41px;
  padding: 2px;
  gap: 2px;
  align-self: flex-start;

  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.color.grey[200]};
  background-color: ${props => props.theme.color.grey[100]};
`;

const FilterItem = styled.Pressable<{$pressed: boolean; $selected: boolean}>`
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-radius: 5px;

  background-color: ${props => {
    if (props.$selected) {
      return props.theme.color.blue[200];
    }
    if (props.$pressed) {
      return props.theme.color.BG100;
    }
    return props.theme.color.grey[100];
  }};
`;

const FilterItemText = styled.Text<{$selected: boolean}>`
  text-align: center;
  color: ${props =>
    props.$selected
      ? props.theme.color.blue[800]
      : props.theme.color.grey[800]};
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18.9px; /* 18.9px */
`;
