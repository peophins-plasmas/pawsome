import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegistrationScreen } from "./src/screens";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import { decode, encode } from "base-64";
import { firebase } from "./src/firebase/config";
import auth from "@react-native-firebase/auth";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (loading) setLoading(false);
  }

  if (loading) return null;

  useEffect(() => {
    console.log("USE EFFECT RUNS");
    // console.log("user token", user.Token);
    const usersRef = firebase.firestore().collection("users");
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("If USER");
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        console.log("If NOT user");
        setLoading(false);
      }
    });
    return subscriber;
  }, []);

  if (loading) {
    console.log("LOAKDING");
    return (
      <SafeAreaView>
        <Text>LoadingsHIHIHIHIHI</Text>
      </SafeAreaView>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home'>
          {(props) => <HomeScreen {...props} extraData={user} />}
        </Stack.Screen>

        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Registration' component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
