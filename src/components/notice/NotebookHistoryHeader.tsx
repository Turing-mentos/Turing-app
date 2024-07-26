import React from 'react';
import StackScreenHeader from '../common/header/StackScreenHeader';
import theme from '../../styles/theme';

export default function NotebookHistoryHeader() {
  return (
    <StackScreenHeader
      title="숙제 히스토리"
      backgroundColor={theme.color.BG100}
    />
  );
}
