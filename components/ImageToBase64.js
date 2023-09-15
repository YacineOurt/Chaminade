  import React, { useEffect, useState } from 'react';
  import { View, Text, Image, StyleSheet } from 'react-native';
  import {get_emloyees_image} from '../api/index.js'
  import * as Securestore from 'expo-secure-store';

  export default function ImageToBase64({id}) {
    const [imageData, setImageData] = useState(null);
    useEffect(() => {
      const getImage = async () => {
        const tokenClient = await Securestore.getItemAsync("token");
        try {
          const url = 'https://masurao.fr/api/employees/'+id+'/image';
          const response = await fetch(
            url,
            {
              method: 'GET',
              headers: {
                Authorization: 'Bearer ' + tokenClient,
                'Content-Type': 'image/png',
                'X-Group-Authorization': process.env.EXPO_PUBLIC_API_KEY,
                accept: 'image/png',
              },
            }
          );

          if (response.status === 200) {
            const imageBlob = await response.blob();
            const imageBase64 = await blobToBase64(imageBlob);
            setImageData(imageBase64);
          } else {
            if (response.status === 429) {
              setTimeout(getImage, 10000);
            }
            console.error('Erreur lors du téléchargement de l\'image. + ' + response.status + ' : ' + id);
          }
        } catch (error) {
          console.error('Erreur lors du téléchargement de l\'image :', error);
        }
      };

      getImage();
    }, []);

    const blobToBase64 = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
      });
    };

    return (
      <View style={{height: "100%", width: "100%"}}>
        {imageData && <Image source={{ uri: `data:image/png;base64,${imageData}`}} style={{height: "100%", width: "100%"}}/>}
      </View>
    )
    
    
  }