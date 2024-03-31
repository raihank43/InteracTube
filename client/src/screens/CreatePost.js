import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
      navigation.navigate("Home");
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Create new Post</Text>
      <TextInput
        placeholder="What's happening?"
        style={styles.textInputContent}
        value={content}
        multiline
        numberOfLines={4}
        onChangeText={setContent}
      />
      <TextInput
        placeholder="Insert Image Url..."
        style={styles.textInputUrl}
        value={imgUrl}
        onChangeText={setImgUrl}
      />
      <TouchableOpacity
        style={styles.buttonSubmit}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626ff",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  textInputContent: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom: 10,
    fontSize: 50,
  },
  textInputUrl: {
    padding: 10,
    // borderRadius: 5,
    backgroundColor: "white",
  },
  buttonSubmit: {
    backgroundColor: "red",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
});
