import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';

import useUserStore from '../../store/useUserStore';
import NoStudyRoom from './NoStudyRoom';
import HomeInnerHeader from './HomeInnerHeader';

export default function HomePage() {
  const user = useUserStore(state => state.user);
  const [headerState, setHeaderState] = useState(0);

  useEffect(() => {}, []);

  return (
    <Container>
      <HomeInnerHeader state={0} />

      <Main>
        <NoStudyRoom />
      </Main>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.BG100};
`;

const Main = styled.View`
  padding: 20px;
`;
