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

export default function Register({ navigation }) {
  const [registerData, setRegisterData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
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
   
        <Text className="text-3xl pt-6 font-poppins-bold text-center text-white">Welcome to InteracTube</Text>
        <Image
          source={require("../assets/logoApp-removebg-preview.png")}
          className="w-36 h-36 "
        />

        <Text style={{ color: "white", fontWeight: "bold" }}>
          Silahkan Register.
        </Text>
        {/* <Text style={styles.text}>{text}</Text> */}
        <View style={styles.form}>
          <TextInput
            placeholder="Username"
            style={styles.textInputForm}
            value={registerData.username}
            onChangeText={(value) => {
              handleChangeInput("username", value);
            }}
          ></TextInput>

          <TextInput
            placeholder="Name"
            style={styles.textInputForm}
            value={registerData.name}
            onChangeText={(value) => {
              handleChangeInput("name", value);
            }}
          ></TextInput>

          <TextInput
            placeholder="Email"
            style={styles.textInputForm}
            value={registerData.email}
            onChangeText={(value) => {
              handleChangeInput("email", value);
            }}
          ></TextInput>

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.textInputForm}
            value={registerData.password}
            onChangeText={(value) => {
              handleChangeInput("password", value);
            }}
          ></TextInput>
        </View>
        <ToastManager width={300} />
        <TouchableOpacity
          style={styles.login}
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

        <Text style={{ color: "white", marginTop: 20, fontSize: 15 }}>
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
