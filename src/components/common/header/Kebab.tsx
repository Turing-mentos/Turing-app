import React, {useState} from 'react';
import styled from '@emotion/native';

interface KebabItem {
  title: string;
  onPress: (...args: any[]) => void;
}

interface KebabProps {
  items: KebabItem[];
}

function KebabItem({item}: {item: KebabItem}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <KebabMenuItem
      key={item.title}
      onPress={item.onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      $isPressed={isPressed}>
      <KebabMenuItemText>{item.title}</KebabMenuItemText>
    </KebabMenuItem>
  );
}

export default function Kebab({items}: KebabProps) {
  return (
    <KebabMenu>
      {items.map(item => (
        <KebabItem key={item.title} item={item} />
      ))}
    </KebabMenu>
  );
}

const KebabMenu = styled.View`
  position: absolute;
  top: 80px;
  right: 14px;

  border-radius: 5px;
  padding: 2px;
  background-color: ${props => props.theme.color.grey[100]};
`;

const KebabMenuItem = styled.Pressable<{$isPressed: boolean}>`
  padding: 8px 16px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${props =>
    props.$isPressed ? props.theme.color.BG100 : props.theme.color.grey[100]};
`;

const KebabMenuItemText = styled.Text`
  color: ${props => props.theme.color.grey[800]};
  text-align: center;

  /* Text/M14 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 21px */
`;
