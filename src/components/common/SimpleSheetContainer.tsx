import {Image} from 'react-native';
import React from 'react';
import styled from '@emotion/native';

interface SimpleSheetContainer {
  title: string;
  isCompleted?: boolean;
  onComplete?: () => any;
  close: () => any;
  children: any;
}

export default function SimpleSheetContainer({
  title,
  isCompleted,
  onComplete,
  close,
  children,
}: SimpleSheetContainer) {
  const onPress = () => {
    if (onComplete) {
      onComplete();
    }
    close();
  };

  return (
    <Container>
      <Header>
        <CloseButton onPress={close}>
          <Image source={require('../../../assets/images/close.png')} />
        </CloseButton>
        <Title>{title}</Title>
        {onComplete ? (
          <CompleteButton onPress={onPress}>
            <CompleteButtonText $isCompleted={isCompleted}>
              완료
            </CompleteButtonText>
          </CompleteButton>
        ) : (
          <EmptyView />
        )}
      </Header>

      <Line />

      <Body>{children}</Body>
    </Container>
  );
}

const Container = styled.View`
  padding: 16px 20px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.View`
  margin-top: 20px;
`;

const CloseButton = styled.Pressable``;

const Title = styled.Text`
  color: var(--Main-BTN900, #192239);
  color: ${props => props.theme.color.BTN900};

  /* Text/M16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;

const CompleteButton = styled.Pressable``;

const CompleteButtonText = styled.Text<{$isCompleted?: boolean}>`
  color: ${props =>
    !props.$isCompleted
      ? props.theme.color.grey[500]
      : props.theme.color.blue[800]};

  /* Text/M16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;

const Line = styled.View`
  height: 1px;
  background-color: ${props => props.theme.color.grey[150]};
`;

const EmptyView = styled.View`
  width: 24px;
`;
