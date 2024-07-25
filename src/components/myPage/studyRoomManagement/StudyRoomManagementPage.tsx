import React, {useState, useEffect, useCallback} from 'react';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import styled from '@emotion/native';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useSimpleSheet, SimpleSheet} from 'react-native-simple-sheet';

import useUserStore from '../../../store/useUserStore';
import {StudyRoomAPI, StudyRoomDetail} from '../../../api/studyRoom';
import LinkStatus from '../lesson/LinkStatus';
import Icon from '../../common/icons/SvgIcon';
import SimpleSheetContainer from '../../common/SimpleSheetContainer';
import StudyRoomConnectContent from './StudyRoomConnectContent';

interface Time {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

const convertDay = ['월', '화', '수', '목', '금', '토', '일'];
const convertTime = (time: Time) => {
  const {hour, minute} = time;
  const meridiem = hour < 12 ? '오전' : '오후';
  const convertedHour = hour % 12 === 0 ? 12 : hour % 12;
  const convertedMinute = minute < 10 ? '0' + minute : minute;
  return `${meridiem} ${convertedHour}:${convertedMinute}`;
};

export default function StudyRoomManagementPage() {
  const [studyRoomDetail, setStudyRoomDetail] = useState<StudyRoomDetail>();
  const [code, setCode] = useState<number>();
  const {role} = useUserStore(state => state.user);
  const sheet = useSimpleSheet();
  const navigation = useNavigation();
  const route = useRoute();
  const {studyRoomId, linkStatus} = route.params;

  const name = `${studyRoomDetail?.oppositeLastName}${studyRoomDetail?.oppositeFirstName}`;
  const title =
    role === 'teacher'
      ? `${name} | ${studyRoomDetail?.subject}`
      : `${studyRoomDetail?.subject} | ${name}T`;
  const schoolInfo = `${studyRoomDetail?.studentSchool} ${studyRoomDetail?.studentYear}`;
  const day = studyRoomDetail?.studyTimes
    .map(studyTime => convertDay[studyTime.day])
    .join(',');
  const studyTimes =
    studyRoomDetail?.studyTimes.length > 1
      ? studyRoomDetail?.studyTimes
          .map(
            studyTime =>
              `(${convertDay[studyTime.day]}) ${convertTime(
                studyTime.startTime,
              )} ~ ${convertTime(studyTime.endTime)}`,
          )
          .join('\n')
      : studyRoomDetail?.studyTimes
          .map(
            studyTime =>
              `${convertTime(studyTime.startTime)} ~ ${convertTime(
                studyTime.endTime,
              )}`,
          )
          .join('\n');
  const baseSession = studyRoomDetail?.baseSession + '회차';
  const firstScheduleDate = studyRoomDetail?.firstSchedule
    ? new Date(studyRoomDetail?.firstSchedule)
    : new Date();
  const firstScheduleDay = (firstScheduleDate.getDay() + 6) % 7;
  const startDate =
    format(firstScheduleDate, 'yyyy.MM.dd') +
    `(${convertDay[firstScheduleDay]})`;
  const wage = studyRoomDetail?.wage.toLocaleString() + '원';
  const curSession = studyRoomDetail?.curSession + '회차';
  const curBaseSession = studyRoomDetail?.curBaseSession + '회차';
  const totalSession = studyRoomDetail?.totalSession + '회차';
  const totalBaseSession = studyRoomDetail?.totalBaseSession + '회차';

  const handleOpenConnectModal = () => {
    sheet.open(props => (
      <SimpleSheet {...props}>
        <SimpleSheetContainer title="학생 계정 연결" close={props.close}>
          <StudyRoomConnectContent
            studentName={
              studyRoomDetail?.oppositeLastName +
              studyRoomDetail?.oppositeFirstName
            }
            code={code}
          />
        </SimpleSheetContainer>
      </SimpleSheet>
    ));
  };

  useFocusEffect(
    useCallback(() => {
      const fetchStudyRoomDetail = async () => {
        try {
          const response = await StudyRoomAPI.getStudyRoomDetail(studyRoomId);
          if (response.data) {
            setStudyRoomDetail(response.data);
          }
        } catch (err) {
          console.log('fetchStudyRoomDetail error:', err);
        }
      };

      const fetchStudyRoomCode = async () => {
        try {
          const response = await StudyRoomAPI.generateStudyRoomCode(
            studyRoomId,
          );
          if (response.data) {
            setCode(response.data);
          }
        } catch (err) {
          console.log('fetchStudyRoomCode error:', err);
        }
      };

      fetchStudyRoomDetail();
      fetchStudyRoomCode();
    }, [studyRoomId]),
  );

  return (
    <Container>
      {studyRoomDetail && (
        <>
          {!linkStatus && (
            <RecommendButton onPress={handleOpenConnectModal}>
              <RecommendContainer
                colors={['#9708CC', '#287EFF']}
                useAngle
                angle={88}>
                <RecommendText>{`학생 계정을 연결하면\n튜링을 더 효과적으로 사용할 수 있어요!`}</RecommendText>
                <Icon name="ArrowRightWhite" width={24} height={24} />
              </RecommendContainer>
            </RecommendButton>
          )}

          <Section>
            <Header>
              <TitleGroup>
                <Title>{title}</Title>
                {role === 'teacher' && <Grade>{schoolInfo}</Grade>}
              </TitleGroup>
              <StatusContainer>
                <LinkStatus role={role} status={linkStatus} />
              </StatusContainer>
            </Header>

            <Line />

            <Body>
              <ContentGroup>
                <Label>요일</Label>
                <Content>{day}</Content>
              </ContentGroup>

              <ContentGroup>
                <Label>시간</Label>
                <Content>{studyTimes}</Content>
              </ContentGroup>

              <ContentGroup>
                <Label>기준 회차</Label>
                <Content>{baseSession}</Content>
              </ContentGroup>

              <ContentGroup>
                <Label>수업 시작일</Label>
                <Content>{startDate}</Content>
              </ContentGroup>

              {role === 'teacher' && (
                <ContentGroup>
                  <Label>시간당 급여</Label>
                  <Content>{wage}</Content>
                </ContentGroup>
              )}
            </Body>
          </Section>

          {role === 'teacher' && (
            <UpdateButton
              onPress={() =>
                navigation.navigate('UpdateLesson', {
                  studyRoomDetail,
                  studyRoomId,
                  linkStatus,
                })
              }>
              <UpdateButtonText>수업 편집하기</UpdateButtonText>
            </UpdateButton>
          )}

          <Section>
            <ContentGroup>
              <Label>현재 회차</Label>
              <Content>
                {curSession}
                <SubContent> / {curBaseSession}</SubContent>
              </Content>
            </ContentGroup>

            <ContentGroup>
              <Label>총 회차</Label>
              <Content>
                {totalSession}
                <SubContent> / {totalBaseSession}</SubContent>
              </Content>
            </ContentGroup>
          </Section>
        </>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  gap: 20px;

  background-color: ${props => props.theme.color.BG100};
`;

const Section = styled.View`
  padding: 20px;
  gap: 8px;

  border-radius: 5px;
  background-color: ${props => props.theme.color.grey[100]};
`;

const StatusContainer = styled.View`
  align-self: flex-start;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleGroup = styled.View``;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 30px */
`;

const Grade = styled.Text`
  color: ${props => props.theme.color.grey[700]};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;

const Line = styled.View`
  height: 2px;
  background-color: ${props => props.theme.color.grey[150]};
`;

const Body = styled.View`
  gap: 8px;
`;

const Label = styled.Text`
  color: ${props => props.theme.color.grey[600]};

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 24px */
`;

const Content = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;

const ContentGroup = styled.View`
  flex-direction: row;
  /* align-items: center; */
  gap: 8px;
`;

const UpdateButton = styled.Pressable`
  align-self: flex-start;
  margin: 0 auto;
  padding: 8px 20px;
  margin-top: -8px;

  border-radius: 50px;
  background-color: ${props => props.theme.color.grey[100]};
`;

const UpdateButtonText = styled.Text`
  color: ${props => props.theme.color.grey[600]};

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 21px */
`;

const SubContent = styled.Text`
  color: ${props => props.theme.color.grey[500]};

  /* Text/M16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

const RecommendButton = styled.Pressable`
  margin-bottom: 20px;
`;

const RecommendContainer = styled(LinearGradient)`
  padding: 12px 20px;

  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RecommendText = styled.Text`
  color: ${props => props.theme.color.grey[100]};

  /* Text/SB16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 24px */
`;
