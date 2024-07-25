import * as React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Notice = () => {
  	
  	return (
    		<View style={styles.notice2}>
      			<View style={styles.bnb}>
        				<View style={[styles.iconScheduleParent, styles.iconParentSpaceBlock]}>
          					<Image style={styles.iconSchedule} resizeMode="cover" source="ICON_schedule.png" />
          					<Text style={[styles.text, styles.textTypo6]}>스케줄</Text>
        				</View>
        				<View style={[styles.iconQuestionParent, styles.iconParentSpaceBlock]}>
          					<Image style={styles.iconSchedule} resizeMode="cover" source="ICON_question.png" />
          					<Text style={[styles.text, styles.textTypo6]}>질문</Text>
        				</View>
        				<View style={[styles.iconQuestionParent, styles.iconParentSpaceBlock]}>
          					<Image style={styles.iconSchedule} resizeMode="cover" source="ICON_home.png" />
          					<Text style={[styles.text, styles.textTypo6]}>HOME</Text>
        				</View>
        				<View style={[styles.iconQuestionParent, styles.iconParentSpaceBlock]}>
          					<Image style={styles.iconSchedule} resizeMode="cover" source="ICON_noti.png" />
          					<Text style={[styles.text2, styles.textTypo5]}>알림장</Text>
        				</View>
        				<View style={[styles.iconQuestionParent, styles.iconParentSpaceBlock]}>
          					<Image style={styles.iconSchedule} resizeMode="cover" source="ICON_report.png" />
          					<Text style={[styles.text, styles.textTypo6]}>리포트</Text>
        				</View>
      			</View>
      			<View style={styles.abVariation}>
        				<View style={[styles.parent, styles.parentFlexBox2]}>
          					<Text style={[styles.text4, styles.textTypo5]}>알림장</Text>
          					<View style={styles.iconLayout1} />
        				</View>
      			</View>
      			<View style={styles.frameParent}>
        				<View>
          					<View style={styles.group}>
            						<Text style={[styles.text5, styles.textTypo3]}>숙제 리스트</Text>
            						<View style={[styles.frameItem, styles.lineViewLayout]} />
          					</View>
          					<View style={styles.frameContainer}>
            						<View style={[styles.frameView, styles.frameSpaceBlock]}>
              							<View style={styles.frameParent1}>
                								<View>
                  									<View>
                    										<View style={[styles.instanceParent, styles.parentFlexBox2]}>
                      											<View style={[styles.wrapper, styles.wrapperFrameLayout]}>
                        												<Text style={[styles.text6, styles.textTypo2]}>박민영 | 영어</Text>
                      											</View>
                      											<Image style={[styles.icon, styles.iconLayout1]} resizeMode="cover" source="ICON_.png" />
                    										</View>
                    										<View style={[styles.frameParent3, styles.parentFlexBox1]}>
                      											<View style={styles.container}>
                        												<Text style={[styles.text4, styles.textTypo5]}>50%</Text>
                        												<Text style={[styles.text8, styles.textTypo3]}>(2/4)</Text>
                      											</View>
                      											<View style={styles.frameParent4}>
                        												<View style={[styles.icon50Parent, styles.parentFlexBox]}>
                          													<Image style={styles.icon50} resizeMode="cover" source="icon 50.png" />
                          													<Text style={[styles.text9, styles.textTypo1]}>수업 1일 전</Text>
                        												</View>
                        												<Image style={styles.frameInner} resizeMode="cover" source="Polygon 1.png" />
                      											</View>
                    										</View>
                  									</View>
                								</View>
                								<View style={styles.rectangleParent}>
                  									<View style={[styles.rectangleView, styles.rectangleLayout]} />
                  									<LinearGradient style={[styles.rectangleLineargradient, styles.rectangleLayout]} locations={[0,1]} colors={['#9708cc','#287eff']} useAngle={true} angle={74.51} />
                								</View>
              							</View>
              							<View style={[styles.lineView, styles.lineViewLayout]} />
              							<View style={styles.frameParent5}>
                								<View style={styles.container}>
                  									<Image style={styles.iconLayout} resizeMode="cover" source="icon 113.png" />
                  									<View style={styles.parent1}>
                    										<Text style={[styles.text10, styles.textTypo2]}>[문법] 능률</Text>
                    										<Text style={[styles.text11, styles.textTypo2]}>{`->`}</Text>
                    										<Text style={[styles.text11, styles.textTypo2]}>p.2~p.24 문풀</Text>
                  									</View>
                								</View>
                								<View style={styles.icon113Group}>
                  									<Image style={styles.iconLayout} resizeMode="cover" source="icon 113.png" />
                  									<View style={styles.parent1}>
                    										<Text style={[styles.text10, styles.textTypo2]}>[독해] 마더텅</Text>
                    										<Text style={[styles.text11, styles.textTypo2]}>{`->`}</Text>
                    										<Text style={[styles.text11, styles.textTypo2]}>ch.3 문풀</Text>
                  									</View>
                								</View>
                								<View style={styles.icon113Group}>
                  									<Image style={styles.iconLayout} resizeMode="cover" source="icon 113.png" />
                  									<View style={styles.parent1}>
                    										<Text style={styles.textTypo}>[어휘] 수특</Text>
                    										<Text style={[styles.text15, styles.textTypo]}>{`->`}</Text>
                    										<Text style={[styles.text15, styles.textTypo]}>ch.3~ch.5 암기</Text>
                  									</View>
                								</View>
                								<View style={styles.icon113Group}>
                  									<Image style={styles.iconLayout} resizeMode="cover" source="icon 113.png" />
                  									<View style={styles.parent1}>
                    										<Text style={styles.textTypo}>[TEST] 24년 6모</Text>
                    										<Text style={[styles.text15, styles.textTypo]}>{`->`}</Text>
                    										<Text style={[styles.text15, styles.textTypo]}>n.20~n.28 분석</Text>
                  									</View>
                								</View>
              							</View>
              							<View style={[styles.lineView, styles.lineViewLayout]} />
              							<LinearGradient style={[styles.frameLineargradient, styles.iconParentSpaceBlock]} locations={[0,1]} colors={['#9708cc','#287eff']} useAngle={true} angle={74.51}>
                								<Text style={[styles.text18, styles.textTypo1]}>리마인드 콕 찌르기</Text>
                								<Image style={[styles.icon104, styles.iconLayout]} resizeMode="cover" source="icon 104.png" />
              							</LinearGradient>
            						</View>
            						<View style={[styles.frameWrapper1, styles.frameSpaceBlock]}>
              							<View style={styles.frameParent1}>
                								<View>
                  									<View>
                    										<View style={[styles.instanceParent, styles.parentFlexBox2]}>
                      											<View style={[styles.wrapper, styles.wrapperFrameLayout]}>
                        												<Text style={[styles.text6, styles.textTypo2]}>신이현 | 수학</Text>
                      											</View>
                      											<Image style={[styles.icon, styles.iconLayout1]} resizeMode="cover" source="ICON_.png" />
                    										</View>
                    										<View style={[styles.frameParent3, styles.parentFlexBox1]}>
                      											<View style={styles.container}>
                        												<Text style={[styles.text4, styles.textTypo5]}>완료</Text>
                        												<Text style={[styles.text8, styles.textTypo3]}>(4/4)</Text>
                      											</View>
                      											<View style={styles.frameParent4}>
                        												<View style={[styles.icon50Parent, styles.parentFlexBox]}>
                          													<Image style={styles.icon50} resizeMode="cover" source="icon 50.png" />
                          													<Text style={[styles.text9, styles.textTypo1]}>수업 2시간 전</Text>
                        												</View>
                        												<Image style={styles.frameInner} resizeMode="cover" source="Polygon 1.png" />
                      											</View>
                    										</View>
                  									</View>
                								</View>
                								<View style={styles.rectangleParent}>
                  									<View style={[styles.frameChild2, styles.frameChildPosition]} />
                  									<LinearGradient style={[styles.frameChild3, styles.frameChildPosition]} locations={[0,1]} colors={['#9708cc','#287eff']} useAngle={true} angle={74.51} />
                								</View>
              							</View>
            						</View>
          					</View>
        				</View>
        				<View style={styles.frameParent10}>
          					<View style={styles.group}>
            						<Text style={[styles.text5, styles.textTypo3]}>숙제 히스토리</Text>
            						<View style={[styles.frameItem, styles.lineViewLayout]} />
          					</View>
          					<View style={styles.frameParent11}>
            						<View style={[styles.frameWrapper3, styles.frameWrapperLayout]}>
              							<View style={styles.frameParent12}>
                								<View style={[styles.parent7, styles.parentFlexBox2]}>
                  									<Text style={[styles.text6, styles.textTypo2]}>박민영 | 영어</Text>
                  									<Image style={[styles.icon, styles.iconLayout1]} resizeMode="cover" source="arrow 4.png" />
                								</View>
                								<View style={[styles.parent8, styles.parentFlexBox1]}>
                  									<Text style={[styles.text25, styles.textTypo5]}>15%</Text>
                  									<Image style={[styles.component12Icon, styles.icon104ParentLayout]} resizeMode="cover" source="Component 12.png" />
                								</View>
              							</View>
            						</View>
            						<View style={[styles.frameWrapper4, styles.frameWrapperLayout]}>
              							<View style={styles.frameParent12}>
                								<View style={[styles.parent7, styles.parentFlexBox2]}>
                  									<Text style={[styles.text6, styles.textTypo2]}>신이현 | 수학</Text>
                  									<Image style={[styles.icon, styles.iconLayout1]} resizeMode="cover" source="arrow 4.png" />
                								</View>
                								<View style={[styles.parent8, styles.parentFlexBox1]}>
                  									<Text style={[styles.text25, styles.textTypo5]}>82%</Text>
                  									<Image style={[styles.component12Icon, styles.icon104ParentLayout]} resizeMode="cover" source="Component 11.png" />
                								</View>
              							</View>
            						</View>
          					</View>
        				</View>
      			</View>
      			<View style={styles.statusBarIphone}>
        				<View style={[styles.time, styles.timePosition]}>
          					<Text style={[styles.time1, styles.textTypo5]}>9:41</Text>
        				</View>
        				<View style={[styles.levels, styles.timePosition]}>
          					<View style={styles.battery}>
            						<View style={[styles.border, styles.rectanglePosition]} />
            						<Image style={[styles.capIcon, styles.iconPosition]} resizeMode="cover" source="Cap.png" />
            						<View style={[styles.capacity, styles.rectangleLayout]} />
          					</View>
          					<Image style={[styles.wifiIcon, styles.iconPosition]} resizeMode="cover" source="Wifi.png" />
          					<Image style={[styles.cellularConnectionIcon, styles.iconPosition]} resizeMode="cover" source="Cellular Connection.png" />
        				</View>
      			</View>
      			<View style={[styles.icon104Parent, styles.icon104ParentLayout]}>
        				<Image style={[styles.icon, styles.iconLayout1]} resizeMode="cover" source="icon 104.png" />
        				<Text style={[styles.text28, styles.textTypo1]}>알림장 쓰기</Text>
      			</View>
    		</View>);
};

