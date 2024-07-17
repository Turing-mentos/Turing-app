import React, {useState} from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import Icon from '../common/icons/SvgIcon';

const routing = {
  NotificationSetting: '알림 설정',
  Account: '계정 관리하기',
  Review: '앱 스토어 리뷰 남기기',
  Contact: '서비스 문의하기',
  TermsOfUse: '서비스 이용 약관',
  PrivacyPolicy: '개인정보 처리 방침',
};

const icon = {
  NotificationSetting: 'Notification',
  Account: 'Account',
  Review: 'Review',
  Contact: 'Contact',
  TermsOfUse: 'TermsOfUse',
  PrivacyPolicy: 'Privacy',
};

interface RoutingButtonProps {
  name: keyof typeof routing;
}

export default function RoutingButton({name}: RoutingButtonProps) {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Container
      $isPressed={isPressed}
      onPress={() => {
        navigation.navigate(name);
      }}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}>
      <Icon name={icon[name]} width={24} height={24} />
      <Title>{routing[name]}</Title>
    </Container>
  );
}

const Container = styled.Pressable<{$isPressed: boolean}>`
  background-color: ${props =>
    props.$isPressed
      ? props.theme.color.grey[150]
      : props.theme.color.grey[100]};
  padding: 12px 20px;
  flex-direction: row;
  gap: 16px;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.grey[800]};

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 24px */
`;
