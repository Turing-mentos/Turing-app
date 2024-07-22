import React, {useEffect, useMemo} from 'react';
import styled from '@emotion/native';
import {Animated} from 'react-native';
import Indicator from './Indicator';

const AnimatedChatBoxStyled = Animated.createAnimatedComponent(styled.View`
  align-self: flex-start;
  gap: 8px;
  padding: 16px 20px;
  border-radius: 0px 20px 20px 20px;
  background-color: ${props => props.theme.color.grey[100]};
`);

export const ChatBox = ({
  children,
  loading = false,
}: {
  children: any;
  loading?: boolean;
}) => {
  const translateY = useMemo(() => new Animated.Value(30), []);
  const opacity = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <AnimatedChatBoxStyled style={{transform: [{translateY}], opacity}}>
      {loading && <Indicator />}
      {!loading && children}
    </AnimatedChatBoxStyled>
  );
};

const AnimatedMyChatBox = Animated.createAnimatedComponent(styled.View`
  align-self: flex-end;
  max-width: 280px;
  padding: 12px 16px;
  border-radius: 20px 0px 20px 20px;
  background-color: ${props => props.theme.color.grey[700]};
`);

export const MyChatBox = ({children}: {children: any}) => {
  const translateY = useMemo(() => new Animated.Value(30), []);
  const opacity = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, opacity]);

  return (
    <AnimatedMyChatBox style={{transform: [{translateY}], opacity}}>
      {children}
    </AnimatedMyChatBox>
  );
};

export const Text = styled.Text`
  color: ${props => props.theme.color.BTN900};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

export const MyText = styled.Text`
  color: ${props => props.theme.color.grey[100]};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

const AppIconImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;

export const AppIcon = () => (
  <AppIconImage source={require('../../../assets/images/app-icon.jpg')} />
);
