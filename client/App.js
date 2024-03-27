import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

export default function App() {
  const [tulisan, setTulisan] = useState(false);
  const [text, setText] = useState("");

  const showTulisan = () => {
    setTulisan(true);
    if (tulisan) {
      setTulisan(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HackTube</Text>
      <Text>Silahkan Login.</Text>
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
          Alert.alert("LOGIN SUCCESSS");
        }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      {/* <StatusBar style="auto" /> */}
    </View>
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
    textAlign: "center"
  },

  login: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: 300,
    height: 50,
    marginTop: 20,
    justifyContent: "center"
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
