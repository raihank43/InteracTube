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
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Login({ navigation }) {
  const [text, setText] = useState("");
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72s",
      title: "Fourth Item",
    },
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome to HackTube</Text>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Silahkan Login.
        </Text>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            style={styles.textInputForm}
            value={text}
            onChangeText={setText}
          ></TextInput>

          <TextInput
            placeholder="Password"
            style={styles.textInputForm}
            value={text}
            onChangeText={setText}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.login}
          onPress={() => {
            navigation.navigate("HomeTab");
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
