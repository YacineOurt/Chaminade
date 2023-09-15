import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';

const Task = (props) => {

    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <Text style={styles.itemText}>{props.text}</Text>
        </View>
        <View style={styles.circular}></View>
      </View>
    )
  }

export const TodoListWidget = () => {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const [nbTask, setNbTask] = useState(0);

    const handleAddTask = () => {
        setNbTask(nbTask + 1)
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setTask(null);
      }
    
      const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy)
        setNbTask(nbTask - 1)
      }
    return (
        <View>
            <Text style={styles.TittleText}>Tâches à faire aujourd'hui</Text>
            {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                  <Task text={item} /> 
                </TouchableOpacity>
              )
            })
            }
            {nbTask < 2 && <View style={styles.viewInput}>
              <TextInput style={styles.input} placeholder={'Écrire une tache'} value={task} onChangeText={text => setTask(text)} />
              <TouchableOpacity onPress={() => handleAddTask()}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    viewInput: {
      paddingTop: 10,
      alignItems: 'center',
    },
    TittleText: {
        textAlign: "center",
        fontSize: 20
      },
      item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
      },
      square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
      },
      itemText: {
        width: '80%',
        height: '10%'
      },
      addText: {
        fontSize: 30
      },
      input: {
        height: '30%',
        width: '60%',
        textAlign: 'center'
      },
      circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
      },
  });