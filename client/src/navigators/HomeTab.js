import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import HeaderButton from "../components/HeaderButton";

import HomeScreen from "../screens/Home";
import LogoutScreen from "../screens/LogoutScreen";
import CreatePostScreen from "../screens/CreatePost";

import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import { FontAwesome } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import { View, Text } from "react-native";

const Tab = createMaterialTopTabNavigator();
export default function HomeTab({ navigation }) {
  return (
    <Tab.Navigator
      gestureHandlerProps={{
        springConfig: {
          damping: 50,
          mass: 1,
          stiffness: 500,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
        },
        timingConfig: { duration: 500 },
      }}
      screenOptions={({ route }) => ({
        lazy: true,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: "red",
          height: 3,
        },
        tabBarStyle: {
          backgroundColor: "#111827",
          height: 60,
          justifyContent: "center",
        },
        tabBarIcon: (props) => {
          if (route.name == "Home") {
            return <Entypo name="home" size={24} color={props.color} />;
          }

          if (route.name == "Settings") {
            return (
              <MaterialIcons
                name="settings-applications"
                size={24}
                color={props.color}
              />
            );
          }

          if (route.name == "Logout") {
            return (
              <MaterialIcons name="logout" size={24} color={props.color} />
            );
          }

          if (route.name == "CreatePost") {
            return (
              <MaterialIcons name="create" size={24} color={props.color} />
            );
          }

          if (route.name == "Profile") {
            return (
              <Ionicons name="person-circle" size={26} color={props.color} />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        navigation={navigation}
      />
      <Tab.Screen name="Profile" component={Profile} />

      {/* <Tab.Screen name="Logout" component={LogoutScreen} /> */}
    </Tab.Navigator>
  );
}
