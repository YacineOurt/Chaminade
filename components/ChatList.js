import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { useEffect, useState } from 'react'
import  {getUniquePersons} from '../api/storage'
import Discussion from '../pages/Discussion';
import Card from './Card';

export default function ChatList({socket}) {
  const [uniquePersons, setUniquePersons] = useState(["Pascal"]);
  const [currentConv, setCurrentConv] = useState("");
  const myName = "Jean";

  useEffect(() => {
    //TODO: Decommenter ceci : 
    // getUniquePersons().then((persons) => setUniquePersons(persons));
  }, [])

  return (
    <View style={styles.container}>
      {currentConv === "" ? (
        <>
          {uniquePersons.map((person) => {
            if (person !== myName) {
              return (
                <TouchableOpacity
                    key={person}
                    onPress={() => setCurrentConv(person)}
                    style={styles.discussion}
                  >
                    <Card style={styles.card}>
                      <View style={styles.insideCard}>
                        <Text style={styles.name}>{person}</Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
              );
            } else {
              return null;
            }
          })}
        </>
      ) : (
        <View style={{width: "100%", height:"100%"}}>
          <Discussion socket={socket} current={currentConv} />
        </View>
      )}
    </View>
  );    
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    display: "flex",
    flexDirection: "column",
    paddingTop: "15%",
    gap: 15,
    alignItems: "center",
  },
  discussion: {
    height: '15%',
    width: "90%",
  },
  insideCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },  
  name: {
    textAlign: "center",
    fontSize: 20
  }
})
