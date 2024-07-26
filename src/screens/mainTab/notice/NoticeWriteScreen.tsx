import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import Accordion from '../../../components/common/Accordion';
import { ScrollView } from 'react-native-gesture-handler';
import HomeworkType from './HomeworkType.tsx';


export default function NoticeWriteScreen() {
  const categoryTags = ['독해', '문법', '어휘', '듣기', '작문', '회화', 'TEST', '직접입력'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState();
  const [customInput, setCustomInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const rangeTags = ['페이지', '챕터', '번호', '회차', '강의', '설정안함'];
  const [selectedRangeIndex, setSelectedRangeIndex] = useState();
  const [selectedRange, setSelectedRange] = useState('');
  const contentTags = ['풀이', '암기', '오답', '복습', '예습', '분석', '실전 연습', '직접 입력'];
  const [selectedContentIndex, setSelectedContentIndex] = useState();
  const [contentInput, setContentInput] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [selectedMemo, setSelectedMemo] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [history, setHistory] = useState([]);
  React.useEffect(() => {
    const newHistory = [];
    if (selectedCategory) newHistory.push(`${selectedCategory}`);
    if (selectedTitle) newHistory.push(`${selectedTitle}`);
    if (selectedRange) newHistory.push(`${selectedRange}`);
    if (selectedContent) newHistory.push(`${selectedContent}`);
    if (selectedMemo) newHistory.push(`${selectedMemo}`);
    setHistory(newHistory);
  }, [selectedCategory, selectedTitle, selectedRange, selectedContent, selectedMemo]);
  
  const handleCategorySelect = category => setSelectedCategory(category);
  const handleTitleChange = title => setSelectedTitle(title);
  const handleRangeSelect = range => setSelectedRange(range);
  const handleContentSelect = content => setSelectedContent(content);
  const handleMemoChange = memo => setSelectedMemo(memo);

  React.useEffect(() => {
    if (selectedContentIndex === contentTags.indexOf('직접입력')) {
      setSelectedContent(contentInput); // 직접 입력 상자의 값이 변경될 때마다 selectedCategory 업데이트
    }
  }, [contentInput, selectedContentIndex, categoryTags]);
  const contentHandlePress = (index) => {
    setSelectedContentIndex(index);
    if (contentTags[index] === '직접입력') {
      setContentInput('');
      setSelectedContent(contentTags[index]);
      console.log('직접입력' + contentInput);
    } else {
      setSelectedContent(contentTags[index]);
      setContentInput(null);
    }
  };
  React.useEffect(() => {
    if (selectedCategoryIndex === categoryTags.indexOf('직접입력')) {
      setSelectedCategory(customInput); // 직접 입력 상자의 값이 변경될 때마다 selectedCategory 업데이트
    }
  }, [customInput, selectedCategoryIndex, categoryTags]);
  const handlePress = (index) => {
    setSelectedCategoryIndex(index);
    if (categoryTags[index] === '직접입력') {
      setCustomInput('');
      setSelectedCategory(categoryTags[index]);
      console.log('직접입력' + customInput);
    } else {
      setSelectedCategory(categoryTags[index]);
      setCustomInput(null);
    }
  };
  const rangeHandlePress = (index) => {
    setSelectedRangeIndex(index);
    if (rangeTags[index] === '설정안함') {
      setSelectedRange('');
    }else {
        setSelectedRange(rangeTags[index]);
    }
  }
  // const rangeInput = () => {
  //   if (selectedRange !== '설정안함') {
  //     return (
  //       // <HomeworkType></HomeworkType>
  //     );
  //   }
  //   return null;
  // };
  const RangeTagListView = () => {
    return (
      <View style={styles.tagContainer}>
        <ScrollView horizontal={true}>
        {rangeTags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tagBox, selectedRangeIndex === index ? styles.selectedTag : {}]}
            onPress={() => rangeHandlePress(index)}
          >
            <Text style={selectedRangeIndex === index ? styles.selectedText : styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
        {}
      </View>
    );
  };
  const ContentTagListView = () => {
    return (
      <View style={styles.tagContainer}>
        {contentTags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tagBox, selectedContentIndex === index ? styles.selectedTag : {}]}
            onPress={() => contentHandlePress(index)}
          >
            <Text style={selectedContentIndex === index ? styles.selectedText : styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
        {contentRenderCustomInput()}
      </View>
    );
  };
  const TagListView = () => {
    return (
      <View style={styles.tagContainer}>
        {categoryTags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tagBox, selectedCategoryIndex === index ? styles.selectedTag : {}]}
            onPress={() => handlePress(index)}
          >
            <Text style={selectedCategoryIndex === index ? styles.selectedText : styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
        {renderCustomInput()}
      </View>
    );
  };
  const contentRenderCustomInput = () => {
    if (contentInput !== null) {
      return (
        <TextInput
          style={styles.input}
          onChangeText={setCustomInput}
          value={contentInput}
          placeholder="직접 입력하세요"
        />
      );
    }
    return null;
  };
  const renderCustomInput = () => {
    if (customInput !== null) {
      return (
        <TextInput
          style={styles.input}
          onChangeText={setCustomInput}
          value={customInput}
          placeholder="직접 입력하세요"
        />
      );
    }
    return null;
  };
  const titleCustomInput = () => {
    if (selectedTitle !== null) {
      return (
        <View>
        <TextInput
          style={styles.input}
          onChangeText={setSelectedTitle}
          value={selectedTitle}
          placeholder="ex. 교재명, 테스트명, 강의명, 프린트명 등"
          maxLength={10}
        />
        <Text style={styles.textLimit}>{"(" + selectedTitle.length + "/ 10)"}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View >
      <ScrollView>
      <Accordion title='유형' subTitle={selectedCategory} children={TagListView()} />
      <View style={styles.AccordionContainer}></View>
      <Accordion title='제목' subTitle={selectedTitle} children={titleCustomInput()} />
      <View style={styles.AccordionContainer}></View>
      <Accordion title='범위' subTitle={selectedRange} children={RangeTagListView()} />
      <View style={styles.AccordionContainer}></View>
      <Accordion title='내용' subTitle={selectedContent} children={ContentTagListView()} />
      <View style={styles.AccordionContainer}></View>
      <Accordion title='메모' subTitle='' children={<Text>내용입니다.</Text>} />
      <View style={styles.paddingContainer1}></View>
      <View style={styles.instanceParent}>
        <ScrollView horizontal={true}>
        {history.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <Text>{item}</Text>
            </View>))}
        </ScrollView>
    	</View>
      <TouchableOpacity>
      <View style={styles.parent}>
      			<Text style={styles.text}>추가</Text>
    	</View>
      <View style={styles.paddingContainer2}></View>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  historyItem: {
    borderRadius: 5,
    padding: 10,
    margin: 5,
    backgroundColor: '#ddd',
  },
  textLimit:{
    padding: 12,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Pretendard",
    color: "#585f73",
    textAlign: "right",
    marginTop: -0
    
  },
  paddingContainer1: {
    padding: 60
  },
  paddingContainer2: {
    padding: 80
  },
  parent: {
    borderRadius: 50,
    backgroundColor: "#d4d8e2",
    flex: 1,
    width: "100%",
    height: 56,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 118,
    paddingVertical: 14
  },
  AccordionContainer: {
    padding: 8
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 4
  },
  tagBox: {
    borderRadius: 5,
    backgroundColor: "#fefefe",
    borderStyle: "solid",
    borderColor: "#d4d8e2",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4
  },
  selectedTag: {    
    backgroundColor: "#192239",
    borderColor: "#192239"
  },
  selectedText: {
    fontSize: 16,
    color: "#FEFEFE"
  },
  tagText: {
    fontSize: 16,
    color: "#192239",
    fontWeight: "500",
    fontFamily: "Pretendard"
  },
  input: {
      backgroundColor: "#f4f6fb",
      height: 45,
      marginTop: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 5,
      overflow: "hidden",
      width: 318
  },
  wrapperFlexBox: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f4fd",
    borderRadius: 5,
    flexDirection: "row",
    overflow: "hidden"
},
text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
    fontFamily: "Pretendard",
    color: "#192239",
    textAlign: "left"
},
container: {
    marginLeft: 8
},
instanceParent: {
    backgroundColor: "#fefefe",
    borderStyle: "solid",
    borderColor: "#e6e8f0",
    borderTopWidth: 1,
    flex: 1,
    width: "100%",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    flexDirection: "row",
    overflow: "hidden"
}
});
