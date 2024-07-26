import * as React from "react";
import {Animated, Modal, TouchableOpacity, ScrollView,Image, StyleSheet, Text, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CancelButton from '../../../../assets/images/schedule/cancel.svg'
import PlusButton from '../../../../assets/images/schedule/plus.svg'
import {useSimpleSheet, SimpleSheet} from 'react-native-simple-sheet';
import SimpleSheetContainer from '../../../components/common/SimpleSheetContainer.tsx';
import NoticeWriteScreen from './NoticeWriteScreen.tsx';
import HomeworkList from './HomeworkList.tsx';
import HomeworkHistory from './HomeworkHistory';
const Notice = () => {
  const sheet = useSimpleSheet();

  const handleOpenConnectModal = () => {
    sheet.open(props => (
      <SimpleSheet {...props}>
        <SimpleSheetContainer title="숙제 1" close={props.close}>
          <NoticeWriteScreen/>
        </SimpleSheetContainer>
      </SimpleSheet>
    ));
  };
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
        rangeType: 'ch',
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
        rangeType: 'p',
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
        rangeType: 'ch',
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
        rangeType: 'n',
        rangeStart: 20,
        rangeEnd: 28,
        content: '분석',
        memo: '중요',
        isDone: true,
      }
    ]
  };


  const insets = useSafeAreaInsets();
  const animation = React.useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [icon, setIcon] = React.useState('plus');
  const [check, setCheck] = React.useState(false);
  const toggleModal = () => {
    setModalVisible(prev => {
      if (!prev) {
        setIcon('cancel'); // 모달을 열 때 취소 아이콘으로 변경
        Animated.spring(animation, {
          toValue: 1,
          useNativeDriver: true
        }).start();
      } else {
        Animated.spring(animation, {
          toValue: 0,
          useNativeDriver: true
        }).start(() => {
          setIcon('plus'); // 모달을 닫을 때 플러스 아이콘으로 변경
        });
      }
      return !prev;
    });
  };
  	return (
      <View>
      <ScrollView>
    		<View style={styles.notice2}>
      			<View style={styles.abVariation}>
        				<View style={[styles.parent, styles.parentFlexBox2]}>
          					<Text style={[styles.text4, styles.textTypo5]}>알림장</Text>
          					{/* <View style={styles.iconLayout1} /> */}
        				</View>
      			</View>
      			<View style={styles.frameParent}>
        				<View>
          					<View style={styles.group}>
            						<Text style={[styles.text5, styles.textTypo3]}>숙제 리스트</Text>
            						<View style={[styles.frameItem, styles.lineViewLayout]} />
          					</View>
          					<View style={styles.frameContainer}>
                    <HomeworkList {...sampleData} />
            						<View style={styles.frameSpaceBlock}/>
                    <HomeworkList {...sampleData} />
          					</View>
        				</View>
        				<View style={styles.frameParent10}>
          					<View style={styles.group}>
            						<Text style={[styles.text5, styles.textTypo3]}>숙제 히스토리</Text>
            						<View style={[styles.frameItem, styles.lineViewLayout]} />
          					</View>
          					<View style={styles.frameParent11}>
            						<HomeworkHistory student="박민영" subject="영어" completion={15}/>
            						<View style={[styles.frameWrapper4, styles.frameWrapperLayout]}>
                        <HomeworkHistory student="박민영" subject="영어" completion={15}/>
            						</View>
          					</View>
        				</View>
      			</View>
            
            <TouchableOpacity
        onPress={toggleModal}
        style={[styles.icon104Wrapper, styles.wrapperFlexBox, {bottom: insets.bottom + 10}]}
      >
        {icon === 'plus' ? <PlusButton width={24} height={24} /> : <CancelButton width={24} height={24} />}
        {icon === 'plus' ? <Text style = {styles.addNoticeButton}> 알림장 쓰기 </Text> : <Text></Text>}
      </TouchableOpacity>
    	</View>
      </ScrollView>
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
};

