import React from 'react';
import ToastLibrary from 'react-native-toast-message';
import styled from '@emotion/native';
import Icon from './icons/SvgIcon';

const toastConfig = {
  info: ({text1}: {text1: string}) => (
    <InfoContainer>
      <Icon name="Information" />
      <InfoText>{text1}</InfoText>
    </InfoContainer>
  ),
};

export default function Toast() {
  return <ToastLibrary type="info" config={toastConfig} topOffset={100} />;
}

const InfoContainer = styled.View`
  padding: 12px 16px;
  border-radius: 5px;
  background-color: ${props => props.theme.color.BTN900};
  width: 350px;

  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const InfoText = styled.Text`
  color: ${props => props.theme.color.grey[100]};

  /* Text/SB14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px; /* 21px */
`;
