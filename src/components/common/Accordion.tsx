import {Image, Pressable} from 'react-native';
import React, {useState} from 'react';

import styled from '@emotion/native';

interface AccordionProps {
  title: string;
  subTitle: string;
  children: any;
}

const ArrowDown = () => (
  <Image source={require('../../../assets/images/arrow_downward.png')} />
);

const ArrowUp = () => (
  <Image source={require('../../../assets/images/arrow_upward.png')} />
);

export default function Accordion({title, subTitle, children}: AccordionProps) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(prev => !prev);
  };

  return (
    <AccordionContainer>
      <AccordionHeader>
        <AccordionTitleGroup>
          <AccordionTitle>{title}</AccordionTitle>
          <AccordionSubTitle>{subTitle}</AccordionSubTitle>
        </AccordionTitleGroup>

        <Pressable onPress={handleToggle}>
          {expanded ? <ArrowUp /> : <ArrowDown />}
        </Pressable>
      </AccordionHeader>

      {expanded && (
        <>
          <Line />
          <AccordionContent>{children}</AccordionContent>
        </>
      )}
    </AccordionContainer>
  );
}

const AccordionContainer = styled.View`
  padding: 12px 16px;
  border: 1px solid ${props => props.theme.color.grey[300]};
  border-radius: 5px;
  gap: 12px;
`;

const AccordionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AccordionTitleGroup = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

const AccordionTitle = styled.Text`
  color: ${props => props.theme.color.grey[600]};

  /* Text/R16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 24px */
`;

const AccordionSubTitle = styled.Text`
  color: var(--Main-BTN900, #192239);
  color: ${props => props.theme.color.BTN900};

  /* Text/M16 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 24px */
`;

const AccordionContent = styled.View``;

const Line = styled.View`
  height: 2px;
  background-color: ${props => props.theme.color.grey[150]};
`;
