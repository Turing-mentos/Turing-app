import React from 'react';
import styled from '@emotion/native';

import ProfileManagementSection from './profileManagement/ProfileManagementSection';
import LessonInProgressSection from './lesson/LessonInProgressSection';
import AppManagementSection from './AppManagementSection';
import SupportCustomerSection from './SupportCustomerSection';

export default function MyPage() {
  return (
    <Container>
      <ProfileManagementSection />
      <LessonInProgressSection />
      <AppManagementSection />
      <SupportCustomerSection />
    </Container>
  );
}

const Container = styled.View`
  gap: 4px;
`;
