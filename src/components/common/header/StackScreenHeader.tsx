import React, {ReactNode} from 'react';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

import theme from '../../../styles/theme';
import Icon from '../icons/SvgIcon';

interface StackScreenHeaderProps {
  title?: string;
  disableBack?: boolean;
  rightButton?: ReactNode;
  onPressRightButton?: (...args: any[]) => any;
  backgroundColor?: string;
}

export default function StackScreenHeader({
  title,
  disableBack,
  rightButton,
  onPressRightButton = () => {},
  backgroundColor = theme.color.grey[100],
}: StackScreenHeaderProps) {
  const navigation = useNavigation();

  return (
    <HeaderContainer $backgroundColor={backgroundColor}>
      <Left>
        {!disableBack && (
          <GoBackButton onPress={() => navigation.goBack()}>
            <Icon name="ArrowLeft" />
          </GoBackButton>
        )}
      </Left>

      <Title>{title}</Title>

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
`;

const Left = styled.View`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

const GoBackButton = styled.Pressable`
  justify-content: center;
  align-items: center;
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
