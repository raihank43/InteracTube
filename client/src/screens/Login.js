import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  FlatList,
  TouchableHighlight,
  TouchableNativeFeedback,
  Image,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { gql, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { LOGIN_MUTATION } from "../mutations/LoginMutation";
import ToastManager, { Toast } from "toastify-react-native";
// import tw from "tailwind-react-native-classnames";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      Toast.error(error.message);
    },
  });

  const { setIsSignedIn } = useContext(AuthContext);
  return (
    <SafeAreaProvider className="bg-gray-900 border-none">
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style="black" />
        <ToastManager width={300} />

        <View
          className="border-none items-center pt-10 bg-white w-full pb-10"
          style={{
            borderBottomRightRadius: 120,
            boxShadow: "0 0 10px 0 rgba(255,255,255,0.2)",
          }}
        >
          <Text className="font-poppins-bold text-red-600 text-4xl">
            Welcome to
          </Text>
          <Image
            source={require("../assets/logoTransparent.png")}
            className="w-full h-32"
          />
        </View>

        <View
          id="login-card"
          className="items-center bg-gray-900 w-full flex-1 p-6"
        >
          <Text
            className=" rounded self-start font-poppins-bold text-xl"
            style={{ color: "red" }}
          >
            Silahkan Login
          </Text>

          <View id="login-forms" className="gap-6 mt-3">
            <View className="flex-row w-full items-center p-2 border-2 rounded-lg border-white">
              <MaterialIcons name="email" size={24} color="white" />
              <TextInput
                placeholder="Email"
                placeholderTextColor={"white"}
                className="text-white w-64 font-poppins-regular p-2 "
                // style={styles.textInputForm}
                value={email}
                onChangeText={setEmail}
              ></TextInput>
            </View>

            <View className="flex-row w-full items-center p-2 border-2 rounded-lg border-white">
              <FontAwesome name="keyboard-o" size={24} color="white" />
              <TextInput
                placeholder="Password"
                placeholderTextColor={"white"}
                secureTextEntry
                className="text-white w-64 font-poppins-regular p-2 "
                value={password}
                onChangeText={setPassword}
              ></TextInput>
            </View>
          </View>

          <TouchableOpacity
            className="p-4 rounded-2xl mt-6 w-full"
            style={{ backgroundColor: "red" }}
            onPress={async () => {
              try {
                const response = await login({
                  variables: {
                    email,
                    password,
                  },
                });
                await SecureStore.setItemAsync(
                  "accessToken",
                  response.data.login.access_token
                );
                // console.log(response.data.login);

                setIsSignedIn(true);
              } catch (error) {
                console.log(error);
              }

              // navigation.navigate("HomeTab");
            }}
          >
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <Text
            className="font-poppins-regular"
            style={{ color: "white", marginTop: 20 }}
          >
            Belum Punya Akun? Silahkan{" "}
            <Text
              style={{ color: "red", fontWeight: "bold", fontSize: 15 }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              Register
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgb(15 23 42)",
    // backgroundColor: "white",
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
