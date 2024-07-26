import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  Animated,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import styled from '@emotion/native';
import {useNavigation, useRoute} from '@react-navigation/native';

import CancelButton from '../../../../assets/images/schedule/cancel.svg';
import PlusButton from '../../../../assets/images/schedule/plus.svg';
import HomeworkList from './HomeworkList.tsx';
import HomeworkHistory from './HomeworkHistory';
import {StudyRoomSummary, StudyRoomAPI} from '../../../api/studyRoom.ts';
import CustomModal from '../../../components/common/Modal.tsx';
import NewNoticeModalContent from '../../../components/notice/newNotice/NewNoticeModalContent.tsx';
import {showToast} from '../../../components/common/Toast.tsx';
import {HomeAPI, Notebook} from '../../../api/home.ts';
import {NotebookAPI} from '../../../api/notebook.ts';
import NoStudyRoom from './NoStudyRoom.tsx';
import NoNotebook from './NoNotebook.tsx';

const deviceWidth = Dimensions.get('window').width;
//test [독해] 마더텅 -> ch.3 문풀"
const sampleData = {
  notebookId: 1,
  studentName: '박민영',
  subject: '영어',
  deadline: '2024-07-25T03:42:53.267Z',
  isDone: false,
  homeworkDtoList: [
    {
      homeworkId: 1,
      category: '독해',
      title: '마더텅',
      rangeType: '챕터',
      rangeStart: 3,
      rangeEnd: 5,
      content: '문풀',
      memo: '중요',
      isDone: false,
    },
    {
      homeworkId: 2,
      category: '문법',
      title: '능률',
      rangeType: '페이지',
      rangeStart: 2,
      rangeEnd: 24,
      content: '문풀',
      memo: '중요',
      isDone: true,
    },
    {
      homeworkId: 3,
      category: '어휘',
      title: '수특',
      rangeType: '챕터',
      rangeStart: 3,
      rangeEnd: 5,
      content: '암기',
      memo: '중요',
      isDone: true,
    },
    {
      homeworkId: 4,
      category: 'TEST',
      title: '24년 6모',
      rangeType: '회차',
      rangeStart: 20,
      rangeEnd: 28,
      content: '분석',
      memo: '중요',
      isDone: true,
    },
  ],
};

