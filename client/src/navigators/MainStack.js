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
import PostDetail from "../screens/PostDetail";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PeoplesProfile from "../screens/OthersProfile";

import { AuthContext } from "../context/AuthContext";
import SearchScreen from "../screens/SearchScreen";
import SearchBarUser from "../components/SearchBarUser";

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
            <Stack.Screen name="PostDetail" component={PostDetail} />
            <Stack.Screen name="PeoplesProfile" component={PeoplesProfile} />
            <Stack.Screen
              name="SearchUser"
              component={SearchScreen}
              options={{
                headerTitle: () => (
                  <View>
                    <SearchBarUser />
                  </View>
                ),
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
        {/* Describe the registered screen  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
