import {AppleButton} from '@invertase/react-native-apple-authentication';
import React from 'react';

import useSignIn from '../../hooks/useSignIn';

export default function AppleLoginButton() {
  const {handleSignInApple} = useSignIn();

  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: '100%',
        height: 45,
      }}
      buttonText="Apple 계정으로 로그인"
      onPress={handleSignInApple}
    />
  );
}
