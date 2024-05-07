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
import { StatusBar } from "expo-status-bar";
import timeSincePosted from "../utils/getTimeSincePosted";
import { LIKE_POST } from "../mutations/LikePostMutation";
import { GET_CURRENT_LOG_USER } from "../queries/GetUserProfile";
import tw from "tailwind-react-native-classnames";

export default function PostDetail({ navigation, route }) {
  const { _id } = route.params;
  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: {
      _id: _id,
    },
  });
  const {
    loading: loading1,
    error: error1,
    data: { findCurrentLogUser },
  } = useQuery(GET_CURRENT_LOG_USER);
  const [addComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [GET_POST_BY_ID],
  });
  const [addLike] = useMutation(LIKE_POST, {
    refetchQueries: [GET_POST_BY_ID],
  });

  const [comment, setComment] = useState("");

  // console.log(comment)

  if (loading || loading1) {
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

  if (error || error1) {
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

  const listPostLikes = data.findPostById.likes;
  const currentLogUsername = findCurrentLogUser.username;

  const findLikes = listPostLikes.find(
    (obj) => obj.username.toString() === currentLogUsername
  );
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="black" />

        <View className="mb-16">
          <FlatList
            // nestedScrollEnabled
            data={data.findPostById.comments}
            renderItem={({ item }) => <PostComment PostComment={item} />}
            ListEmptyComponent={
              <View className="items-center justify-center  h-36">
                <Text className="text-white font-poppins-bold">
                  There is no comment yet.
                </Text>
              </View>
            }
            keyExtractor={(item) => item._id}
            ListHeaderComponent={
              <>
                <View className="bg-white rounded-b-lg">
                  <View className="p-4 flex-row items-center mb-2">
                    <Image
                      style={styles.ProfileImage}
                      source={{
                        uri: `https://api.dicebear.com/8.x/adventurer-neutral/png?seed=${data.findPostById.author.name}`,
                      }}
                    />
                    <View className="ml-3">
                      <Text className="text-black font-poppins-bold text-2xl">
                        {data.findPostById.author.name}
                      </Text>
                      <Text className="text-gray-500">
                        {" "}
                        {timeSincePosted(data.findPostById.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <View className="pl-4 pb-2">
                    <Text className="text-lg">{data.findPostById.content}</Text>
                  </View>
                  {data.findPostById.imgUrl ? (
                    <View className="w-full max-h-96">
                      <Image
                        className=" w-full h-full items-center"
                        // style={styles.image}
                        source={{ uri: data.findPostById.imgUrl }}
                      />
                    </View>
                  ) : null}

                  <View style={tw`bg-white p-6 rounded-b-lg flex-row justify-around`}>
                    <TouchableOpacity
                      onPress={() => {
                        addLike({
                          variables: {
                            newLike: {
                              postId: _id,
                            },
                          },
                        });
                      }}
                    >
                      {findLikes ? (
                        <View className="flex-row gap-3">
                          <FontAwesome name="thumbs-up" size={24} color="red" />
                          <Text
                            className="font-poppins-bold"
                            style={{ color: "red" }}
                          >
                            {listPostLikes.length} Likes
                          </Text>
                        </View>
                      ) : (
                        <View className="flex-row gap-3">
                          <FontAwesome
                            name="thumbs-up"
                            size={24}
                            color="black"
                          />
                          <Text className="font-poppins-bold">
                            {listPostLikes.length} Likes
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>

                    <View className="flex-row gap-2 justify-center items-center">
                      <FontAwesome name="comment" size={24} color="black" />
                      <Text className="font-poppins-bold">
                        {data.findPostById.comments.length} Comments
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            }
          />
        </View>

        <View className="flex-row items-center bg-transparent p-2 absolute left-0 right-0 bottom-0">
          <TextInput
          className="flex-1 bg-white rounded-2xl p-2 mr-2"
            // style={styles.input}
            value={comment}
            onChangeText={setComment}
            placeholder="Add a comment..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity
          className="bg-red-600 p-2 rounded-full"
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
            <MaterialIcons name="send" size={24} color="white" />
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