export default function NoticeMainScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const widthAnim = useRef(new Animated.Value(deviceWidth - 250)).current;

  const [modalVisible, setModalVisible] = useState(false);
  const [icon, setIcon] = useState('plus');
  const [check, setCheck] = useState(true);
  const [studyRooms, setStudyRooms] = useState<StudyRoomSummary[]>([]);
  const [createdModalOpen, setCreatedModalOpen] = useState(false);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  useEffect(() => {
    if (route?.params?.isCreated) {
      setCreatedModalOpen(true);
    }
  }, [route?.params?.isCreated]);

  useEffect(() => {
    if (route?.params?.isUpdated) {
      showToast('알림장이 수정됐어요.', 'complete');
    }
  }, [route?.params?.isUpdated]);

  useEffect(() => {
    const fetchNotebooks = async () => {
      if (studyRooms.length === 0) {
        return;
      }

      try {
        const studyRoomIds = studyRooms.map(v => v.id);
        const response = await HomeAPI.getWeeklyNotebooks(studyRoomIds);
        if (response.data) {
          setNotebooks(response.data);
        }
      } catch (err) {
        console.log('fetchNotebooks err:', err);
      }
    };

    fetchNotebooks();
  }, [studyRooms]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    Animated.timing(widthAnim, {
      toValue: modalVisible === check ? deviceWidth - 250 : 55,
      duration: 100,
      useNativeDriver: false,
    }).start();
    setIcon(icon === 'plus' ? 'cancel' : 'plus'); // Toggle icon
  };

  const handleOpenConnectModal = async (studyRoomId: number) => {
    const targetStudyRoom = studyRooms.find(v => v.id === studyRoomId);
    const name = `${targetStudyRoom?.opponentLastName}${targetStudyRoom?.opponentFirstName}`;

    try {
      const response = await NotebookAPI.checkLatestNotebook(studyRoomId);
      if (!response.data) {
        throw new Error('check latest notebook error');
      }

      const {isExist, scheduleId} = response.data;

      if (isExist) {
        showToast(
          '한 회차당 하나의 알림장만 작성할 수 있어요.\n추가 숙제가 있다면 기존의 알림장을 수정해주세요.',
        );
      } else {
        navigation.navigate('NewNotice', {
          name,
          subject: targetStudyRoom?.subject,
          studyRoomId,
          scheduleId,
        });
      }
    } catch (err) {
      showToast('에러가 발생했습니다.');
      console.log('handleOpenConnectModal err', err);
    }

    setModalVisible(prev => !prev);
    setCheck(prev => !prev);
  };

  useEffect(() => {
    const fetchStudyRooms = async () => {
      try {
        const response = await StudyRoomAPI.getStudyRoomsInProgress();
        if (response.data) {
          setStudyRooms(response.data);
        }
      } catch (err) {
        console.log('fetchStudyRooms err', err);
      }
    };

    fetchStudyRooms();
  }, []);

  return (
    <>
      <Container>
        <ScrollViewContainer>
          <HomeworkListContainer>
            <ContainerHeader>
              <ContainerTitle>숙제 리스트</ContainerTitle>
              <Line />
            </ContainerHeader>

            {studyRooms.length === 0 && <NoStudyRoom />}
            {studyRooms.length > 0 && notebooks.length === 0 && <NoNotebook />}

            <HomeworkListContent>
              {notebooks.map(v => (
                <HomeworkList {...v} />
              ))}
            </HomeworkListContent>
          </HomeworkListContainer>

          <HomeworkHistoryContainer>
            <ContainerHeader>
              <ContainerTitle>숙제 히스토리</ContainerTitle>
              <Line />
            </ContainerHeader>

            <HomeworkHistoryContent>
              <HomeworkHistory
                student="박민영"
                subject="영어"
                completion={15}
              />
              <HomeworkHistory
                student="신이현"
                subject="수학"
                completion={82}
              />
            </HomeworkHistoryContent>
          </HomeworkHistoryContainer>
        </ScrollViewContainer>

        <Animated.View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity
            onPress={toggleModal}
            style={[styles.button, {bottom: deviceWidth * 0.05}]}>
            {!modalVisible ? (
              <ButtonContainer>
                <PlusButton width={24} height={24} />
                <WriteText>알림장 쓰기</WriteText>
              </ButtonContainer>
            ) : (
              <CancelButton width={24} height={24} />
            )}
          </TouchableOpacity>
        </Animated.View>
      </Container>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setIcon('plus'); // Reset icon on close
        }}>
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={toggleModal}>
          {studyRooms.map(studyRoom => (
            <TouchableOpacity
              key={studyRoom.id}
              style={[
                styles.optionButton,
                {right: deviceWidth * 0.06, bottom: deviceWidth * 0.45},
              ]}
              onPress={() => handleOpenConnectModal(studyRoom.id)}>
              <Text
                style={
                  styles.addScheduleButton
                }>{`${studyRoom.opponentLastName}${studyRoom.opponentFirstName} | ${studyRoom.subject}`}</Text>
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
      </Modal>
      <CustomModal
        isVisible={createdModalOpen}
        close={() => {
          setCreatedModalOpen(false);
        }}
        content={<NewNoticeModalContent />}
      />
    </>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.BG100};
  padding: 0 20px;
`;

const ScrollViewContainer = styled.ScrollView`
  flex: 1;
`;

const HomeworkListContainer = styled.View`
  gap: 16px;
`;

const HomeworkHistoryContainer = styled.View``;

const ContainerHeader = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const HomeworkListContent = styled.View`
  gap: 16px;
`;

const HomeworkHistoryContent = styled.View`
  margin-top: 16px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const ContainerTitle = styled.Text`
  color: ${props => props.theme.color.BTN900};

  /* Text/M18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px; /* 27px */
`;

const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${props => props.theme.color.grey[200]};
`;

const WriteText = styled.Text`
  color: ${props => props.theme.color.grey[100]};

  /* Text/SB18 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px; /* 27px */
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100px;
`;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: '#192239',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(158, 163, 180, 0.25)',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    shadowOpacity: 0.8,
    elevation: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fefefe',
    marginLeft: 8,
  },
  noticeContainer: {
    flex: 1,
  },
  addNoticeButton: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#fefefe',
    textAlign: 'left',
  },
  wrapperFlexBox: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon104Wrapper: {
    bottom: 115,
    left: 230,
    zIndex: 1000, // zIndex를 설정하여 모달 위에 표시되도록 함
    shadowColor: 'rgba(158, 163, 180, 0.25)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    borderRadius: 50,
    padding: 16,
    backgroundColor: '#192239',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  addScheduleButton: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'left',
    color: '#192239',
    fontFamily: 'Pretendard',
    fontWeight: '600',
  },
  optionButton: {
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    backgroundColor: '#F8F8F8',
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(12,14,18,0.2)',
  },
  textTypo5: {
    fontWeight: '600',
    fontFamily: 'Pretendard',
  },
  parentFlexBox2: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textTypo3: {
    fontWeight: '500',
    fontFamily: 'Pretendard',
  },
  lineViewLayout: {
    height: 1,
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
  frameSpaceBlock: {
    padding: 16,
    justifyContent: 'center',
  },
  textTypo2: {
    lineHeight: 24,
    fontSize: 16,
    textAlign: 'left',
  },
  iconLayout1: {
    width: 24,
    height: 24,
  },
  parentFlexBox1: {
    marginTop: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  frameWrapperLayout: {
    padding: 12,
    width: 169,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon104ParentLayout: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  text4: {
    fontSize: 22,
    lineHeight: 33,
    textAlign: 'left',
    color: '#192239',
  },
  parent: {
    height: 24,
    justifyContent: 'space-between',
    width: 350,
  },
  abVariation: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
    top: 0,
    height: 96,
    width: 390,
    left: '50%',
    marginLeft: -195,
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: '#f1f4fd',
  },
  text5: {
    lineHeight: 27,
    fontSize: 18,
    textAlign: 'left',
    color: '#192239',
  },
  frameItem: {
    marginLeft: 8,
    borderColor: '#e6e8f0',
    height: 1,
    flex: 1,
  },
  group: {
    width: 350,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text6: {
    fontWeight: '500',
    fontFamily: 'Pretendard',
    color: '#192239',
  },
  icon: {
    overflow: 'hidden',
  },
  frameContainer: {
    marginTop: 16,
  },
  parent7: {
    width: 145,
  },
  text25: {
    fontSize: 32,
    lineHeight: 42,
    textAlign: 'left',
    color: '#192239',
  },
  component12Icon: {
    width: 60,
    height: 60,
  },
  parent8: {
    alignItems: 'flex-end',
    width: 145,
  },
  frameParent12: {
    width: 145,
  },
  frameWrapper3: {
    backgroundColor: '#fff',
  },
  frameWrapper4: {
    marginLeft: 12,
    backgroundColor: '#fefefe',
  },
  frameParent11: {
    flexWrap: 'wrap',
    marginTop: 16,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  frameParent10: {
    marginTop: 24,
  },
  frameParent: {
    top: 112,
    left: 20,
    position: 'absolute',
  },
  notice2: {
    overflow: 'hidden',
    width: '100%',
    flex: 1,
    backgroundColor: '#f1f4fd',
  },
});
