import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';
import {format} from 'date-fns';

import Icon from '../../common/icons/SvgIcon';
import {ReportAPI, ReportSummary} from '../../../api/report';

interface GroupedReports {
  [yearMonth: string]: ReportSummary[];
}

const groupReportsByMonth = (
  targetReports: ReportSummary[],
): GroupedReports => {
  return targetReports.reduce((acc: GroupedReports, report: ReportSummary) => {
    const yearMonth = format(new Date(report.createdAt), 'yyyy-MM');

    if (!acc[yearMonth]) {
      acc[yearMonth] = [];
    }

    acc[yearMonth].push(report);
    return acc;
  }, {});
};

export default function PrevReportPage() {
  const [reports, setReports] = useState<ReportSummary[]>([]);

  const groupedReports = groupReportsByMonth(reports);
  console.log(groupedReports);

  /**
   * TODO
   *
   * 각 리포트별 버튼 생성
   * 월 마다 나누기
   * 필터링
   */

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

  return (
    <Container>
      <AccordionButton>
        <AccordionButtonText>전체</AccordionButtonText>
        <Icon name="ArrowDownwardWhite" />
      </AccordionButton>
      <Text>PrevReportPage</Text>
      <ScrollContainer></ScrollContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.grey[100]};
  padding: 0 20px;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

const AccordionButton = styled.TouchableOpacity`
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
