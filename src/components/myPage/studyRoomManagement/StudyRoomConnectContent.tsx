import React from 'react';
import styled from '@emotion/native';
import Clipboard from '@react-native-clipboard/clipboard';
import KakaoShareLink from 'react-native-kakao-share-link';

import {showToast} from '../../common/Toast';

export default function StudyRoomConnectContent({studentName, code}) {
  const handleCopy = () => {
    try {
      Clipboard.setString(code + '');
      showToast('복사가 완료되었습니다!', 'complete');
    } catch (err) {
      showToast('복사에 실패했습니다!');
    }
  };

  const handleShare = async () => {
    try {
      await KakaoShareLink.sendFeed({
        content: {
          title: '선생님과 계정 연결하고 편하게 과외해요!',
          imageUrl:
            'https://drive.google.com/uc?id=1DdGYsIDRAMqjkJ1NpLKfyBx_XE5yry8A',
          link: {
            webUrl:
              'https://elegant-bass-d29.notion.site/Turing-b3206b2ad48f4634aa1d53e31a112ef1?pvs=4',
            mobileWebUrl:
              'https://elegant-bass-d29.notion.site/Turing-b3206b2ad48f4634aa1d53e31a112ef1?pvs=4',
          },
          description: `선생님과 연결할 코드는 ${code}입니다.\n앱에서 선생님 코드를 입력해주세요!`,
        },
        buttons: [
          {
            title: '계정 연결하러 가기',
            link: {
              androidExecutionParams: [{key: 'key1', value: 'value1'}],
              iosExecutionParams: [
                {key: 'key1', value: 'value1'},
                {key: 'key2', value: 'value2'},
              ],
            },
          },
        ],
      });
    } catch (err) {
      showToast('공유하기에 실패했습니다.');
      console.log('share error:', err);
    }
  };

  return (
    <Container>
      <ContentContainer>
        <Title>
          {studentName} 학생과 계정을 연결하고{'\n'}
          튜링을 더욱 편하게 사용해보세요!
        </Title>

        <BubbleContainer>
          <Bubble>
            <BubbleText>학생에게 선생님 코드를 전달해주세요.</BubbleText>
          </Bubble>
          <TriangleView />
        </BubbleContainer>

        <SubTitle>{studentName} 학생과의 선생님 코드</SubTitle>
        <Code>{code}</Code>
      </ContentContainer>

      <Buttons>
        <Button onPress={handleCopy}>
          <ButtonText>복사하기</ButtonText>
        </Button>
        <Button onPress={handleShare}>
          <ButtonText>공유하기</ButtonText>
        </Button>
      </Buttons>
    </Container>
  );
}

const Container = styled.View`
  height: 600px;
  padding: 20px 20px 80px 20px;
`;

const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const Title = styled.Text`
  margin-top: 50px;

  color: ${props => props.theme.color.BTN900};
  text-align: center;

  /* Text/SB20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 30px */
`;

const BubbleContainer = styled.View`
  margin-top: 46px;
  justify-content: center;
  align-items: center;
`;

const Bubble = styled.View`
  align-self: flex-start;
  padding: 12px 16px;
  border-radius: 50px;
  background-color: ${props => props.theme.color.blue[800]};
`;

const BubbleText = styled.Text`
  color: ${props => props.theme.color.grey[100]};
  text-align: center;

  /* Text/SB16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 24px */
`;

const SubTitle = styled.Text`
  margin-top: 21px;

  color: ${props => props.theme.color.grey[500]};

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 24px */
`;

const Code = styled.Text`
  margin-top: 4px;

  color: ${props => props.theme.color.BTN900};

  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 33px; /* 33px */
  text-decoration-line: underline;
`;
const TriangleView = styled.View`
  width: 0;
  height: 0;
  border-left-width: 7px;
  border-right-width: 7px;
  border-top-width: 12px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: #287eff;
`;

const Buttons = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const Button = styled.TouchableOpacity`
  padding: 14px;
  flex: 1;
  border-radius: 5px;
  background-color: ${props => props.theme.color.BTN900};
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: var(--Greyscale-100, #fefefe);
  color: ${props => props.theme.color.grey[100]};

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;
