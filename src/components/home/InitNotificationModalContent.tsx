import React from 'react';
import styled from '@emotion/native';

import Button from '../common/Button';

interface InitNotificationModalContent {
  onConfirm: () => any;
  onCancel: () => any;
}

export default function InitNotificationModalContent({
  onConfirm,
  onCancel,
}: InitNotificationModalContent) {
  return (
    <Container>
      <Title>
        푸시 알림을 ON 하시면,{'\n'}
        튜링을 더 편하게 이용하실 수 있어요.
      </Title>

      <Buttons>
        <Button label="알림 받기" onPress={onConfirm} />
        <NoStyleButton onPress={onCancel}>
          <NoStyleButtonText>나중에</NoStyleButtonText>
        </NoStyleButton>
      </Buttons>
    </Container>
  );
}

const Container = styled.View`
  padding: 40px 20px;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};
  padding: 0 10px;

  /* Text/SB20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 30px */
`;

const Buttons = styled.View`
  margin-top: 24px;
  padding: 4px;
  gap: 4px;
`;

const NoStyleButton = styled.TouchableOpacity`
  padding: 14px;
  border-radius: 5px;
`;

const NoStyleButtonText = styled.Text`
  color: ${props => props.theme.color.grey[500]};
  text-align: center;

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;
