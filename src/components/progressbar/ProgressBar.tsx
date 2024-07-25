import React from 'react';
import styled from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';

type ProgressBarProps = {
  maxNum: number;
  currentCredit: number;
};

const calculatePercentage = (
  currentNum: number,
  totalNum: number,
  adjustNum?: number,
) => `${((currentNum / totalNum) * 100 - (adjustNum ?? 0)).toFixed(2)}`;

const ProgressBar = ({maxNum, currentCredit}: ProgressBarProps) => {
  const currentCreditPercentage = calculatePercentage(currentCredit, maxNum);
  return (
    <TotalProgressBar>
      <CurrentProgressBar
        colors={['#9708CC', '#287EFF']}
        useAngle
        angle={75}
        sidePosition={currentCreditPercentage}
      />
      <CurrentCreditDescription sidePosition={currentCreditPercentage} />
    </TotalProgressBar>
  );
};

export default ProgressBar;

const TotalProgressBar = styled.View`
  flex: 1;
  position: relative;
  height: 4px;
  width: 100%;
  border-radius: 8px;
  background-color: #e6e8f0;
`;

const CurrentProgressBar = styled(LinearGradient)<{
  sidePosition: string;
}>`
  position: absolute;
  left: 0;
  top: 0;
  height: 4px;
  width: ${({sidePosition}) => `${sidePosition}%`};
  min-width: 0;
  max-width: 100%;
  border-radius: 2px;

  // TODO: 그라데이션 적용 필요
  background-color: #9708cc;
`;

const CurrentCreditDescription = styled.View<{
  sidePosition: string;
}>`
  position: absolute;
  left: ${({sidePosition}) => `${sidePosition}%`};
  top: -30px;
`;
