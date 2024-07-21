import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';
import {useRoute} from '@react-navigation/native';

import ProfileManagementSection from './profileManagement/ProfileManagementSection';
import LessonInProgressSection from './lesson/LessonInProgressSection';
import AppManagementSection from './AppManagementSection';
import SupportCustomerSection from './SupportCustomerSection';
import Modal from '../common/Modal';
import ConnectSuccessModalContent from './studyRoomManagement/ConnectSuccessModalContent';

export default function MyPage() {
  const route = useRoute();

  const [connectedModalOpen, setConnectedModalOpen] = useState(false);
  const [teacherProfile, setTeacherProfile] = useState({
    subject: '',
    teacherFirstName: '',
    teacherLastName: '',
  });

  useEffect(() => {
    if (route.params?.connected && route.params?.teacherProfile) {
      setConnectedModalOpen(true);
      setTeacherProfile(route.params.teacherProfile);
    }
  }, [route.params]);

  return (
    <>
      <Container>
        <ProfileManagementSection />
        <LessonInProgressSection />
        <AppManagementSection />
        <SupportCustomerSection />
      </Container>

      <Modal
        close={() => setConnectedModalOpen(false)}
        isVisible={connectedModalOpen}
        content={
          <ConnectSuccessModalContent
            name={
              teacherProfile.teacherLastName + teacherProfile.teacherFirstName
            }
            subject={teacherProfile.subject}
          />
        }
      />
    </>
  );
}

const Container = styled.View`
  gap: 4px;
`;
