import React from 'react';
import styled from '@emotion/native';

import Icon from '../../common/icons/SvgIcon';
import {Role} from '../../../store/useUserStore';

interface LinkStatusProps {
  status: boolean;
  role: Role;
}

export default function LinkStatus({status, role}: LinkStatusProps) {
  const target = role === 'teacher' ? '학생' : '선생님';
  const completed = status ? '연결 완료' : '연결 필요';

  return (
    <Container $checked={status}>
      <Icon name={status ? 'Checked' : 'Unchecked'} width={16} height={16} />
      <Title $checked={status}>{`${target} ${completed}`}</Title>
    </Container>
  );
}

const Container = styled.View<{$checked: boolean}>`
  align-self: flex-start;
  padding: 2px 8px;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  border-radius: 50px;
  background: ${props =>
    props.$checked ? props.theme.color.blue[200] : props.theme.color.grey[200]};
`;

const Title = styled.Text<{$checked: boolean}>`
  color: ${props =>
    props.$checked ? props.theme.color.blue[800] : props.theme.color.grey[600]};
  text-align: center;

  /* Text/SB12 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 18px */
`;
