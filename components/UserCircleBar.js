import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { get_employees, get_employees_image } from "../api/index";
import UserCircle from '../components/UserCircle';
import DraggableGridComp from '../components/DraggableGrid';

export default function UserCircleBar({ navigation, userToken }) {
  const [allEmployees, setAllEmployees] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  async function createEmployeesList() {
    try {
      const responseEmployees = await get_employees(userToken);
      if (responseEmployees.status === 200) {
        setAllEmployees(responseEmployees.data);
      } else {
        console.error("Error: cant create employees list")
      }
    } catch (error) {
      console.error("Erreur lors de la création de la liste des employés :", error);
    }
  }

  async function createImagesList() {
    try {
      const responseImage = await get_employees_image(userToken, 10);
      let imageForAll = null;
      if (responseImage.status === 200) {
        imageForAll = responseImage.data;
        const images = new Array(allEmployees.length).fill(imageForAll);
        setAllImages(images);
        setIsFinish(true);
      } else {
        console.log("error fetching image for first employee");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des images des employés :", error);
    }
  }

  function moove() {
    navigation.Trombi();
  }

  useEffect(() => {
    createEmployeesList();
  }, []);

  useEffect(() => {
    if (allEmployees.length > 0) {
      createImagesList();
    }
  }, [allEmployees]);

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.userList}
        data={allEmployees}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.employe}>
            <UserCircle data={item} image={allImages[index]} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    height: "84%",
    width: "100%",
  },
  userList: {
    height: "18%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  employe: {
    height: 100,
    width: 100,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "blue",
    position: 'absolute',
    top: 300,
  },
});
