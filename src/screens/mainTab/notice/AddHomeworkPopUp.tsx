import * as React from "react";
import {StyleSheet, View, Image, Text} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface confirmAddHomework {
    student: string;
    studyNum: number;
}
export default function AddHomeworkPopUp({student, studyNum}: confirmAddHomework){
  	
  	return (
    		<View style={styles.frame632833frame632921}>
      			<View style={styles.icon121Parent}>
        				<View style={styles.icon121} />
        				<Image style={styles.icon121} resizeMode="cover" source={require("../../../../assets/images/Notice/addHomework.png")} />
      			</View>
                <TouchableOpacity>
      			<Image style={styles.frame632833frame632921Child} resizeMode="cover" source={require("../../../../assets/images/close.png")} />
      			</TouchableOpacity>
                <View style={styles.parent}>
        				<Text style={[styles.text, styles.textTypo]}>알림장 생성 완료!</Text>
        				<Text style={[styles.text1, styles.textTypo]}>{`${student} 학생에게 ${studyNum}회차 알림장이 전달됐어요.
          					학생이 숙제를 완료하면 알려드릴게요.`}</Text>
      			</View>
    		</View>);
};

const styles = StyleSheet.create({
  	textTypo: {
    		textAlign: "center",
    		color: "#192239",
    		fontFamily: "Pretendard"
  	},
  	icon121: {
    		width: 24,
    		height: 24,
    		overflow: "hidden"
  	},
  	icon121Parent: {
    		width: 310,
    		flexDirection: "row",
    		justifyContent: "space-between"
  	},
  	frame632833frame632921Child: {
    		width: 64,
    		height: 64,
    		overflow: "hidden"
  	},
  	text: {
    		fontSize: 22,
    		lineHeight: 33,
    		fontWeight: "600"
  	},
  	text1: {
    		fontSize: 16,
    		lineHeight: 24,
    		fontWeight: "500",
    		marginTop: 8
  	},
  	parent: {
    		alignItems: "center"
  	},
  	frame632833frame632921: {
    		shadowColor: "rgba(158, 163, 180, 0.25)",
    		shadowOffset: {
      			width: 0,
      			height: 0
    		},
    		shadowRadius: 10,
    		elevation: 10,
    		shadowOpacity: 1,
    		borderRadius: 15,
    		backgroundColor: "#fefefe",
    		flex: 1,
    		width: "100%",
    		paddingHorizontal: 20,
    		paddingTop: 16,
    		paddingBottom: 32,
    		alignItems: "center",
    		overflow: "hidden"
  	}
});
