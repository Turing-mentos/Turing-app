import styled from '@emotion/native';
import React from 'react';

// function FirstComponent() {
//   return <h1>부담감 내리고 효율성 올리고</h1>;
// }

// function SecondComponent() {
//   return <h1>과외 쌤을 위한 친절한 알리미, 튜링</h1>;
// }

// function LogoComponent() {
//   return <Logo source={require('../../assets/images/turing_logo.png')} />;
// }

export default function Loading() {
  return <Logo source={require('../../../assets/images/turing_logo.png')} />;
}

const Logo = styled.Image``;
