import React, { useState } from "react";
import { Text, View } from "react-native";
import { LoginScreen } from "../LoginScreen/LoginScreen";
import { firebase } from "../../firebase/config";

export default function HomeScreen(props) {
  console.log("HIYA");

  return (
    <View>
      <Text>Home Screen </Text>

      <View>
        {props.user ? <Text>Hello, {props.user} </Text> : <LoginScreen />}
      </View>
    </View>
  );
}
