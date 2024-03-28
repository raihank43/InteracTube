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

export default function CreatePostScreen({ navigation }) {
  const [text, setText] = useState("");
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Create new Post</Text>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Silahkan Login.
        </Text>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="What's happening?"
            style={styles.textInputForm}
            value={text}
            onChangeText={setText}
          ></TextInput>

          <TextInput
            placeholder="Insert Image Url..."
            style={styles.textInputForm}
            value={text}
            onChangeText={setText}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.Post}
          onPress={() => {
            navigation.navigate("HomeTab");
          }}
        >
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>

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

  Post: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: 300,
    height: 50,
    marginTop: 20,
    justifyContent: "center",
  },

  submitText: {
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
