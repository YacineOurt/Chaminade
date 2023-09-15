import { PassionOne_400Regular } from '@expo-google-fonts/passion-one';
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button, Image, Dimensions } from 'react-native';
import ImageToBase64 from './ImageToBase64';
import { get_employees_info } from "../api/index";

const screenWidth = Dimensions.get('window').width;

export default function TrombiProfil({data, id, userToken}) {

  const [perso, setPerso] = useState([]);

  async function createEmployeesProfilList() {
    try {
      const responseProfil = await get_employees_info(userToken, data.id);
      if (responseProfil.status === 200) {
        setPerso(responseProfil.data)
      } else {
        console.log("error fetching info for first employee");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des infos des employés :", error);
    }
  }

  useEffect(() => {
      createEmployeesProfilList();
  }, []);

  const img = () => {
    if (!perso.id) {
      return <View style={styles.emptyPicture}>
        </View>
    } else 
      return <ImageToBase64 id={perso.id}></ImageToBase64>
  }

  return (
    <View style={styles.card}>
      <View style={[styles.imgBox, styles.circleContainer]}>
        {img()}
      </View>
      <View style={styles.txtBox}>
          <Text style={styles.txtName}>{perso.name} {perso.surname}</Text>
          <Text style={styles.txt}>{perso.work}</Text>
          <Text style={styles.txt} numberOfLines={1}>{perso.email}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
      padding: 20,
      flex : 1,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    imgBox : {
        alignItems: 'center',
        marginBottom: 20,
    },
    txtBox : {
      width: "100%",
    },
    txt: {
        fontFamily: 'PassionOne',
        color: '#4F4F4F',
    },
    txtName: {
        fontFamily: 'PassionOne',
        fontSize: 16,
    },
    circleContainer: {
      width: screenWidth / 3.7,
      height: screenWidth / 3.7,
      borderRadius : 100,
      overflow: "hidden",
      backgroundColor : '#D9D9D9'
    },
    emptyPicture : {
      width: screenWidth / 3.7,
      height: screenWidth / 3.7,
      borderRadius : 100,
      overflow: "hidden",
      backgroundColor: '#D9D9D9'
    },
  });
