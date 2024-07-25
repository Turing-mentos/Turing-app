import * as React from "react";
import { Dimensions } from 'react-native';
import styled from '@emotion/native';
import LinearGradient from "react-native-linear-gradient";
interface ProgressBarProps {
  completionRate: number; // 0 to 100
}

export default function ProgressBar({ completionRate }: ProgressBarProps){
    const [containerWidth, setContainerWidth] = React.useState(0);

    const handleLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
    };

    // 백분율을 기반으로 실제 너비 계산
    const filledWidth = containerWidth * (completionRate / 100);

    return (
      <BarContainer onLayout={handleLayout}>
        <LinearGradient
          style={{ width: filledWidth, height: '100%', borderRadius: 2 }}
          colors={['#9708cc', '#287eff']}
          useAngle={true}
          angle={74.51}
        />
      </BarContainer>
      
    );
};

const BarContainer = styled.View`
  height: 4px;
  width: 100%;
  background-color: #e6e8f0;
  border-radius: 2px;
`;

// const FilledBar = styled.View<{ width: number }>`
//   width: ${props => `${props.width}%`};
//   background-color: #287eff;
//   height: 100%;
//   border-radius: 2px;
// `;
