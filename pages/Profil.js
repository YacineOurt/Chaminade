import * as React from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { get_me, get_employees_image } from '../api/index.js'
import Card from "../components/Card";
import ImageToBase64 from '../components/ImageToBase64';
import {useState, useEffect} from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { navigation } from '@react-navigation/native';


export default function Profil({setUserToken}) {
	const [profileData, setProfileData] = React.useState(null);
	const [profileImageUrl, setProfileImageUrl] = React.useState(null);
	const [description, setDescription] = useState('');

	const handleLogout = async () => {
		try {
			await SecureStore.deleteItemAsync("token");
			setUserToken()
		} catch (error) {
			console.error('Erreur lors de la déconnexion: ', error);
		}
	};
	useEffect(() => {
		const ProfileData = async () => {
			try {
				const userToken = await SecureStore.getItemAsync('token');

				const response = await get_me(userToken);
				setProfileData(response.data);

				const imageResponse = await get_employees_image(userToken, response.data.id);
				if (imageResponse.status === 200) {
					setProfileImageUrl(imageResponse.data.url);
				}
		  	} catch (error) {
				console.error('Erreur lors de la récupération des données du profil :', error);
		  	}
		};
		ProfileData();
	}, []);

	return (
		<View style={{flex: 1, display: "flex", flexDirection: "column"}}>
			<View style={styles.circleContainer}>
			{profileData ? (
				<ImageToBase64 id={profileData.id}></ImageToBase64>
			) : (
				<Text>Chargement de l'image</Text>
			)}
			</View>
			<View style={styles.NameContainer}>
				{profileData ? (
					<View>
						<View>
							<Text style={styles.name}>{profileData.name}</Text>
						</View>
						<View>
							<Text style={styles.surname}>{profileData.surname}</Text>
						</View>
					</View>
				) : (
					<Text>i</Text>
				)}
			</View>
			<View style={styles.content}>
				<View style={styles.trombi}>
					{profileData ? (
						<View style={styles.trombiProfil}>
							<Card>
								<Text style={styles.id}>Id : {profileData.id}</Text>
								<Text style={styles.email}>Email : {profileData.email}</Text>
								<Text style={styles.birth_date}>Date de naissance : {profileData.birth_date}</Text>
								<Text style={styles.gender}>Gendre : {profileData.gender}</Text>
								<Text style={styles.work}>Travail : {profileData.work}</Text>
								<Text style={styles.subordinates}>Subordoner : {profileData.subordinates}</Text>
							</Card>
						</View>
					) : (
						<Text>Chargement des éléments</Text>
					)}
				</View>
					<KeyboardAvoidingView
						style={styles.container}
						behavior={Platform.OS === "ios" ? "padding" : null}
					>
					<View style={styles.descriptionContainer}>
						<View style={styles.descriptionBackground}>
							<Text style={styles.descriptionText}>Description</Text>
						</View>
						<TextInput
							style={styles.descriptionInput}
							onChangeText={text => setDescription(text)}
							returnKeyType="done"
							horizontalScroll={true} />
						<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
							<Text style={styles.logoutButtonText}>Se déconnecter</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</View>
		</View>
	);
}


const styles = StyleSheet.create({
	NameContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: -40,
	},
	content: {
		display:"flex",
		flexDirection: "column",
		flex: 1,
	},
	container: {
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'flex-start',
		marginVertical: 5,
		marginHorizontal: 20,
	},
	circleContainer: {
		borderRadius: 150,
		height: 150,
		width: 150,
		borderWidth: 2,
		borderColor: '#F24C00',
		alignSelf: 'flex-end',
		marginTop: 0,
		overflow: 'hidden',
	},
	trombi: {
	  	flexDirection: 'column',
		height: "30%",
	  	flex: 1,
	  	marginHorizontal: 20,
		marginTop: 100,
		marginLeft : 0,
	},
	trombiProfil: {
	  height: 130,
	  width: 240,
	  marginTop: 20,
	  marginLeft: 10,
	},
	id: {
		fontSize: 17,
		fontFamily: 'PassionOne',
		marginLeft: 8,
		marginTop: 5,
	},
	name: {
		color: 'white',
		fontSize: 40,
		fontFamily: 'PassionOneBig',
		marginLeft: 20,
		marginTop: -130,
	},
	surname: {
		color: 'white',
		fontSize: 40,
		fontFamily: 'PassionOneBig',
		marginLeft: 20,
		marginTop: -80,
		marginBottom: 20
	},
	email: {
		fontSize: 17,
		fontFamily: 'PassionOne',
		marginLeft: 8,
	},
	birth_date: {
		fontSize: 17,
		fontFamily: 'PassionOne',
		marginLeft: 8,
	},
	gender: {
		fontSize: 17,
		fontFamily: 'PassionOne',
		marginLeft: 8,
	},
	work: {
		fontSize: 17,
		fontFamily: 'PassionOne',
		marginLeft: 8,
	},
	subordinates: {
		fontSize: 17,
		fontFamily: 'PassionOne',
		marginLeft: 8,
	},
	descriptionContainer: {
		height: "50%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItem: 'flex-start',
		justifyContent: "flex-start",
		marginTop: 50
	},
	descriptionBackground: {
		backgroundColor: '#12460C',
		paddingHorizontal: 10,
		paddingVertical: 1,
	},
	descriptionText: {
		color: 'white',
		fontSize: 19,
		fontFamily: 'PassionOneBig',
	},
	descriptionInput: {
		width: 410,
		height: "60%",
		borderWidth: 1,
		borderColor: 'darkgrey',
		borderRadius: 10,
		alignSelf: 'center',
	},
	logoutButton: {
		backgroundColor: '#F24C00',
		// margin: 10,
		// marginBottom: 50,
		borderRadius: 5,
		alignSelf: 'flex-end',
		// marginTop: 250,
	},
	logoutButtonText: {
		color: 'white',
	},
  });
