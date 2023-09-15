import {Text, View, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import { useEffect, useState } from 'react';
import BasicLayout from "../layouts/BasicLayout";
import {get_token} from "../api/index"
import * as SecureStore from 'expo-secure-store';

export default function Login({setUserToken}) {
    const [email, setEmail] = useState("oliver.lewis@masurao.jp");
    const [mdp, setMdp] = useState("password");
    const [message, setMessage] = useState("");

    async function connexion() {

        const response = await get_token(email, mdp);

        if (response.status === 200) {
            SecureStore.setItemAsync("token", response.data.access_token)
            setUserToken(response.data.access_token);
        } else if (response.status === 401){
            setMessage("Adresse mail ou mot de passe incorrect")
            SecureStore.deleteItemAsync("token")
        } else {
            setMessage("Oups, veuillez réessayer plus tard")
        }
    }


    return (
        <BasicLayout>
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.logincard}>
                    <View style={styles.titleZone}>
                        <Text style={styles.title}>Vous revoilà !</Text>
                        <Text style={styles.subtitle}>Prêt à booster votre productivité ?</Text>
                    </View>
                    <View style={styles.formulaire}>
                        <View style={styles.textZone}>
                            {/* <Text style={styles.inputTitle}>Email</Text> */}
                            <TextInput style={styles.input}
                            value={email}
                            onChangeText={(newText) => setEmail(newText)}
                            placeholder="Adresse mail"
                            placeholderTextColor="rgba(128, 128, 128, 0.8)"></TextInput>
                        </View>
                        <View style={styles.textZone}>
                            {/* <Text style={styles.inputTitle}>Mot de passe</Text> */}
                            <TextInput style={styles.input}
                            value={mdp}
                            secureTextEntry={true}
                            onChangeText={(newText) => setMdp(newText)}
                            placeholder="Mot de passe"
                            placeholderTextColor="rgba(128, 128, 128, 0.8)"></TextInput>
                        </View>
                    </View>
                    <View style={styles.buttonZone}>
                        <TouchableOpacity style={styles.button} onPress={connexion}>
                            <Text style={styles.buttonText}>Connexion</Text>
                        </TouchableOpacity>
                        <Text style={styles.error}>{message}</Text>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </BasicLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    logincard: {
        backgroundColor: "#eafce9",
        backgroundColor: "white",
        height: "70%",
        width: "80%",
        borderRadius: 20,
        elevation: 5
    },
    titleZone: {
        height: "25%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 30,
        fontFamily: "PassionOneBig",
    },
    subtitle: {
        fontSize: 15,
        fontFamily: "PassionOne"
    },
    formulaire: {
        height: "50%",
        justifyContent: "center",
        alignItems: "center",

    },
    textZone: {
        width: "80%",
        height: 60,
        backgroundColor: "#ffffe6",
        marginTop: "10%",
        marginBottom: "5%",
        borderStyle: "solid",
        borderRadius: 80,
    },
    input: {
        flex: 1,
        margin: "4%",
        fontFamily: "PassionOne",
        fontSize: 20,
    },
    buttonZone: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "25%",
        width: "100%"
    },
    button: {
        backgroundColor:"#ffffe6",
        height: "40%",
        width: "50%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        fontFamily: "PassionOne",
        fontSize: 20,
    },
    error: {
        fontFamily: "PassionOne",
        fontSize: 15,
        color: "red",
    }

})