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

export default function Login({ navigation }) {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  // console.log(data, loading, error);

  const { setIsSignedIn } = useContext(AuthContext);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome to HackTube</Text>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Silahkan Login.
        </Text>
        {/* <Text style={styles.text}>{text}</Text> */}
        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            style={styles.textInputForm}
            value={email}
            onChangeText={setEmail}
          ></TextInput>

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.textInputForm}
            value={password}
            onChangeText={setPassword}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.login}
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
              // console.log(response);
              setIsSignedIn(true);
            } catch (error) {
              console.log(error);
            }

            // navigation.navigate("HomeTab");
          }}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <Text style={{ color: "white", marginTop: 20 }}>
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

        {/* <StatusBar style="auto" /> */}
      </SafeAreaView>
    </SafeAreaProvider>
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
