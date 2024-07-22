import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import styled from '@emotion/native';
import {format} from 'date-fns';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from '../../common/Toast';

import Icon from '../../common/icons/SvgIcon';
import {ReportAPI, ReportDetail} from '../../../api/report';

const Section = ({
  title,
  content,
  onChange,
}: {
  title: string;
  content?: string;
  onChange: (text: string) => void;
}) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent
        value={content}
        onChangeText={onChange}
        multiline
        textAlignVertical="top"
      />
    </SectionContainer>
  );
};

export default function ReportDetailPage() {
  const route = useRoute();
  const {reportId, name, subject} = route.params;
  const [report, setReport] = useState<ReportDetail>({
    reportId: 0,
    opening: '',
    studyProgress: '',
    feedback: '',
    money: '',
    closing: '',
    createdAt: '',
    updatedAt: '',
  });

  const handleCopy = () => {
    try {
      const content = [
        report.opening,
        report.studyProgress,
        report.feedback,
        report.money,
        report.closing,
      ].join('\n');
      Clipboard.setString(content);
      showToast('리포트 내용이 복사됐어요!', 'complete');
    } catch (err) {
      showToast('복사에 실패했습니다!');
    }
  };

  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const response = await ReportAPI.getReportDetail(reportId);
        if (response.data) {
          setReport(response.data);
        }
      } catch (err) {
        console.log('fetchReportDetail err:', err);
      }
    };

    fetchReportDetail();
  }, [reportId]);

  const handleContentChange = (key: keyof ReportDetail, text: string) => {
    setReport(prev => ({...prev, [key]: text}));
  };

  return (
    <Container>
      {report.createdAt && (
        <>
          <Header>
            <Title>
              {name} | {subject}
            </Title>

            <DateContainer>
              <Icon name="ReportCalendar" />
              <DateText>
                {format(new Date(report?.createdAt), 'yyyy-MM-dd')}
              </DateText>
            </DateContainer>
          </Header>

          <Body>
            <BodyContainer>
              <Section
                title="인사말"
                content={report.opening}
                onChange={text => handleContentChange('opening', text)}
              />
              <Section
                title="지난 회차 리뷰"
                content={report.studyProgress}
                onChange={text => handleContentChange('studyProgress', text)}
              />
              <Section
                title="학생 피드백"
                content={report.feedback}
                onChange={text => handleContentChange('feedback', text)}
              />
              <Section
                title="과외비"
                content={report.money}
                onChange={text => handleContentChange('money', text)}
              />
              <Section
                title="마무리"
                content={report.closing}
                onChange={text => handleContentChange('closing', text)}
              />

              <Footer>
                <Introduce>
                  텍스트를 복사하여{'\n'}학부모님께 리포트를 전달해보세요!
                </Introduce>

                <Button onPress={handleCopy}>
                  <Icon name="Copy" />
                  <ButtonText>전체 내용 복사하기</ButtonText>
                </Button>
              </Footer>
            </BodyContainer>
          </Body>
        </>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  background-color: ${props => props.theme.color.grey[100]};
  padding: 12px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const DateContainer = styled.View`
  padding: 4px 8px;
  border-radius: 5px;
  flex-direction: row;
  background-color: ${props => props.theme.color.BG100};
`;

const DateText = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;

const Body = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background-color: ${props => props.theme.color.BG100};
`;

const BodyContainer = styled.View`
  gap: 12px;
`;

const SectionContainer = styled.View`
  border-radius: 5px;
  background-color: ${props => props.theme.color.grey[100]};
  padding: 16px;
  gap: 12px;
`;

const SectionTitle = styled.Text`
  color: ${props => props.theme.color.grey[500]};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;

const SectionContent = styled.TextInput`
  color: ${props => props.theme.color.BTN900};

  /* Text/R14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 21px */
`;

const Introduce = styled.Text`
  color: ${props => props.theme.color.BTN900};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;

const Footer = styled.View`
  padding: 80px 0;
  gap: 24px;
`;

const Button = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: ${props => props.theme.color.BTN900};
  padding: 14px;
  align-items: center;
  justify-content: center;

  flex-direction: row;
  gap: 8px;
`;

const ButtonText = styled.Text`
  color: #fefefe;

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;
