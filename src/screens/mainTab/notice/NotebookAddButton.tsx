import React, { useRef, useState } from 'react';
import { Animated, TouchableOpacity, Modal, Text, StyleSheet, View, Dimensions } from 'react-native';
import CancelButton from '../../../../assets/images/schedule/cancel.svg'
import PlusButton from '../../../../assets/images/schedule/plus.svg'
const deviceWidth = Dimensions.get('window').width; // 디바이스 너비 가져오기
import SimpleSheetContainer from '../../../components/common/SimpleSheetContainer.tsx';
import NoticeWriteScreen from './NoticeWriteScreen.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useSimpleSheet, SimpleSheet} from 'react-native-simple-sheet';

export default function NotebookAddButton() {
  const insets = useSafeAreaInsets();
  const sheet = useSimpleSheet();
  const [modalVisible, setModalVisible] = useState(false);
  const widthAnim = useRef(new Animated.Value(deviceWidth - 40)).current; // 초기 버튼 너비 설정
  const [icon, setIcon] = React.useState('plus');
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    if (!modalVisible) {
      // 모달을 열 때
      Animated.timing(widthAnim, {
        toValue: 100, // 버튼 너비를 100으로 줄임
        duration: 300,
        useNativeDriver: false
      }).start();
    } else {
      // 모달을 닫을 때
      Animated.timing(widthAnim, {
        toValue: deviceWidth - 40, // 버튼 너비를 원래대로 확장
        duration: 300,
        useNativeDriver: false
      }).start();
    }
  };
  const handleOpenConnectModal = () => {
    sheet.open(props => (
      <View style={{flex: 1}}>
      <SimpleSheet {...props}>
        <SimpleSheetContainer title="숙제 1" close={props.close}>
          <NoticeWriteScreen/>
        </SimpleSheetContainer>
      </SimpleSheet>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ width: widthAnim, alignSelf: 'flex-end' }}>
        <TouchableOpacity onPress={toggleModal} style={[styles.icon104Wrapper, styles.wrapperFlexBox, {bottom: insets.bottom + 10}]}>
          {icon === 'plus' ? <PlusButton width={24} height={24} /> : <CancelButton width={24} height={24} />}
          {icon === 'plus' ? <Text style = {styles.addNoticeButton}> 알림장 쓰기 </Text> : <Text></Text>}
        </TouchableOpacity>
      </Animated.View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setIcon('plus'); // 모달 닫힐 때 아이콘을 다시 플러스로 설정
        }}>
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
            setIcon('plus'); // 외부를 탭할 때 모달을 닫고 아이콘을 플러스로 설정
          }}>
            <TouchableOpacity
              style={[styles.optionButton, {right: insets.right - 90, bottom: insets.bottom -200}]}
              onPress={handleOpenConnectModal}>
              <Text style = {styles.addScheduleButton}>박민영 | 영어</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, {right: insets.right - 90, bottom: insets.bottom -200}]}
              onPress={handleOpenConnectModal}>
              <Text style = {styles.addScheduleButton}>신이영 | 국어</Text>
            </TouchableOpacity>
            
        </TouchableOpacity>
        </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
    wrapperFlexBox: {
        justifyContent: "center",
        overflow: "hidden"
      },
      icon104Wrapper: {
        bottom: 115,
        left: 230,
        zIndex: 1000, // zIndex를 설정하여 모달 위에 표시되도록 함
        shadowColor: "rgba(158, 163, 180, 0.25)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 10,
        elevation: 10,
        shadowOpacity: 1,
        borderRadius: 50,
        padding: 16,
        backgroundColor: "#192239",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute"
       },
    addNoticeButton: {
        fontSize: 18,
        lineHeight: 27,
        fontWeight: "600",
        fontFamily: "Pretendard",
        color: "#fefefe",
        textAlign: "left"
  },
    addScheduleButton: {
        fontSize: 18,
        lineHeight: 24,
        textAlign: "left",
        color: "#192239",
        fontFamily: "Pretendard",
        fontWeight: "600"
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    noticeContainer: {
        flex: 1,
        backgroundColor: "#f1f4fd"
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    buttonWrapper: {
        bottom: 20,
        position: "absolute",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 50,
        padding: 16,
        backgroundColor: "#192239",
        shadowColor: "rgba(158, 163, 180, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10
    },
    buttonText: {
        fontSize: 18,
        lineHeight: 27,
        fontWeight: "600",
        fontFamily: "Pretendard",
        color: "#fefefe",
    },
    optionButton: {
        borderRadius: 15,
        padding: 15,
        backgroundColor: '#F8F8F8',
        marginBottom: 10,
    }
});
