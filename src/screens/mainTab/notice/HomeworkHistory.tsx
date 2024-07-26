import * as React from "react";
import { Image, Text } from "react-native";
import styled from '@emotion/native';

interface HomeworkHistoryProps {
    student: string;
    subject: string;
    completion: number;
}

export default function HomeworkHistory({student, subject, completion}:HomeworkHistoryProps){
  return (
    <FrameParent>
        <Parent>
          <StyledText>{student} | {subject}</StyledText>
          <Image resizeMode="cover" source={require("../../../../assets/images/arrow_rightward.png")}/>
        </Parent>
        <Group>
          <StyledText1>{completion}%</StyledText1>
          <Image resizeMode="cover" source={require("../../../../assets/images/HomeworkHistory/pinkLevel_1.png")} />
        </Group>
    </FrameParent>
  );
};

const FrameParent = styled.View`
  border-radius: 5px;
  background-color: #FFFFFF;
  flex: 1;
  padding: 12px;
  align-items: left;
`;


const Parent = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 145px;
  align-items: center;
`;

const Group = styled.View`
  flex-direction: row;
  margin-top: 4px;
`;

const StyledText = styled.Text`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  text-align: left;
  color: #192239;
  font-family: Pretendard;
`;

const StyledText1 = styled.Text`
  font-size: 32px;
  line-height: 42px;
  font-weight: 600;
  text-align: left;
  color: #192239;
  font-family: Pretendard;
`;

const ArrowIcon = styled.View`
  width: 24px;
  height: 24px;
`;

const ComponentIcon = styled.Image`
  width: 60px;
  height: 60px;
  overflow: hidden;
`;