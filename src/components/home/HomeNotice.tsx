import {Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from '@emotion/native';
import {Shadow} from 'react-native-shadow-2';

import LinkStatus from '../myPage/lesson/LinkStatus';
import HomeworkList from '../../screens/mainTab/notice/HomeworkList';

import {HomeAPI, Notebook} from '../../api/home';

const sampleData = {
  notebookId: 1,
  studentName: '박민영',
  subject: '영어',
  deadline: '2024-07-25T03:42:53.267Z',
  isDone: false,
  homeworkDtoList: [
    {
      homeworkId: 1,
      category: '독해',
      title: '마더텅',
      rangeType: 'ch',
      rangeStart: 3,
      rangeEnd: 5,
      content: '문풀',
      memo: '중요',
      isDone: false,
    },
    {
      homeworkId: 2,
      category: '문법',
      title: '능률',
      rangeType: 'p',
      rangeStart: 2,
      rangeEnd: 24,
      content: '문풀',
      memo: '중요',
      isDone: true,
    },
    {
      homeworkId: 3,
      category: '어휘',
      title: '수특',
      rangeType: 'ch',
      rangeStart: 3,
      rangeEnd: 5,
      content: '암기',
      memo: '중요',
      isDone: true,
    },
    {
      homeworkId: 4,
      category: 'TEST',
      title: '24년 6모',
      rangeType: 'n',
      rangeStart: 20,
      rangeEnd: 28,
      content: '분석',
      memo: '중요',
      isDone: true,
    },
  ],
};

interface HomeHomeworkProps {
  needConnect: boolean;
  studyRoomIds: number[];
}

export default function HomeNotice({
  needConnect = false,
  studyRoomIds = [],
}: HomeHomeworkProps) {
  const navigation = useNavigation();

  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  // console.log('notebooks:', notebooks);

  const sampleNotebooks = [...sampleData.homeworkDtoList];
  const hasNotebook = notebooks.length > 0;

  useEffect(() => {
    const fetchNotebooks = async () => {
      try {
        const response = await HomeAPI.getWeeklyNotebooks(studyRoomIds);
        if (response.data) {
          setNotebooks(response.data);
          // setNotebooks(sampleNotebooks);
        }
      } catch (err) {
        console.log('fetchNotebooks err:', err);
      }
    };

    fetchNotebooks();
  }, [studyRoomIds]);

  return (
    <Container>
      <Header>
        {needConnect && (
          <TitleContainer>
            <Title>숙제 리스트</Title>
            <LinkStatus status={false} role="teacher" />
          </TitleContainer>
        )}

        {!needConnect && (
          <>
            {!hasNotebook && <Title>새로운 알림장이 없어요</Title>}
            {hasNotebook && <Title>숙제 리스트</Title>}
          </>
        )}

        <Pressable onPress={() => navigation.navigate('Notice')}>
          <IconImage
            source={require('../../../assets/images/arrow_rightward_big.png')}
          />
        </Pressable>
      </Header>

      <Main>
        {(needConnect || !hasNotebook) && (
          <ContentText>학생의 실시간 숙제 현황을 확인해보세요</ContentText>
        )}

        {!needConnect && hasNotebook && (
          <ShadowContainer stretch={true} distance={3}>
            <HomeworkList {...sampleData} />
          </ShadowContainer>
        )}
      </Main>
    </Container>
  );
}

const Container = styled.View`
  padding: 16px 20px;
  border-radius: 5px;
  gap: 12px;
  background-color: ${props => props.theme.color.grey[100]};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;

const IconImage = styled.Image`
  width: 18px;
  height: 18px;
`;

const Main = styled.View`
  gap: 8px;
`;

const ContentText = styled.Text`
  color: ${props => props.theme.color.BTN900};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;

const ShadowContainer = styled(Shadow)`
  border-radius: 5px;
`;
