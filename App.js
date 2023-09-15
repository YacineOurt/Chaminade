import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { PassionOne_400Regular, PassionOne_700Bold } from '@expo-google-fonts/passion-one';
import Home from './pages/Home';
import Trombi from './pages/Trombi';
import Chat from './pages/Chat';
import Profil from './pages/Profil';
import BasicLayout from './layouts/BasicLayout';
import Login from './pages/Login';
import * as SecureStore from 'expo-secure-store';
import registerNNPushToken from 'native-notify';
import { registerForPushNotificationsAsync } from './components/PushNotification';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();

async function get_token(setUserToken) {
  try {
    const token = await SecureStore.getItemAsync("token")
    setUserToken(token);
  } catch (error) {
    console.log("no token loaded")
  }
}

async function get_push_token() {
  try {
  const token = await registerForPushNotificationsAsync()
    await SecureStore.setItemAsync("pushtoken", token)
  } catch(error) {
    console.log(error)
  }
}

export default function App() {
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    get_push_token()
  }, [])

  useEffect(() => {
    get_token(setUserToken)
  }, [])

  const [fontsLoaded] = useFonts({
    PassionOne: PassionOne_400Regular,
    PassionOneBig: PassionOne_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }
  const home_icon = {
    tabBarLabel: 'Home',
    tabBarShowLabel: false,
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="home" color={"#232323"} size={size} />
    ),
  };

  const chat_icon = {
    tabBarLabel: 'Chat',
    tabBarShowLabel: false,
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="chat" color={"#232323"} size={size} />
    ),
  };

  const profile_icon = {
    tabBarLabel: 'Profil',
    tabBarShowLabel: false,
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="account" color={"#232323"} size={size} />
    ),
  };

  const trombi_icon = {
    tabBarLabel: 'Trombi',
    tabBarShowLabel: false,
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="account-group" color={"#232323"} size={size} />
    ),
  };

  return (
    (userToken != null) ? (
    <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { position: 'absolute', height: Platform.OS === 'ios' ? '10%' : '5%'},
            headerShown: false,
          }}>
          <Tab.Screen name="Home" options={home_icon}>
            {() => <BasicLayout><Home userToken={userToken}></Home></BasicLayout>}
          </Tab.Screen>
          <Tab.Screen name="Trombi" options={trombi_icon}>
            {() => <BasicLayout><Trombi userToken={userToken}></Trombi></BasicLayout>}
          </Tab.Screen>
          <Tab.Screen name="Chat" options={chat_icon}>
            {() => <BasicLayout><Chat userToken={userToken}></Chat></BasicLayout>}
          </Tab.Screen>
          <Tab.Screen name="Profil" options={profile_icon}>
            {() => <BasicLayout><Profil setUserToken={setUserToken}></Profil></BasicLayout>}
          </Tab.Screen>
        </Tab.Navigator>
    </NavigationContainer>) :
    (<Login setUserToken={setUserToken}></Login>)
  );
}