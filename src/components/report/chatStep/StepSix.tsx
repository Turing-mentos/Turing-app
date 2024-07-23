import React, {useEffect, useContext, useState, useCallback} from 'react';
import styled from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {AppIcon, ChatBox, Text} from '../ChatComponents';
import {ReportContext} from '../ReportPage';
import useUserStore from '../../../store/useUserStore';
import {ReportAPI} from '../../../api/report';
import Icon from '../../common/icons/SvgIcon';
import {showToast} from '../../common/Toast';

export default function StepSix() {
  const {
    scrollDown,
    setInputDisabled,
    reportRequest,
    chatSteps,
    handleNextChatStep,
    handleNextReportStep,
    handleReset,
  } = useContext(ReportContext);
  const {firstName} = useUserStore(state => state.user);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [reportId, setReportId] = useState<number>();
  const [error, setError] = useState(false);

  const createReport = useCallback(async () => {
    try {
      const response = await ReportAPI.createReport(reportRequest);
      if (response.data) {
        setReportId(response.data.reportId);
      }

      setTimeout(() => {
        handleNextChatStep(5, 2);
      }, 2000);
      scrollDown();
    } catch (err) {
      showToast('리포트 생성에 실패했습니다!');
      setError(true);
      console.log('create report error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [reportRequest, scrollDown]);

  const handleCompleteReport = () => {
    navigation.navigate('ReportDetail', {
      reportId,
      name: reportRequest.name,
      subject: reportRequest.subject,
    });
  };

  useEffect(() => {
    if (chatSteps[5] === 0) {
      // ~를 위해 리포트를 생성하고 있어요.
      handleNextChatStep(5, 1);
    } else if (chatSteps[5] === 1) {
      // 유저 입력한 내용
      createReport();

      scrollDown();
    } else if (chatSteps[5] === 2) {
      // 다음 스텝 이동
    }
  }, [
    chatSteps,
    scrollDown,
    setInputDisabled,
    handleNextReportStep,
    handleNextChatStep,
    createReport,
  ]);

  return (
    <>
      {chatSteps[5] >= 0 && (
        <>
          <AppIcon />

          <ChatBox>
            <Text>
              잠시만 기다려 주세요.{'\n'}
              {firstName} 쌤을 위해 리포트를 생성하고 있어요.
            </Text>
          </ChatBox>
        </>
      )}

      {chatSteps[5] >= 1 && (
        <>
          <ChatBox loading={isLoading}>
            {!error && (
              <>
                <Text>
                  {reportRequest.name} 학생의 리포트가 완성됐어요!{'\n'}
                  확인 후 내용을 자유롭게 수정하여,{'\n'}
                  학부모님께 전달해보세요!
                </Text>

                <GoButton onPress={handleCompleteReport}>
                  <GoButtonText>완성된 리포트 보러가기</GoButtonText>
                </GoButton>
              </>
            )}
            {error && <Text>에러가 발생했습니다.</Text>}
          </ChatBox>
        </>
      )}

      {chatSteps[5] >= 2 && (
        <>
          <NewContainer colors={['#9708CC', '#287EFF']} useAngle angle={75}>
            <NewButton onPress={handleReset}>
              <Icon name="PlusButton" />
              <NewText>새로 만들기</NewText>
            </NewButton>
          </NewContainer>
        </>
      )}
    </>
  );
}

const GoButton = styled.TouchableOpacity`
  padding: 12px 27px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.BTN900};
`;

const GoButtonText = styled.Text`
  color: ${props => props.theme.color.grey[100]};

  /* Text/SB16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 24px */
`;

const NewContainer = styled(LinearGradient)`
  padding: 12px 24px;
  border-radius: 50px;
  align-self: flex-start;
  margin: 0 auto;
`;

const NewButton = styled.TouchableOpacity`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const NewText = styled.Text`
  color: ${props => props.theme.color.grey[100]};

  /* Text/SB16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 24px */
`;
