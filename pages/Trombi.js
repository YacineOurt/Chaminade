import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button, FlatList, Dimensions, TextInput, TouchableOpacity, Modal } from 'react-native';
import TrombiProfil from '../components/TrombiProfil';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { get_employees } from "../api/index";
import TrombiProfilPerso from '../components/TrombiProfilPerso';

const screenWidth = Dimensions.get('window').width;

export default function Trombi({ navigation, userToken }) {

  let data = [];
  const [allEmployees, setAllEmployees] = useState([]);
  const [allEmployeesProfil, setAllEmployeesProfil] = useState([]);
  const [perso, setPerso] = useState([]);
  const [showPerso, setShowPerso] = useState(false);
  async function createEmployeesList() {
    try {
      const responseEmployees = await get_employees(userToken);
      if (responseEmployees.status === 200) {
        setAllEmployees(responseEmployees.data);
      } else {
        // setIsError(true);
      }
    } catch (error) {
      console.error("Erreur lors de la création de la liste des employés :", error);
    }
  }

  function sortAlpha() {
    allEmployees.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      } else {
        return 1;
      };
     });
  }

  useEffect(() => {
    createEmployeesList();
  }, []);

  const showModal = (item) => {
    setShowPerso(true);
    setPerso(item)
  };

  const hideModal = () => {
    setShowPerso(false);
  };

  return (
    <View style={styles.trombiBox}>
      <TouchableOpacity
        onPress={hideModal}
        activeOpacity={0.9}
      >
        <Modal
          visible={showPerso}
          transparent={true}
          animationType="slide"
          onRequestClose={hideModal}
        >
          <TouchableOpacity onPress={hideModal} activeOpacity={0.98}>
            <View style={styles.trombiOverlay}>
              <View style={styles.persoCard}>
                <Card>
                  <TrombiProfilPerso perso={perso} userToken={userToken}/>
                </Card>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

      </TouchableOpacity>
      <FlatList
        showsScrollIndicator={false}
        style={styles.userList}
        numColumns={2}
        data={allEmployees}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.trombiProfil}>
            <TouchableOpacity
            onPress={() => showModal(item)}
            activeOpacity={0.95}
            >
              <Card>
                <TrombiProfil data={item} id={item.id} userToken={userToken} />
              </Card>
              
            </TouchableOpacity>
            
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  trombiBox: {
    flex: 1,
    alignItems: 'center',
    marginBottom : screenWidth / 5,
    marginTop : screenWidth / 10,
  },
  trombi: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  trombiProfil: {
    width: screenWidth / 2.3,
    height: screenWidth / 1.5,
    borderRadius : 100,
    margin: 5,
  },
  trombiOverlay : {
    height : '100%',
    width : '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent : 'center',
    alignItems : 'center',
  },
  close : {
    backgroundColor : 'white',
  },
  persoCard : {
    width: screenWidth / 1.6,
    height: screenWidth / 1,
  },
});
