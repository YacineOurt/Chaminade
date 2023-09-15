import { PassionOne_400Regular } from '@expo-google-fonts/passion-one';
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button, Image, Dimensions } from 'react-native';
import ImageToBase64 from './ImageToBase64';
import { get_employees_info } from "../api/index";

const screenWidth = Dimensions.get('window').width;

export default function TrombiProfilPerso({perso, userToken}) {

  const [persoProfil, setPersoProfil] = useState([]);

  async function createEmployeesProfilList() {
    try {
      const responseProfil = await get_employees_info(userToken, perso.id);
      if (responseProfil.status === 200) {
        setPersoProfil(responseProfil.data)
      } else {
        console.log("error fetching image for first employee");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des images des employés :", error);
    }
  }

  useEffect(() => {
      createEmployeesProfilList();
  }, []);

  const img = () => {
    if (!persoProfil.id) {
      return <View style={styles.emptyPicture}>
        </View>
    } else 
        return <ImageToBase64 id={persoProfil.id}></ImageToBase64>
  }

  return (
    <View style={styles.profilBox}>
      <View style={[styles.imgBox, styles.circleContainer]}>
        {img()}
      </View>
      <View style={styles.txtBox}>
        <Text style={[styles.txt, styles.txtName]}>{persoProfil.name} {persoProfil.surname}</Text>
        <Text style={styles.txt}>{persoProfil.gender}</Text>
        <Text style={styles.txt}>{persoProfil.birth_date}</Text>
        <Text style={styles.txt}>{persoProfil.email}</Text>
        <Text style={[styles.txt, styles.txtWork]}>{persoProfil.work}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    profilBox : {
      padding: 25,
      flex : 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor : 'white',
      borderRadius : 10
    },
    imgBox : {
      alignItems: 'center',
      marginBottom: 20,
  },
  circleContainer: {
    width: screenWidth / 3.5,
    height: screenWidth / 3.5,
    borderRadius : 100,
    overflow: "hidden",
    backgroundColor : 'D9D9D9'
  },
  emptyPicture : {
    width: screenWidth / 3.5,
    height: screenWidth / 3.5,
    borderRadius : 100,
    overflow: "hidden",
    backgroundColor: '#D9D9D9'
  },
  txt : {
    fontFamily: 'PassionOne',
    color: '#4F4F4F',
    fontSize: 16,
    paddingBottom : 6,
  },
  txtName : {
    fontSize : 24,
    color : 'black'
  },
  txtWork : {
    color : "#12460C"
  },
});