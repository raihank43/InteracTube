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
      {/* <View style={styles.loginPage}> */}
        <Text style={styles.text}>HackTube</Text>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.form}>
          <TextInput
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
      {/* </View> */}

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

  loginPage: {
    // backgroundColor: "white",
    alignItems: "center",
    padding: 100
  },

  text: {
    fontWeight: "bold",
    fontSize: 50,
    color: "white",
  },

  login: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: 200,
    marginTop: 20,
  },

  loginText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  form: {
    backgroundColor: "white",

  },

  textInputForm: {
    width: 200,
    borderWidth: 1,
  },
});
