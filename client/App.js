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
            type: "t-shirt"
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
  console.log(route.params)
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
            type: "dress"
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

export default function App() {
  return (
    // Describe navigator type
    <NavigationContainer>
      <Stack.Navigator>
        {/* Describe the registered screen  */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
      </Stack.Navigator>
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