const styles = StyleSheet.create({
    addNoticeButton: {
    		fontSize: 18,
    		lineHeight: 27,
    		fontWeight: "600",
    		fontFamily: "Pretendard",
    		color: "#fefefe",
    		textAlign: "left"
  	},
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
    addScheduleButton: {
      fontSize: 18,
      lineHeight: 24,
      textAlign: "left",
      color: "#192239",
      fontFamily: "Pretendard",
      fontWeight: "600"
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(12,14,18,0.2)',
    },
  	textTypo5: {
    		fontWeight: "600",
    		fontFamily: "Pretendard"
  	},
  	parentFlexBox2: {
    		justifyContent: "space-between",
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	textTypo3: {
    		fontWeight: "500",
    		fontFamily: "Pretendard"
  	},
  	lineViewLayout: {
    		height: 1,
    		borderTopWidth: 1,
    		borderStyle: "solid"
  	},
  	frameSpaceBlock: {
    		padding: 16,
    		justifyContent: "center"
  	},
  	textTypo2: {
    		lineHeight: 24,
    		fontSize: 16,
    		textAlign: "left"
  	},
  	iconLayout1: {
    		width: 24,
    		height: 24
  	},
  	parentFlexBox1: {
    		marginTop: 4,
    		justifyContent: "space-between",
    		flexDirection: "row"
  	},
  	frameWrapperLayout: {
    		padding: 12,
    		width: 169,
    		borderRadius: 5,
    		justifyContent: "center",
    		alignItems: "center",
    		overflow: "hidden"
  	},
  	icon104ParentLayout: {
    		borderRadius: 50,
    		overflow: "hidden"
  	},
  	text4: {
    		fontSize: 22,
    		lineHeight: 33,
    		textAlign: "left",
    		color: "#192239"
  	},
  	parent: {
    		height: 24,
    		justifyContent: "space-between",
    		width: 350
  	},
  	abVariation: {
    		paddingHorizontal: 20,
    		paddingTop: 60,
    		paddingBottom: 12,
    		top: 0,
    		height: 96,
    		width: 390,
    		left: "50%",
    		marginLeft: -195,
    		position: "absolute",
    		overflow: "hidden",
    		backgroundColor: "#f1f4fd"
  	},
  	text5: {
    		lineHeight: 27,
    		fontSize: 18,
    		textAlign: "left",
    		color: "#192239"
  	},
  	frameItem: {
    		marginLeft: 8,
    		borderColor: "#e6e8f0",
    		height: 1,
    		flex: 1
  	},
  	group: {
    		width: 350,
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	text6: {
    		fontWeight: "500",
    		fontFamily: "Pretendard",
    		color: "#192239"
  	},
  	icon: {
    		overflow: "hidden"
  	},
  	frameContainer: {
    		marginTop: 16
  	},
  	parent7: {
    		width: 145
  	},
  	text25: {
    		fontSize: 32,
    		lineHeight: 42,
    		textAlign: "left",
    		color: "#192239"
  	},
  	component12Icon: {
    		width: 60,
    		height: 60
  	},
  	parent8: {
    		alignItems: "flex-end",
    		width: 145
  	},
  	frameParent12: {
    		width: 145
  	},
  	frameWrapper3: {
    		backgroundColor: "#fff"
  	},
  	frameWrapper4: {
    		marginLeft: 12,
    		backgroundColor: "#fefefe"
  	},
  	frameParent11: {
    		flexWrap: "wrap",
    		marginTop: 16,
    		justifyContent: "center",
    		flexDirection: "row"
  	},
  	frameParent10: {
    		marginTop: 24
  	},
  	frameParent: {
    		top: 112,
    		left: 20,
    		position: "absolute"
  	},
  	notice2: {
    		height: 844,
    		overflow: "hidden",
    		width: "100%",
    		flex: 1,
    		backgroundColor: "#f1f4fd"
  	}
});

export default Notice;
