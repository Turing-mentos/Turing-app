import {KeyboardAvoidingView, Keyboard, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';

const KeyboardAvoid = ({
  children,
  aosOffset = 0,
}: {
  children: any;
  aosOffset?: number;
}) => {
  const [keyboardHeight, setKeyboardHeight] = useState(336);

  useEffect(() => {
    const handleKeyboardShow = e => {
      setKeyboardHeight(e.endCoordinates.height);
    };

    const keyboardShowListener = Keyboard.addListener(
      'keyboardWillShow',
      handleKeyboardShow,
    );

    return () => {
      keyboardShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? keyboardHeight / 3.4 + 8 : aosOffset
      }
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoid;
