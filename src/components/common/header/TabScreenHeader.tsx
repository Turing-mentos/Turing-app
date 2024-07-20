import React, {ReactNode} from 'react';
import styled from '@emotion/native';

import theme from '../../../styles/theme';
import {Image} from 'react-native';

interface StackScreenHeaderProps {
  title?: string;
  rightButton?: ReactNode;
  onPressRightButton?: (...args: any[]) => any;
  backgroundColor?: string;
}

export default function TabScreenHeader({
  title,
  rightButton,
  onPressRightButton = () => {},
  backgroundColor = theme.color.grey[100],
}: StackScreenHeaderProps) {
  return (
    <HeaderContainer $backgroundColor={backgroundColor}>
      {title && <Title>{title}</Title>}
      {!title && (
        <Logo
          source={require('../../../../assets/images/turing-logo-basic.png')}
        />
      )}

      <Right>
        <RightButton onPress={onPressRightButton}>{rightButton}</RightButton>
      </Right>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.View<{$backgroundColor: string}>`
  padding: 60px 20px 12px 20px;
  background-color: ${props => props.$backgroundColor};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.color.grey[150]};
`;

const Title = styled.Text`
  color: #161e33;

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;

const Right = styled.View`
  min-width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

const RightButton = styled.Pressable`
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  width: 81.497px;
  height: 28px;
`;
