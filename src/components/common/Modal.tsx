import {View, Pressable} from 'react-native';
import React, {ReactNode} from 'react';
import ModalLib from 'react-native-modal';
import styled from '@emotion/native';

import Icon from './icons/SvgIcon';

interface ModalProps {
  close: (...args: any[]) => any;
  isVisible: boolean;
  content: ReactNode;
}

export default function Modal({isVisible = false, close, content}: ModalProps) {
  return (
    <View>
      <ModalLib isVisible={isVisible}>
        <Container>
          <ModalContainer>
            <Header>
              <Pressable onPress={close}>
                <Icon name="Close" />
              </Pressable>
            </Header>

            <Body>{content}</Body>
          </ModalContainer>
        </Container>
      </ModalLib>
    </View>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  width: 100%;
  padding: 12px 20px 32px 20px;

  border-radius: 15px;
  background-color: ${props => props.theme.color.grey[100]};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 8px;
`;

const Body = styled.View``;
