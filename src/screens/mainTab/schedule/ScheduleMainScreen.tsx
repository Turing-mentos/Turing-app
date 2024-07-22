import * as React from "react";
import {Text, StyleSheet, View, Image, ScrollView, TouchableOpacity} from "react-native";
import {Calendar, CalendarUtils} from 'react-native-calendars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const getDayOfWeek = (date) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[date.getDay()];
};

const formatDateToKorean = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript의 월은 0부터 시작하므로 1을 더합니다.
  const day = date.getDate();
  const dayOfWeek = getDayOfWeek(date);

  return `${month}월 ${day}일 (${dayOfWeek})`; // 예: '9월 11일 (수)'
};

const ScheduleMainScreen = () => {

const today = new Date();
const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
const currentYear = today.getFullYear();
const INITIAL_DATE = today.toISOString().split('T')[0];

// to get sunday of target week that is first day 
const getFirstDayOfWeek = (date) => { 
  const firstDay = new Date(date);
  firstDay.setDate(firstDay.getDate() - firstDay.getDay()); // Adjust to the previous Sunday
  return firstDay;
};
// to format date to YYYY-MM-DD
const formatDate = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

// Generate the dates for the calendar grid
const generateCalendarDates = () => {
  const startDate = getFirstDayOfWeek(new Date(currentYear, currentMonth, 1));
  const dates = Array.from({ length: 35 }).map((_, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index);
      return formatDate(date);
  });
  return dates;
};

  const [selectedDate, setSelectedDate] = React.useState(INITIAL_DATE);
  const calendarDates = generateCalendarDates();
  
  const selectDate = (date) => {
    const dateObj = new Date(date);
    const monthOfSelectedDate = dateObj.getMonth();
    
    if (monthOfSelectedDate !== currentMonth) {
      setCurrentMonth(monthOfSelectedDate);  // Update the currentMonth if different
    }

    setSelectedDate(date);  // Set the selected date
  };

const isDateSelected = (date) => {
  return selectedDate === date;
};

