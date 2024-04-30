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
  Image,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { REGISTER_MUTATION } from "../mutations/RegisterMutation";
import { useMutation } from "@apollo/client";
import ToastManager, { Toast } from "toastify-react-native";
import { styled } from "nativewind";
import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

export default function Register({ navigation }) {
  const [registerData, setRegisterData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const StyledView = styled(View);
  const [registerUser, { data, loading, error }] = useMutation(
    REGISTER_MUTATION,
    {
      onCompleted: () => {
        ToastSuccess();
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1000);
      },
      onError: (error) => {
        ToastError(error.message);
      },
    }
  );

  const handleChangeInput = (name, value) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const ToastError = (message) => {
    Toast.error(message);
  };

  const ToastSuccess = () => {
    Toast.success("Success register, please Login.");
  };

  return (
    <SafeAreaProvider className="bg-gray-900">
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style="light" />
        <View className="w-full items-center">
          <Image
            source={require("../assets/logoTransparent.png")}
            className="w-60 h-60"
          />
        </View>

        <ToastManager width={300} />

        <View className="bg-white p-6 w-full rounded-t-3xl">
          <Text className="text-red-700 rounded self-start font-poppins-bold mb-6 text-xl">
            Create Your Account
          </Text>
          {/* <Text style={styles.text}>{text}</Text> */}
          <View className="gap-3">
            <View className="flex flex-row items-center border-b-2 border-black">
              <FontAwesome name="user-circle" size={24} color="black" />
              <TextInput
                placeholder="Username"
                className=" p-3 w-64 text-black font-poppins-regular"
                value={registerData.username}
                onChangeText={(value) => {
                  handleChangeInput("username", value);
                }}
              ></TextInput>
            </View>

            <View className="flex flex-row items-center border-b-2 border-black">
              <MaterialCommunityIcons name="account" size={24} color="black" />
              <TextInput
                placeholder="Name"
                className=" p-3 w-64 text-black font-poppins-regular"
                value={registerData.name}
                onChangeText={(value) => {
                  handleChangeInput("name", value);
                }}
              ></TextInput>
            </View>

            <View className="flex flex-row items-center border-b-2 border-black">
              <MaterialIcons name="email" size={24} color="black" />
              <TextInput
                placeholder="Email"
                className=" p-3 w-64 text-black font-poppins-regular"
                value={registerData.email}
                onChangeText={(value) => {
                  handleChangeInput("email", value);
                }}
              ></TextInput>
            </View>

            <View className="flex flex-row items-center border-b-2 border-black">
              <MaterialIcons name="password" size={24} color="black" />
              <TextInput
                placeholder="Password"
                secureTextEntry
                className=" p-3 w-64 text-black font-poppins-regular"
                value={registerData.password}
                onChangeText={(value) => {
                  handleChangeInput("password", value);
                }}
              ></TextInput>
            </View>
          </View>

          <TouchableOpacity
            className="rounded-2xl p-4 mt-6 w-full text-white font-poppins-bold"
            style={{ backgroundColor: "red" }}
            onPress={() => {
              registerUser({
                variables: {
                  newUser: {
                    email: registerData.email,
                    name: registerData.name,
                    password: registerData.password,
                    username: registerData.username,
                  },
                },
              });
            }}
          >
            <Text style={styles.loginText}>REGISTER</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text className="text-black text-center mt-3 text-sm font-poppins-regular">
              Sudah Punya Akun? Silahkan{" "}
              <Text
                onPress={() => {
                  navigation.navigate("Login");
                }}
                style={{ color: "red", fontWeight: "bold" }}
              >
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* <StatusBar style="auto" /> */}
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(15 23 42)",
    minHeight: "100vh",
  },

  // loginPage: {
  //   // backgroundColor: "white",
  //   flex: 1,
  //   width: "100%"
  // },

  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "white",
    textAlign: "center",
  },

  login: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: 300,
    height: 50,
    marginTop: 20,
    justifyContent: "center",
  },

  loginText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  form: {
    gap: 20,
  },

  textInputForm: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    width: 300,
    borderWidth: 1,
  },
});
