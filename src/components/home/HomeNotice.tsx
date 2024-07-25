import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from '@emotion/native';
import LinkStatus from '../myPage/lesson/LinkStatus';

interface HomeHomeworkProps {
  needConnect: boolean;
}

export default function HomeNotice({needConnect = true}: HomeHomeworkProps) {
  const navigation = useNavigation();
  const homework = [];
  const hasHomework = homework.length > 0;

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
            {!hasHomework && <Title>새로운 알림장이 없어요</Title>}
            {hasHomework && <Title>숙제 리스트</Title>}
          </>
        )}

        <Pressable onPress={() => navigation.navigate('Notice')}>
          <IconImage
            source={require('../../../assets/images/arrow_rightward_big.png')}
          />
        </Pressable>
      </Header>

      <Main>
        {needConnect && (
          <ContentText>학생의 실시간 숙제 현황을 확인해보세요</ContentText>
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
