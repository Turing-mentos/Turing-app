import React from 'react';

import TabScreenHeader from '../common/header/TabScreenHeader';
import theme from '../../styles/theme';

export default function NoticeHeader() {
  return <TabScreenHeader title="알림장" backgroundColor={theme.color.BG100} />;
}
