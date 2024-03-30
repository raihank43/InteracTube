import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { GET_POST_BY_ID } from "../queries/GetPostDetail";
import { useQuery } from "@apollo/client";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PostComment from "../components/PostComments";

export default function PostDetail({ navigation, route }) {
  const { _id } = route.params;
  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: {
      _id: _id,
    },
  });

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

  // console.log(data.findPostById);

  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>INI ID NYA: {_id}</Text>
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
          <Text style={styles.likeCount}>{data.findPostById.likes.length}</Text>
        </TouchableOpacity>
        <View style={styles.comments}>
          <FlatList
            data={data.findPostById.comments}
            renderItem={({ item }) => <PostComment PostComment={item} />}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>
    </View>
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
});
