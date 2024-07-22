import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const interval = 180;

export default function Indicator() {
  const [steps, setSteps] = useState([0, 1, 2]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSteps(prev => prev.map(v => (v + 2) % 3));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <IndicatorContainer>
      <AnimatedCircle step={steps[0]} />
      <AnimatedCircle step={steps[1]} />
      <AnimatedCircle step={steps[2]} />
    </IndicatorContainer>
  );
}

const IndicatorContainer = styled.View`
  flex-direction: row;
  gap: 4px;
  justify-content: center;
  align-items: center;
  width: 24px; /* 적절한 넓이로 변경 */
  height: 20px;
`;

const AnimatedCircle = ({step}) => {
  const size = useSharedValue(4);

  useEffect(() => {
    size.value = withTiming(step === 1 ? 6 : 4, {
      duration: interval,
      easing: Easing.inOut(Easing.ease),
    });
  }, [step]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: size.value,
      height: size.value,
    };
  });

  return (
    <CircleWrapper>
      <Circle style={animatedStyle} step={step} />
    </CircleWrapper>
  );
};

const CircleWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 6px;
  height: 6px;
`;

const Circle = styled(Animated.View)<{step: number}>`
  border-radius: 4px;
  background-color: ${props => {
    switch (props.step) {
      case 0:
        return props.theme.color.grey[600];
      case 1:
        return props.theme.color.BTN900;
      case 2:
        return props.theme.color.grey[400];
    }
  }};
`;
