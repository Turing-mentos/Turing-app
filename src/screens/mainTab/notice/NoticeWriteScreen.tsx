import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Accordion from '../../../components/common/Accordion';
export default function NoticeWriteScreen() {
  const [categoryTags, setCategoryTags] = React.useState(['독해', '문법', '어휘', '듣기', '작문', '회화', 'TEST', '직접입력']);
  const [contentTags, setContentTags] = React.useState(['풀이', '암기', '오답', '복습', '예습', '분석', '실전연습', '직접입력']);
  const [selectedTags, setSelectedTags] = React.useState(new Array(categoryTags.length).fill(false));

  const handlePress = (index) => {
    const updatedTags = [...selectedTags];
    console.log(updatedTags);
    updatedTags[index] = !updatedTags[index];
    setSelectedTags(updatedTags);
    console.log("Selected Tag:", categoryTags[index]);
  };
  const TagListView = (tags) => {
    return (
      <View style={styles.tagContainer}>
      {tags.map((tag, index) => (
          <TouchableOpacity key={index} style={[styles.tagBox, selectedTags[index] ? styles.selectedTag : {}]} onPress={() => handlePress(tag)}>
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
      ))}
      </View>
    );
  };
  const CategoryTagListView = TagListView(categoryTags);
  return (
    <View>
      <Accordion title='유형' subTitle='' children={CategoryTagListView}/>
      <Accordion title='제목' subTitle='' children={<Text>내용입니다.</Text>}/>
      <Accordion title='범위' subTitle='' children={<Text>내용입니다.</Text>}/>
      <Accordion title='내용' subTitle='' children={<Text>내용입니다.</Text>}/>
      <Accordion title='메모' subTitle='' children={<Text>내용입니다.</Text>}/>
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 12
  },
  selectedTag: {
    backgroundColor: "#192239",
    borderColor: "#192239",
    paddingHorizontal: 12,
    justifyContent: "center"
  },
  tagBox: {
    borderRadius: 5,
    backgroundColor: "#fefefe",
    borderStyle: "solid",
    borderColor: "#d4d8e2",
    borderWidth: 1,
    flex: 1,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  tagText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    fontFamily: "Pretendard",
    color: "#192239",
    textAlign: "left"
  },
  wrapperFlexBox: {
      alignItems: "center",
      flexDirection: "row"
  },
  text: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: "Pretendard",
      color: "#7b8297",
      textAlign: "left"
  },
});
