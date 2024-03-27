import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Item from "./src/components/Item";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

function HomeScreen({ navigation }) {
  // console.log(navigation);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>

      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate("Details", {
            id: 100,
            type: "t-shirt",
          });
        }}
      />

      <Button
        title="Go to Details Push"
        onPress={() => {
          navigation.push("Details");
        }}
      />
    </View>
  );
}

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
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // Describe navigator type
    <NavigationContainer>
      {/* <Stack.Navigator>
        Describe the registered screen 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
      </Stack.Navigator> */}

      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            headerStyle: {
              backgroundColor: "red"

            },
            headerTitleStyle: {
              color: "black"
            },
            tabBarStyle: {
              backgroundColor: "black"
            },
            tabBarIcon: (props) => {
              if (route.name == "Home") {
                return (
                  <SimpleLineIcons
                    name="feed"
                    size={props.size}
                    color={props.color}
                  />
                );
              }

              if (route.name == "Settings") {
                return (
                  <MaterialIcons
                    name="settings-applications"
                    size={props.size}
                    color={props.color}
                  />
                );
              }
            },

            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "white",
          };
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        {/* <Tab.Screen name="Store" component={StoreScreen} /> */}
      </Tab.Navigator>
      {/* <Register /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
