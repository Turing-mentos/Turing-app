import React from 'react';
import styled from '@emotion/native';
import Icon from '../common/icons/SvgIcon';

interface Option {
  message: string;
  onPress: (...args: any[]) => any;
}

interface OptionScrollSelectorProps {
  title: string;
  options: Option[];
}

export default function OptionScrollSelector({
  title,
  options,
}: OptionScrollSelectorProps) {
  return (
    <Container>
      <Header>
        <Icon name="Cross" />
        <Text>{title}</Text>
      </Header>

      <ScrollOptions horizontal>
        {options.map(option => (
          <Button key={option.message} onPress={option.onPress}>
            <Text>{option.message}</Text>
          </Button>
        ))}
      </ScrollOptions>
    </Container>
  );
}

const Container = styled.View`
  gap: 4px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 1px;
`;

const Text = styled.Text`
  color: ${props => props.theme.color.grey[600]};

  /* Text/M12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 18px */
`;

const ScrollOptions = styled.ScrollView``;

const Button = styled.TouchableOpacity`
  margin-right: 8px;
  padding: 8px 16px;
  border-radius: 50px;
  background-color: ${props => props.theme.color.grey[200]};
`;
