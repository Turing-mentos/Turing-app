import React from 'react';
import styled from '@emotion/native';

export const ChatBox = styled.View`
  align-self: flex-start;
  gap: 8px;
  padding: 16px 20px;
  border-radius: 0px 20px 20px 20px;
  background-color: ${props => props.theme.color.grey[100]};
`;

export const MyChatBox = styled.View`
  align-self: flex-end;
  padding: 12px 16px;
  border-radius: 20px 0px 20px 20px;
  background-color: ${props => props.theme.color.grey[700]};
`;

export const Text = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;

export const MyText = styled.Text`
  color: ${props => props.theme.color.grey[100]};

  /* Text/M16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;

const AppIconImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;

export const AppIcon = () => (
  <AppIconImage source={require('../../../assets/images/app-icon.jpg')} />
);
