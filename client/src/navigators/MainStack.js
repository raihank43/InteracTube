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
import * as SecureStore from "expo-secure-store";
import { useApolloClient } from "@apollo/client";

import Login from "../screens/Login";
import Register from "../screens/Register";
import HomeTab from "./HomeTab";
import PostDetail from "../screens/PostDetail";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PeoplesProfile from "../screens/OthersProfile";

import { AuthContext } from "../context/AuthContext";
import SearchScreen from "../screens/SearchScreen";
import SearchBarUser from "../components/SearchBarUser";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
export default function MainStack() {
  //? ini ngambil state sign in saat ini dari context
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const client = useApolloClient();

  return (
    /* // Describe navigator type */
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen
              options={({ navigation }) => ({
                headerStyle: {
                  backgroundColor: "#111827",
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                  shadowColor: "transparent", // for Android
                },
                headerTitle: () => (
                  <View>
                    <Image
                      className="w-32 h-5 "
                      source={require("../assets/interacTubeTransparent.png")}
                    ></Image>
                  </View>
                ),

                headerRight: () => (
                  <View className="flex-row gap-6">
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SearchUser")}
                    >
                      <FontAwesome name="search" size={24} color="#B91C1C" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <HeaderButtons>
                        <MaterialIcons
                          name="logout"
                          size={26}
                          color="red"
                          onPress={async () => {
                            await SecureStore.deleteItemAsync("accessToken");
                            await client.clearStore();
                            setIsSignedIn(false);
                            navigation.navigate("Login");
                          }}
                        />
                      </HeaderButtons>
                    </TouchableOpacity>
                  </View>
                ),
              })}
              name="HomeTab"
              component={HomeTab}
            />
            <Stack.Screen
              name="PostDetail"
              options={{ headerTitleAlign: "center" }}
              component={PostDetail}
            />
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
