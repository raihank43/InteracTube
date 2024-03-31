import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { GET_POST_BY_ID } from "../queries/GetPostDetail";
import { useMutation, useQuery } from "@apollo/client";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PostComment from "../components/PostComments";
import { CREATE_COMMENT } from "../mutations/CreateCommentMutation";

export default function PostDetail({ navigation, route }) {
  const { _id } = route.params;
  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: {
      _id: _id,
    },
  });
  const [addComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [GET_POST_BY_ID],
  });

  const [comment, setComment] = useState("");

  // console.log(comment)

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            ...styles.container,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <ActivityIndicator size={"large"} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (error) {
    console.log(error);
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            ...styles.container,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Something went wrong:{" "}
          </Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.author}>{data.findPostById.author.name}</Text>
        {data.findPostById.imgUrl ? (
          <Image style={styles.image} src={data.findPostById.imgUrl} />
        ) : (
          ""
        )}

        <Text style={styles.content}>{data.findPostById.content}</Text>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.likeButton}>
            <FontAwesome name="thumbs-up" size={24} color="red" />
            <Text style={styles.likeCount}>
              {data.findPostById.likes.length}
            </Text>
          </TouchableOpacity>
          <View style={styles.comments}>
            <FlatList
              data={data.findPostById.comments}
              renderItem={({ item }) => <PostComment PostComment={item} />}
              keyExtractor={(item) => item._id}
            />
          </View>
        </View>
        <View style={styles.commentBox}>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            placeholder="Add a comment..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              addComment({
                variables: {
                  newComment: {
                    content: comment,
                    postId: _id,
                  },
                },
              });
            }}
          >
            <MaterialIcons name="send" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626ff",
    padding: 10,
  },
  author: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
  content: {
    color: "white",
    marginTop: 10,
  },
  footer: {
    marginTop: 10,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    color: "red",
    marginLeft: 5,
  },
  comments: {
    marginTop: 10,
  },
  comment: {
    color: "white",
  },
  commentBox: {
    backgroundColor: "#262626ff",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    position: "absolute",
    bottom: 0,
    left: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    color: "black",
    backgroundColor: "white",
  },
  sendButton: {
    marginLeft: 10,
  },
});
