import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/GetPostQuery";
import { ADD_POST } from "../mutations/AddPostMutation";
import { GET_CURRENT_LOG_USER } from "../queries/GetUserProfile";

export default function CreatePostScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");

  const [addPost, { data, loading, error }] = useMutation(ADD_POST, {
    refetchQueries: [GET_POSTS],
    onCompleted: () => {
      // pindah halaman
      navigation.navigate("Home");
    },
  });

  const {
    data: { findCurrentLogUser },
    loading: logLoading,
    error: logError,
  } = useQuery(GET_CURRENT_LOG_USER);

  if (logLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View className="bg-gray-900 items-center p-6 rounded-b-2xl">
        <Text className=" font-poppins-bold text-3xl text-red-600">
          Create a New Post
        </Text>
      </View>
      <View className="flex-row items-center gap-2 p-6">
        <Image
          className="w-10 h-10 rounded-full"
          src={`https://api.dicebear.com/8.x/adventurer-neutral/png?seed=${findCurrentLogUser.name}`}
        ></Image>
        <View className="justify-center">
          <Text className="font-poppins-bold text-2xl">
            {findCurrentLogUser.name}
          </Text>
          <Text className=" font-poppins-regular text-gray-500">just now</Text>
        </View>
      </View>
      <View className="flex-1">
        <TextInput
          placeholder="What's happening?"
          className="px-5 pt-5 bg-white text-3xl font-poppins-regular "
          // style={styles.textInputContent}
          value={content}
          multiline={true}
          // numberOfLines={4}
          onChangeText={setContent}
        />
      </View>

      <TextInput
        placeholder="Put some Tags"
        style={styles.textInputUrl}
        value={tags}
        onChangeText={setTags}
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
                tags: tags,
              },
            },
          });
        }}
      >
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "white",
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
    height: 50,
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
});
