import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  FlatList,
  Button,
  Image,
} from "react-native";

import Login from "../screens/Login";
import Register from "../screens/Register";
import HomeTab from "./HomeTab";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "../context/AuthContext";
// import client from "../config/apolloClient";

function DetailsScreen({ route, navigation }) {
  console.log(route.params);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>

      <Text>ID: {route.params.id}</Text>
      <Text>Type: {route.params.type}</Text>

      <Button
        title="Go to Store Navigate"
        onPress={() => {
          navigation.navigate("Store");
        }}
      />
    </View>
  );
}

function StoreScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>

      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate("Details");
        }}
      />

      <Button
        title="Go to Details Push"
        onPress={() => {
          navigation.push("Details", {
            id: 90,
            type: "dress",
          });
        }}
      />

      <Button
        title="Go to Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>

      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate("Details");
        }}
      />

      <Button
        title="Go to Details Push"
        onPress={() => {
          navigation.push("Details", {
            id: 90,
            type: "dress",
          });
        }}
      />

      <Button
        title="Go to Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function MainStack() {
  //? ini ngambil state sign in saat ini dari context
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);

  return (
    /* // Describe navigator type */
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="HomeTab"
              component={HomeTab}
            />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Store" component={StoreScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
        {/* Describe the registered screen  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