const styles = StyleSheet.create({
  	iconParentSpaceBlock: {
    		paddingHorizontal: 16,
    		alignItems: "center",
    		overflow: "hidden"
  	},
  	textTypo6: {
    		marginTop: 6,
    		textAlign: "center",
    		lineHeight: 18,
    		fontSize: 12
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
  	wrapperFrameLayout: {
    		borderRadius: 5,
    		alignItems: "center",
    		overflow: "hidden"
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
  	parentFlexBox: {
    		backgroundColor: "#192239",
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	textTypo1: {
    		color: "#fefefe",
    		fontWeight: "600",
    		fontFamily: "Pretendard"
  	},
  	rectangleLayout: {
    		borderRadius: 2,
    		position: "absolute"
  	},
  	textTypo: {
    		color: "#7b8297",
    		textDecoration: "line-through",
    		lineHeight: 24,
    		fontSize: 16,
    		textAlign: "left",
    		fontFamily: "Pretendard"
  	},
  	iconLayout: {
    		height: 20,
    		width: 20,
    		overflow: "hidden"
  	},
  	frameChildPosition: {
    		bottom: "9.09%",
    		height: "90.91%",
    		borderRadius: 2,
    		left: "0%",
    		right: "0%",
    		top: "0%",
    		position: "absolute",
    		width: "100%"
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
  	timePosition: {
    		top: "50%",
    		width: "35.74%",
    		marginTop: -26.59,
    		height: 54,
    		position: "absolute"
  	},
  	rectanglePosition: {
    		bottom: "0%",
    		top: "0%",
    		height: "100%"
  	},
  	iconPosition: {
    		maxHeight: "100%",
    		left: "50%",
    		position: "absolute"
  	},
  	iconSchedule: {
    		width: 28,
    		height: 28,
    		overflow: "hidden"
  	},
  	text: {
    		color: "#9ea3b4",
    		fontFamily: "Pretendard"
  	},
  	iconScheduleParent: {
    		paddingTop: 6
  	},
  	iconQuestionParent: {
    		marginLeft: 8,
    		paddingTop: 6
  	},
  	text2: {
    		color: "#192239",
    		marginTop: 6,
    		textAlign: "center",
    		lineHeight: 18,
    		fontSize: 12
  	},
  	bnb: {
    		bottom: 0,
    		paddingHorizontal: 12,
    		paddingBottom: 32,
    		paddingTop: 6,
    		justifyContent: "center",
    		alignItems: "center",
    		flexDirection: "row",
    		height: 96,
    		width: 390,
    		borderTopWidth: 1,
    		marginLeft: -195,
    		borderColor: "#e6e8f0",
    		borderStyle: "solid",
    		backgroundColor: "#fefefe",
    		left: "50%",
    		position: "absolute",
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
  	wrapper: {
    		justifyContent: "center",
    		flexDirection: "row"
  	},
  	icon: {
    		overflow: "hidden"
  	},
  	instanceParent: {
    		width: 318
  	},
  	text8: {
    		fontSize: 20,
    		lineHeight: 30,
    		color: "#c2c7d3",
    		marginLeft: 2.2,
    		textAlign: "left"
  	},
  	container: {
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	icon50: {
    		width: 13,
    		height: 13,
    		overflow: "hidden"
  	},
  	text9: {
    		marginLeft: 2,
    		textAlign: "center",
    		lineHeight: 18,
    		fontSize: 12,
    		color: "#fefefe"
  	},
  	icon50Parent: {
    		borderRadius: 49,
    		paddingHorizontal: 8,
    		paddingVertical: 2,
    		overflow: "hidden"
  	},
  	frameInner: {
    		borderRadius: 1,
    		width: 14,
    		height: 12,
    		marginTop: -5.5
  	},
  	frameParent4: {
    		alignItems: "center"
  	},
  	frameParent3: {
    		width: 318,
    		alignItems: "center"
  	},
  	rectangleView: {
    		backgroundColor: "#e6e8f0",
    		left: "0%",
    		bottom: "0%",
    		top: "0%",
    		height: "100%",
    		right: "0%",
    		borderRadius: 2,
    		width: "100%"
  	},
  	rectangleLineargradient: {
    		width: "50%",
    		right: "50%",
    		backgroundColor: "transparent",
    		left: "0%",
    		bottom: "0%",
    		top: "0%",
    		height: "100%"
  	},
  	rectangleParent: {
    		height: 4,
    		marginTop: 2,
    		width: 318
  	},
  	frameParent1: {
    		justifyContent: "center",
    		alignItems: "center"
  	},
  	lineView: {
    		borderColor: "#f4f6fb",
    		width: 319,
    		marginTop: 8
  	},
  	text10: {
    		color: "#192239",
    		fontFamily: "Pretendard"
  	},
  	text11: {
    		marginLeft: 4,
    		color: "#192239",
    		fontFamily: "Pretendard"
  	},
  	parent1: {
    		marginLeft: 8,
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	icon113Group: {
    		marginTop: 8,
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	text15: {
    		marginLeft: 4
  	},
  	frameParent5: {
    		marginTop: 8,
    		width: 318
  	},
  	text18: {
    		lineHeight: 24,
    		fontSize: 16,
    		textAlign: "left"
  	},
  	icon104: {
    		marginLeft: 4
  	},
  	frameLineargradient: {
    		borderRadius: 55,
    		paddingVertical: 4,
    		marginTop: 8,
    		backgroundColor: "transparent",
    		justifyContent: "center",
    		flexDirection: "row"
  	},
  	frameView: {
    		borderRadius: 5,
    		alignItems: "center",
    		overflow: "hidden",
    		width: 350,
    		backgroundColor: "#fefefe"
  	},
  	frameChild2: {
    		backgroundColor: "#e6e8f0"
  	},
  	frameChild3: {
    		backgroundColor: "transparent"
  	},
  	frameWrapper1: {
    		backgroundColor: "#e6e8f0",
    		borderRadius: 5,
    		alignItems: "center",
    		overflow: "hidden",
    		marginTop: 16,
    		width: 350
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
  	time1: {
    		top: "33.96%",
    		left: "37.68%",
    		fontSize: 17,
    		lineHeight: 22,
    		color: "#0c0e12",
    		textAlign: "center",
    		position: "absolute"
  	},
  	time: {
    		right: "64.26%",
    		left: "0%"
  	},
  	border: {
    		marginLeft: -13.55,
    		borderRadius: 4,
    		borderColor: "#0c0e12",
    		borderWidth: 1,
    		width: 25,
    		opacity: 0.35,
    		top: "0%",
    		height: "100%",
    		bottom: "0%",
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
    		left: "50%"
  	},
  	battery: {
    		height: "24.07%",
    		marginLeft: 10.68,
    		top: "42.58%",
    		bottom: "33.35%",
    		width: 27,
    		left: "50%",
    		position: "absolute"
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
    		left: "64.25%"
  	},
  	statusBarIphone: {
    		height: 54,
    		top: 0,
    		width: 390,
    		left: "50%",
    		marginLeft: -195,
    		position: "absolute"
  	},
  	text28: {
    		lineHeight: 27,
    		fontSize: 18,
    		textAlign: "left",
    		marginLeft: 8
  	},
  	icon104Parent: {
    		bottom: 112,
    		left: 223,
    		shadowColor: "rgba(158, 163, 180, 0.25)",
    		shadowOffset: {
      			width: 0,
      			height: 0
    		},
    		shadowRadius: 10,
    		elevation: 10,
    		shadowOpacity: 1,
    		backgroundColor: "#192239",
    		alignItems: "center",
    		flexDirection: "row",
    		padding: 16,
    		justifyContent: "center",
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
