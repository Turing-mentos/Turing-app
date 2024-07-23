import React from 'react';
import styled from '@emotion/native';
import useUserStore from '../../store/useUserStore';

const HomeIcon = ({state}: {state: number}) => {
  const icons: {[key: number]: any} = {
    0: require('../../../assets/images/home/homeA.png'),
    1: require('../../../assets/images/home/homeB.png'),
    2: require('../../../assets/images/home/homeC.png'),
    3: require('../../../assets/images/home/homeD.png'),
    4: require('../../../assets/images/home/homeE.png'),
  };

  return <HomeIconImage source={icons[state]} />;
};

export default function HomeInnerHeader({state}: {state: number}) {
  const user = useUserStore(v => v.user);
  const name = user.firstName;

  const text = [
    `반가워요 ${name} 쌤,\n튜링에 오신 것을 환영해요`,
    `안녕하세요 ${name} 쌤,\n오늘 수업 준비는 되셨나요?`,
    `수고했어요 ${name} 쌤,\n오늘 수업이 모두 끝났어요`,
    `좋은 하루예요 ${name} 쌤,\n다음 수업을 준비해보세요`,
    `좋은 하루예요 ${name} 쌤,\n읽지 않은 알림을 확인해보세요`,
  ];

  return (
    <Header>
      <Title>{text[state]}</Title>
      <HomeIcon state={state} />
    </Header>
  );
}

const HomeIconImage = styled.Image`
  width: 80px;
  height: 80px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/SB20 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 30px */
`;