const WeekRow = ({ weekDates, selectDate, isDateSelected, currentMonth }) => {
  return (
    <View style={styles.instanceContainer}>
      {weekDates.map(date => {
        const dateObj = new Date(date);
        const isSelected = isDateSelected(date);
        const isSunday = dateObj.getDay() === 0;
        const isSaturday = dateObj.getDay() === 6;
        const isOutOfMonth = dateObj.getMonth() === currentMonth;
        const dateStyle = isSelected ? styles.selectedDate : styles.normalDate;
        const dayStyle = !isOutOfMonth? {} : isSunday ? styles.sunday : (isSaturday ? styles.saturday : styles.textTypo4);
        const isCurrentday = date === today.toISOString().split('T')[0]
        const currentdayStyle = isCurrentday? styles.wrapper12 : styles.wrapper2;
        const outOfMonthStyle = isCurrentday? styles.text34: (isOutOfMonth? styles.text25 : styles.text63);
        return (
            <TouchableOpacity key={date} style={[styles.frameWrapper1, styles.frameSpaceBlock, dateStyle, dayStyle]} onPress={() => selectDate(date)}>
              <View style={[currentdayStyle, styles.wrapperLayout1]}>
                <Text style={[outOfMonthStyle, dayStyle]}>{dateObj.getDate()}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const CalendarGrid = ({ calendarDates, selectDate, isDateSelected, currentMonth }) => {
    console.log(currentMonth);
    const weeks = [];
    for (let i = 0; i < calendarDates.length; i += 7) {
      weeks.push(calendarDates.slice(i, i + 7));
    }
    return (
      <View style={styles.calendarGridAlignment}>
        {weeks.map((weekDates, index) => (
          <React.Fragment key={index}>
            <WeekRow weekDates={weekDates} selectDate={selectDate} isDateSelected={isDateSelected} currentMonth={currentMonth} />
            {index < weeks.length - 1 && <View style={styles.frameItem} />}
          </React.Fragment>
        ))}
      </View>
    );
  };
  	return (
      
      <ScrollView>
      
    		<View style={styles.schedule47}>
      			<View style={[styles.schedule47Inner, styles.abVariationSpaceBlock]}>
        				<View>
          					<Text style={styles.text}>{formatDateToKorean(selectedDate)}</Text>
          					<View style={styles.frameWrapper}>
            						<View style={[styles.frameParent, styles.groupFlexBox]}>
              							<View style={styles.wrapperFlexBox}>
                								<View style={styles.wrapperFlexBox1}>
                  									<View style={[styles.wrapper, styles.wrapperFlexBox]}>
                    										<Text style={[styles.text1, styles.textTypo5]}>박민영 | 영어</Text>
                  									</View>
                  									<View style={[styles.container, styles.wrapper1SpaceBlock]}>
                    										<Text style={styles.text2}>
                      											<Text style={styles.text3}>4회차</Text>
                      											<Text style={styles.text4}> / 8회차</Text>
                    										</Text>
                  									</View>
                								</View>
                								<Text style={styles.pm700Container}>
                  									<Text style={styles.pm}>
                    										<Text style={styles.text3}>5:00 PM</Text>
                    										<Text style={styles.text5}>{` `}</Text>
                  									</Text>
                  									<Text style={styles.pm2}>~ 7:00 PM</Text>
                								</Text>
              							</View>
                            <View style={[styles.icon104Wrapper, styles.wrapperFlexBox]}>
              <Image style={styles.icon} resizeMode="cover" source={require('../../../../assets/images/schedule/right-arrow.png')} />
      			</View>
              							{/* <Image style={styles.icon} resizeMode="cover" source="ICON_.png" /> */}
            						</View>
          					</View>
          					<View style={styles.frameWrapper}>
            						<View style={[styles.frameParent, styles.groupFlexBox]}>
              							<View style={styles.wrapperFlexBox}>
                								<View style={styles.wrapperFlexBox1}>
                  									<View style={[styles.wrapper, styles.wrapperFlexBox]}>
                    										<Text style={[styles.text1, styles.textTypo5]}>신이현 | 수학</Text>
                  									</View>
                  									<View style={[styles.wrapper1, styles.wrapper1SpaceBlock]}>
                    										<Text style={styles.text2}>
                      											<Text style={styles.text3}>6회차</Text>
                      											<Text style={styles.text4}> / 8회차</Text>
                    										</Text>
                  									</View>
                								</View>
                								<Text style={styles.pm700Container}>
                  									<Text style={styles.pm}>
                    										<Text style={styles.text3}>8:30 PM</Text>
                    										<Text style={styles.text5}>{` `}</Text>
                  									</Text>
                  									<Text style={styles.pm2}>~ 10:30 PM</Text>
                								</Text>
              							</View>
                            
              							<Image style={styles.icon} resizeMode="cover" source={require('../../../../assets/images/schedule/right-arrow.png')} />
            						</View>
          					</View>
        				</View>
      			</View>
      			<View style={[styles.abVariation, styles.groupChildPosition]}>
        				<View style={[styles.group, styles.groupFlexBox]}>
          					<Text style={styles.text15}>{currentYear +'.'+ String(currentMonth + 1).padStart(2, '0')}</Text>
          					<Image style={styles.icon} resizeMode="cover" source={require('../../../../assets/images/schedule/schedule-unchange.png')} />
        				</View>
      			</View>
      			<View style={[styles.filterButton, styles.wrapperFlexBox]}>
        				<Text style={[styles.text16, styles.textTypo4]}>전체</Text>
        				<Image style={styles.icon2} resizeMode="cover" source={require('../../../../assets/images/schedule/below-arrow.png')} />
      			</View>
      			<View style={[styles.groupParent, styles.batteryPosition]}>
        				<View style={styles.groupChildLayout}>
          					<View style={[styles.groupChild, styles.groupChildLayout]} />
          					<Text style={[styles.text17, styles.textTypo2]}>일</Text>
          					<Text style={[styles.text18, styles.textPosition]}>월</Text>
          					<Text style={[styles.text19, styles.textPosition]}>화</Text>
          					<Text style={[styles.text20, styles.textPosition]}>수</Text>
          					<Text style={[styles.text21, styles.textPosition]}>목</Text>
          					<Text style={[styles.text22, styles.textPosition]}>금</Text>
          					<Text style={[styles.text23, styles.textTypo1]}>토</Text>
        				</View>
                <CalendarGrid calendarDates={calendarDates} selectDate={selectDate} isDateSelected={isDateSelected} currentMonth={currentMonth} />

                
                {/* <View style={styles.instanceContainer}>
                    {calendarDates.map((date, index) => {
                        const dateObj = new Date(date);
                        const dayOfWeek = dateObj.getDay();
                        const isSelected = isDateSelected(date);
                        const isSunday = dayOfWeek === 0;
                        const isSaturday = dayOfWeek === 6;
                        const dateStyle = isSelected ? styles.selectedDate : styles.normalDate;
                        const dayStyle = isSunday ? styles.sunday : (isSaturday ? styles.saturday : {});
                        const outOfMonth = dateObj.getMonth();
                        const outOfMonthStyle = outOfMonth === currentMonth ? styles.text25 : styles.text63;
                        return (
                          <React.Fragment key={index}>
                                    {index % 7 === 0 && index > 0 && <View style={styles.frameItem} />}
                            <TouchableOpacity key={date} style={[styles.frameWrapper1, styles.frameSpaceBlock, dateStyle, dayStyle]} onPress={() => selectDate(date)}>
                                <View style={[styles.wrapper2, styles.wrapperLayout1]}>
                                    <Text style={[outOfMonthStyle, styles.textTypo4]}>{dateObj.getDate()}</Text>
                                </View>
                            </TouchableOpacity>
                          </React.Fragment>
                        );
                    })}
                </View> */}

        				
      			</View>
      			<View style={[styles.icon104Wrapper, styles.wrapperFlexBox]}>
              <Image style={styles.icon} resizeMode="cover" source={require('../../../../assets/images/schedule/schedule-plus.png')} />
      			</View>
    		</View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  // floatingComponent: {
  //   position: 'absolute',
  //       top: Dimensions.get('window').height - insets.bottom - 24
  // },
  normalDate: {
    backgroundColor: "#fefefe",  // Normal background color
},
selectedDate: {
    backgroundColor: "#f1f4fd",  // Selected background color
},
  	abVariationSpaceBlock: {
    		paddingHorizontal: 20,
    		overflow: "hidden"
  	},
  	groupFlexBox: {
    		justifyContent: "space-between",
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	wrapperFlexBox: {
    		justifyContent: "center",
    		overflow: "hidden"
  	},
  	textTypo5: {
    		fontWeight: "500",
    		lineHeight: 18,
    		fontSize: 12
  	},
  	wrapper1SpaceBlock: {
    		marginLeft: 4,
    		borderRadius: 7,
    		paddingVertical: 0,
    		paddingHorizontal: 4,
    		justifyContent: "center",
    		alignItems: "center",
    		flexDirection: "row",
    		overflow: "hidden"
  	},
  	iconParentSpaceBlock: {
    		paddingTop: 6,
    		alignItems: "center",
    		overflow: "hidden"
  	},
  	textTypo3: {
    		marginTop: 6,
    		textAlign: "center",
    		lineHeight: 18,
    		fontSize: 12,
    		fontFamily: "Pretendard"
  	},
  	groupChildPosition: {
    		top: 0,
    		left: "50%",
    		marginLeft: -195,
    		position: "absolute",
    		backgroundColor: "#fefefe"
  	},
  	textTypo4: {
    		textAlign: "center",
    		fontFamily: "Pretendard"
  	},
  	batteryPosition: {
    		left: "50%",
    		position: "absolute"
  	},
  	iconPosition: {
    		maxHeight: "100%",
    		left: "50%",
    		position: "absolute"
  	},
  	groupChildLayout: {
    		height: 22,
    		width: 390
  	},
  	textTypo2: {
    		color: "#ff2727",
    		textAlign: "center",
    		lineHeight: 18,
    		fontSize: 12,
    		fontFamily: "Pretendard"
  	},
  	textPosition: {
    		top: 2,
    		position: "absolute"
  	},
  	textTypo1: {
    		color: "#287eff",
    		textAlign: "center",
    		lineHeight: 18,
    		fontSize: 12,
    		fontFamily: "Pretendard"
  	},
    sunday: {
        color: "#ff2727"
    },
    saturday: {
        color: "#287eff"
    },
  	frameSpaceBlock: {
    		paddingVertical: 4,
    		paddingHorizontal: 0,
    		height: 76,
    		width: 50,
    		alignItems: "center",
    		overflow: "hidden"
  	},
  	wrapperLayout1: {
    		borderRadius: 56,
    		height: 20,
    		width: 20,
    		justifyContent: "center",
    		alignItems: "center",
    		overflow: "hidden"
  	},
  	frameChild11SpaceBlock: {
    		marginTop: 2,
    		justifyContent: "center"
  	},
  	rectangleLayout: {
    		width: 8,
    		height: 8
  	},
  	instanceChildPosition: {
    		right: "0%",
    		bottom: "0%",
    		top: "0%",
    		height: "100%",
    		left: "0%",
    		borderRadius: 5,
    		position: "absolute",
    		width: "100%"
  	},
  	frameChildLayout: {
    		height: 12,
    		display: "none"
  	},
  	wrapper8Layout: {
    		backgroundColor: "#585f73",
    		width: 35,
    		marginTop: 2,
    		borderRadius: 2,
    		justifyContent: "center",
    		alignItems: "center",
    		overflow: "hidden"
  	},
  	textTypo: {
    		lineHeight: 12,
    		fontSize: 7,
    		textAlign: "center",
    		fontWeight: "500",
    		fontFamily: "Pretendard"
  	},
  	viewLayout: {
    		height: 7,
    		width: 6,
    		marginTop: 2
  	},
  	wrapperLayout: {
    		width: 35,
    		marginTop: 2,
    		borderRadius: 2,
    		justifyContent: "center",
    		alignItems: "center",
    		overflow: "hidden"
  	},
  	text: {
    		fontSize: 16,
    		lineHeight: 24,
    		textAlign: "left",
    		color: "#192239",
    		fontFamily: "Pretendard",
    		fontWeight: "600"
  	},
  	text1: {
    		textAlign: "left",
    		color: "#192239",
    		fontFamily: "Pretendard"
  	},
  	wrapper: {
    		alignItems: "center",
    		flexDirection: "row",
    		borderRadius: 5
  	},
  	text3: {
    		color: "#192239"
  	},
  	text4: {
    		color: "#7b8297"
  	},
  	text2: {
    		fontSize: 10,
    		lineHeight: 15,
    		textAlign: "left",
    		fontFamily: "Pretendard",
    		fontWeight: "600"
  	},
  	container: {
    		backgroundColor: "#d8e8ff"
  	},
  	wrapperFlexBox1: {
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	text5: {
    		color: "#000"
  	},
  	pm: {
    		fontFamily: "Pretendard",
    		fontWeight: "600"
  	},
  	pm2: {
    		color: "#9ea3b4",
    		fontFamily: "Pretendard"
  	},
  	pm700Container: {
    		fontSize: 18,
    		lineHeight: 27,
    		textAlign: "left"
  	},
  	icon: {
    		width: 24,
    		height: 24,
    		overflow: "hidden"
  	},
  	frameParent: {
    		width: 318
  	},
  	frameWrapper: {
    		paddingTop: 12,
    		paddingBottom: 8,
    		marginTop: 8,
    		paddingHorizontal: 16,
    		width: 350,
    		borderRadius: 5,
    		overflow: "hidden",
    		backgroundColor: "#fefefe"
  	},
  	wrapper1: {
    		backgroundColor: "#fbe8ff"
  	},
  	schedule47Inner: {
    		top: 539,
    		left: 0,
    		height: 305,
    		paddingVertical: 16,
    		backgroundColor: "#f1f4fd",
    		position: "absolute"
  	},
  	iconSchedule: {
    		height: 28,
    		width: 28,
    		overflow: "hidden"
  	},
  	text11: {
    		color: "#192239",
    		fontWeight: "600"
  	},
  	iconScheduleParent: {
    		paddingHorizontal: 16
  	},
  	text12: {
    		color: "#9ea3b4"
  	},
  	iconQuestionParent: {
    		marginLeft: 8,
    		paddingHorizontal: 16
  	},
  	bnbHome: {
    		bottom: 0,
    		borderColor: "#e6e8f0",
    		borderTopWidth: 1,
    		paddingHorizontal: 12,
    		paddingBottom: 32,
    		width: 390,
    		borderStyle: "solid",
    		paddingTop: 6,
    		left: "50%",
    		marginLeft: -195,
    		justifyContent: "center",
    		flexDirection: "row",
    		position: "absolute",
    		backgroundColor: "#fefefe"
  	},
  	text15: {
    		fontSize: 22,
    		lineHeight: 33,
    		textAlign: "left",
    		color: "#192239",
    		fontFamily: "Pretendard",
    		fontWeight: "600"
  	},
  	group: {
    		height: 24,
    		width: 350
  	},
  	abVariation: {
    		height: 96,
    		paddingTop: 60,
    		paddingBottom: 12,
    		width: 390,
    		paddingHorizontal: 20,
    		overflow: "hidden"
  	},
  	time1: {
    		top: "33.96%",
    		left: "37.68%",
    		fontSize: 17,
    		lineHeight: 22,
    		color: "#0c0e12",
    		fontWeight: "600",
    		position: "absolute"
  	},
  	time: {
    		right: "64.26%",
    		left: "0%",
    		top: "50%",
    		width: "35.74%",
    		marginTop: -26.59,
    		height: 54,
    		position: "absolute"
  	},
  	border: {
    		marginLeft: -13.55,
    		borderRadius: 4,
    		borderColor: "#0c0e12",
    		borderWidth: 1,
    		width: 25,
    		opacity: 0.35,
    		bottom: "0%",
    		top: "0%",
    		height: "100%",
    		borderStyle: "solid",
    		left: "50%",
    		position: "absolute"
  	},
  	capIcon: {
    		height: "31.01%",
    		marginLeft: 12.25,
    		top: "36.78%",
    		bottom: "32.22%",
    		width: 1,
    		opacity: 0.4
  	},
  	capacity: {
    		height: "68.99%",
    		marginLeft: -11.57,
    		top: "15.39%",
    		bottom: "15.62%",
    		backgroundColor: "#0c0e12",
    		width: 21,
    		borderRadius: 2,
    		left: "50%",
    		position: "absolute"
  	},
  	battery: {
    		height: "24.07%",
    		marginLeft: 10.68,
    		top: "42.58%",
    		bottom: "33.35%",
    		width: 27
  	},
  	wifiIcon: {
    		height: "22.76%",
    		marginLeft: -13.43,
    		top: "43.77%",
    		bottom: "33.47%",
    		width: 17
  	},
  	cellularConnectionIcon: {
    		height: "22.57%",
    		marginLeft: -39.93,
    		top: "43.57%",
    		bottom: "33.85%",
    		width: 19
  	},
  	levels: {
    		right: "0.01%",
    		left: "64.25%",
    		top: "50%",
    		width: "35.74%",
    		marginTop: -26.59,
    		height: 54,
    		position: "absolute"
  	},
  	statusBarIphone: {
    		height: 54,
    		top: 0,
    		width: 390,
    		left: "50%",
    		marginLeft: -195,
    		position: "absolute"
  	},
  	text16: {
    		fontSize: 14,
    		lineHeight: 21,
    		color: "#fefefe",
    		fontWeight: "600"
  	},
  	icon2: {
    		height: 20,
    		width: 20,
    		overflow: "hidden"
  	},
  	filterButton: {
    		top: 96,
    		left: 20,
    		paddingHorizontal: 8,
    		paddingVertical: 2,
    		backgroundColor: "#192239",
    		alignItems: "center",
    		flexDirection: "row",
    		borderRadius: 5,
    		position: "absolute"
  	},
  	groupChild: {
    		top: 0,
    		left: "50%",
    		marginLeft: -195,
    		position: "absolute",
    		backgroundColor: "#fefefe"
  	},
  	text17: {
    		left: 39,
    		top: 2,
    		position: "absolute"
        
  	},
  	text18: {
    		left: 89,
    		textAlign: "center",
    		fontFamily: "Pretendard",
    		lineHeight: 18,
    		fontSize: 12,
    		color: "#192239"
  	},
  	text19: {
    		left: 139,
    		textAlign: "center",
    		fontFamily: "Pretendard",
    		lineHeight: 18,
    		fontSize: 12,
    		color: "#192239"
  	},
  	text20: {
    		left: 189,
    		textAlign: "center",
    		fontFamily: "Pretendard",
    		lineHeight: 18,
    		fontSize: 12,
    		color: "#192239"
  	},
  	text21: {
    		left: 239,
    		textAlign: "center",
    		fontFamily: "Pretendard",
    		lineHeight: 18,
    		fontSize: 12,
    		color: "#192239"
  	},
  	text22: {
    		left: 289,
    		textAlign: "center",
    		fontFamily: "Pretendard",
    		lineHeight: 18,
    		fontSize: 12,
    		color: "#192239"
  	},
  	text23: {
    		left: 339,
    		top: 2,
    		position: "absolute"
  	},
  	wrapper2: {
    		paddingHorizontal: 1,
    		paddingVertical: 3
  	},
  	frameWrapper1: {
    		backgroundColor: "#fefefe"
  	},
  	text25: {
    		lineHeight: 18,
    		fontSize: 12,
    		textAlign: "center",
    		color: "#192239"
  	},
  	instanceChild: {
    		backgroundColor: "#d8e8ff"
  	},
  	rectangleWrapper: {
    		height: 8
  	},
  	instanceItem: {
    		backgroundColor: "#fbe8ff"
  	},
  	rectangleContainer: {
    		marginLeft: 2,
    		height: 8
  	},
  	instanceParent1: {
    		flexDirection: "row"
  	},
  	instanceChild2: {
    		backgroundColor: "#e0fbe8"
  	},
  	frameChild: {
    		display: "none",
    		width: 35,
    		marginTop: 2,
    		borderRadius: 2,
    		justifyContent: "center",
    		alignItems: "center",
    		overflow: "hidden",
    		backgroundColor: "#fbe8ff"
  	},
  	text30: {
    		color: "#fefefe"
  	},
  	wrapper8: {
    		paddingVertical: 0,
    		paddingHorizontal: 4,
    		flexDirection: "row"
  	},
    calendarGridAlignment : {
        flexDirection: 'column',
        overflow: "hidden",
        left: "5%"
    },
  	instanceContainer: {
    		flexDirection: "row",
    		width: 350,
    		overflow: "hidden"
  	},
  	frameItem: {
    		backgroundColor: "#f4f6fb",
    		height: 1,
    		width: 390
  	},
  	text34: {
    		color: "#fefefe",
    		fontWeight: "500",
    		lineHeight: 18,
    		fontSize: 12
  	},
  	wrapper12: {
    		backgroundColor: "#192239"
  	},
  	text36: {
    		lineHeight: 18,
    		fontSize: 12,
    		textAlign: "center",
    		color: "#192239",
    		fontWeight: "600"
  	},
  	frameParent6: {
    		backgroundColor: "#f1f4fd"
  	},
  	frameChild1: {
    		display: "none",
    		height: 12
  	},
  	view: {
    		display: "none"
  	},
  	text46: {
    		color: "#192239"
  	},
  	wrapper24: {
    		paddingVertical: 0,
    		paddingHorizontal: 4,
    		flexDirection: "row",
    		backgroundColor: "#d8e8ff"
  	},
  	wrapper25: {
    		backgroundColor: "#fbe8ff",
    		paddingVertical: 0,
    		paddingHorizontal: 4,
    		flexDirection: "row"
  	},
  	frameChild11: {
    		display: "none",
    		height: 8,
    		width: 28
  	},
  	text56: {
    		height: "67.14%",
    		top: "16.67%",
    		lineHeight: 8,
    		display: "flex",
    		fontSize: 8,
    		left: "0%",
    		textAlign: "center",
    		color: "#7b8297",
    		fontWeight: "500",
    		justifyContent: "center",
    		alignItems: "center",
    		fontFamily: "Pretendard",
    		position: "absolute",
    		width: "100%"
  	},
  	text63: {
    		color: "#9ea3b4",
    		lineHeight: 18,
    		fontSize: 12,
    		textAlign: "center"
  	},
  	groupParent: {
    		top: 133,
    		marginLeft: -195,
    		left: "50%",
    		alignItems: "center",
    		overflow: "hidden",
    		backgroundColor: "#fefefe"
  	},
  	icon104Wrapper: {
    		bottom: 115,
    		left: 314,
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
  	schedule47: {
    		flex: 1,
    		height: 844,
    		overflow: "hidden",
    		width: "100%",
    		backgroundColor: "#fefefe"
  	}
});

export default ScheduleMainScreen;
