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
  ScrollView,
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
        <ScrollView>
          <View style={styles.PostProfile}>
            <Image
              style={styles.ProfileImage}
              source={{
                uri: "https://th.bing.com/th/id/OIP.WBjdfpIWhgt8n8WkzhOpJwHaKX?rs=1&pid=ImgDetMain",
              }}
            />
            <Text style={styles.author}>{data.findPostById.author.name}</Text>
          </View>
          {data.findPostById.imgUrl ? (
            <Image
              style={styles.image}
              source={{ uri: data.findPostById.imgUrl }}
            />
          ) : null}

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
                nestedScrollEnabled
                data={data.findPostById.comments}
                renderItem={({ item }) => <PostComment PostComment={item} />}
                keyExtractor={(item) => item._id}
                key={item => item._id}
              />
            </View>
          </View>
        </ScrollView>
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
  PostProfile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  author: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  content: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
  footer: {
    marginTop: 10,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  likeCount: {
    color: "red",
    marginLeft: 5,
  },
  comments: {
    marginTop: 10,
  },
  commentBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {},
  ProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
