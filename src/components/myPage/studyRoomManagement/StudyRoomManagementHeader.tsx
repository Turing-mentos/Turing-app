import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import Modal from '../../common/Modal';
import useUserStore from '../../../store/useUserStore';
import StackScreenHeader from '../../common/header/StackScreenHeader';
import Icon from '../../common/icons/SvgIcon';
import theme from '../../../styles/theme';
import Kebab from '../../common/header/Kebab';
import DeleteStudyRoomModalContent from './DeleteStudyRoomModalContent';
import DisconnectStudyRoomModalContent from './DisconnectStudyRoomModalContent';

export default function StudyRoomManagementHeader() {
  const {role} = useUserStore(state => state.user);
  const [kebabOpen, setKebabOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [disconnectModalOpen, setDisconnectModalOpen] = useState(false);

  const openDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const closeDeleteModalOpen = () => {
    setDeleteModalOpen(false);
  };
  const openDisconnectModalOpen = () => {
    setDisconnectModalOpen(true);
  };
  const closeDisconnectModalOpen = () => {
    setDisconnectModalOpen(false);
  };

  const navigation = useNavigation();
  const route = useRoute();
  const {studyRoomId, subject, name, linkStatus} = route.params;

  const isTeacher = role === 'teacher';

  const handleToggleKebab = () => {
    setKebabOpen(prev => !prev);
  };

  const handleDeleteStudyRoom = () => {
    openDeleteModalOpen();
    handleToggleKebab();
  };

  const handleDisconnectStudyRoom = () => {
    openDisconnectModalOpen();
    handleToggleKebab();
  };

  const kebabItems = [
    {
      title: '수업 삭제하기',
      onPress: handleDeleteStudyRoom,
    },
    linkStatus && {
      title: '학생 연결 끊기',
      onPress: handleDisconnectStudyRoom,
    },
  ].filter(v => v);

  const RightButton = <Icon name="Kebab" />;

  return (
    <>
      <StackScreenHeader
        title="과외 수업 관리"
        backgroundColor={theme.color.BG100}
        rightButton={isTeacher && RightButton}
        onPressRightButton={isTeacher ? handleToggleKebab : () => {}}
      />
      {kebabOpen && <Kebab items={kebabItems} />}

      <Modal
        close={closeDeleteModalOpen}
        isVisible={deleteModalOpen}
        content={
          <DeleteStudyRoomModalContent
            name={name}
            subject={subject}
            studyRoomId={studyRoomId}
            close={closeDeleteModalOpen}
          />
        }
      />

      <Modal
        close={closeDisconnectModalOpen}
        isVisible={disconnectModalOpen}
        content={
          <DisconnectStudyRoomModalContent
            studyRoomId={studyRoomId}
            close={closeDisconnectModalOpen}
          />
        }
      />
    </>
  );
}
