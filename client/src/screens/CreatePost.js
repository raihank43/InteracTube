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
import { gql, useMutation } from "@apollo/client";
import { GET_POSTS } from "../queries/GetPostQuery";
import { ADD_POST } from "../mutations/AddPostMutation";

export default function CreatePostScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [addPost, { data, loading, error }] = useMutation(ADD_POST, {
    refetchQueries: [GET_POSTS],
    onCompleted: () => {
      // pindah halaman
      navigation.navigate("Home")
    }
  });

  // console.log(data, loading, error);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Create new Post</Text>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Share what you think
        </Text>
        <Text style={styles.text}>{}</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="What's happening?"
            style={styles.textInputForm}
            value={content}
            onChangeText={setContent}
          ></TextInput>

          <TextInput
            placeholder="Insert Image Url..."
            style={styles.textInputForm}
            value={imgUrl}
            onChangeText={setImgUrl}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.Post}
          onPress={() => {
            addPost({
              variables: {
                newPost: {
                  content: content,
                  imgUrl: imgUrl,
                  tags: [],
                },
              },
            });
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#262626ff",
  },

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
