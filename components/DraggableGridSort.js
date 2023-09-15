import AnySizeDragSortableView from '../lib/AnySizeDragSortableView';
import React, { useState, useEffect, createRef, useRef } from 'react';
import Card from "./Card";
import * as Haptics from 'expo-haptics';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView
  } from "react-native";
import AddPlugin from './AddPlugin';

const { width } = Dimensions.get("window");
const parentWidth = width - 18;
const childrenWidth = (width / 100);
const childrenHeight = childrenWidth;
const marginChildrenTop = 7;
const marginChildrenBottom = 0;
const marginChildrenLeft = 0;
const marginChildrenRight = 7;
const childrenLongWidth = (width / 100);
const childrenLongHeight = childrenLongWidth;


export default function DraggableGridSort({items, setItems}) {
    const [data, setData] = useState(items);
    const [scrollEnabled, setscrollEnabled] = useState(true);
    const sortableViewRef = useRef()
    const [movedKey, setmovedKey] = useState();
  
    const renderItem = (item, index, ismoved) => {
        return (
          <TouchableOpacity
          onLongPress={() => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )
              setscrollEnabled(false);
              setmovedKey(item.id)
              sortableViewRef.current.startTouch(item, index)
          }}
          onPressOut = {() => {
              sortableViewRef.current.onPressOut();
              setscrollEnabled(true);
          }}
          >    
            <View style={[styles.item_children, {width: childrenLongWidth * item.width_percent, height: childrenHeight * item.height_percent}]}>
              <Card children={item.component} deleteItem={() => {
                setData((data.filter((it) => it.id != item.id)))
                setItems((data.filter((it) => it.id != item.id)))
              }} />
            </View>
          </TouchableOpacity>
        );
    };

    return(
      <ScrollView
        ref={(scrollView) => (this.scrollView = scrollView)}
        scrollEnabled={scrollEnabled}>
        <KeyboardAvoidingView style={styles.sort}
            keyboardVerticalOffset={200}
            behavior={"position"}>
            <AnySizeDragSortableView
              ref={sortableViewRef}
              dataSource={data}
              parentWidth={parentWidth}
              marginChildrenTop={marginChildrenTop}
              marginChildrenBottom={marginChildrenBottom}
              marginChildrenLeft={marginChildrenLeft}
              marginChildrenRight={marginChildrenRight}
              onDataChange={(data, callback) => {
                if (data.length !== data) {
                  setData(data)
                  callback()
                }
              }}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
            <View style={{height: 80}}>
              <Card>
                <AddPlugin setData={setData} items={items} setItems={setItems}></AddPlugin>
              </Card>
          </View >
        </KeyboardAvoidingView>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20
    },
    txt: {
      fontSize: 18,
      lineHeight: 24,
      padding: 5
    },
    sort: {
      width: '95%',
      marginLeft: 'auto',
      marginRight: 'auto',
      flex: 1
    },
    item_children: {
      flex: 2,
      width: childrenWidth - 8,
      height: childrenHeight - 8,
      backgroundColor: "#f0ffff",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      marginHorizontal: 4,
      marginTop: 8,
    },
    item_delete_icon: {
      width: 14,
      height: 14,
      position: "absolute",
      right: 1,
      top: 1
    },
    item_icon: {
      width: childrenWidth - 4 - 8,
      height: childrenHeight - 4 - 8,
      resizeMode: "contain",
      position: "absolute"
    }
  });
