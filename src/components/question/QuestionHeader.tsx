import React from 'react';

import TabScreenHeader from '../common/header/TabScreenHeader';
import theme from '../../styles/theme';

export default function QuestionHeader() {
  return <TabScreenHeader title="질문" backgroundColor={theme.color.BG100} />;
}
