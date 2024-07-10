import {View, Text, Dimensions} from 'react-native';
import React, {useState, useRef} from 'react';
import styled from '@emotion/native';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';

import SliderState from './SliderState';
import OnboardingSlide from './OnboardingSlide';
import DefaultButton from '../buttons/DefaultButton';

export default function Onboarding() {
  const [slide, setSlide] = useState(0);
  const entries = [0, 1, 2, 3, 4];

  const navigation = useNavigation();
  const swiperRef = useRef(null);

  function goToNextSlide() {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
      setSlide(prev => prev + 1);
    }
  }

  function goToHome() {
    navigation.navigate('MainTab');
  }

  return (
    <Container>
      <SliderStateContainer>
        <SliderState maxLength={entries.length} current={slide} />
      </SliderStateContainer>

      <SlideContainer
        ref={swiperRef}
        loop={false}
        showsPagination={false}
        onIndexChanged={index => {
          setSlide(index);
        }}>
        <OnboardingSlide slide={0} />
        <OnboardingSlide slide={1} />
        <OnboardingSlide slide={2} />
        <OnboardingSlide slide={3} />
        <OnboardingSlide slide={4} />
      </SlideContainer>

      <ButtonContainer>
        <DefaultButton
          type="normal"
          label={slide === entries.length - 1 ? '튜링 시작하기' : '다음'}
          onPress={slide === entries.length - 1 ? goToHome : goToNextSlide}
        />
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const SliderStateContainer = styled.View`
  margin-top: 70px;
  align-items: center;
`;

const SlideContainer = styled(Swiper)`
  margin-top: 8px;
`;

const ButtonContainer = styled.View`
  margin-bottom: 80px;
  padding: 0 20px;
`;
