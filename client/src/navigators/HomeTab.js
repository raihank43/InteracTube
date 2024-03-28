import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import LogoutScreen from "../screens/LogoutScreen";
import CreatePostScreen from "../screens/CreatePost";

import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();
export default function HomeTab({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerStyle: {
            backgroundColor: "#ff1b1cff",
          },
          headerTitleStyle: {
            color: "black",
          },
          tabBarStyle: {
            backgroundColor: "#262626ff",
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

            if (route.name == "Logout") {
              return (
                <MaterialIcons
                  name="logout"
                  size={props.size}
                  color={props.color}
                />
              );
            }

            if (route.name == "CreatePost") {
              return (
                <MaterialIcons
                  name="create"
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
      <Tab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        navigation={navigation}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      <Tab.Screen name="Logout" component={LogoutScreen} />
      {/* <Tab.Screen name="Store" component={StoreScreen} /> */}
    </Tab.Navigator>
  );
}
