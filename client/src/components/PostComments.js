import { View, StyleSheet, Text, Image } from "react-native";
import { GET_USER_BY_USERNAME } from "../queries/GetUserByUsername";
import { useQuery } from "@apollo/client";
import timeSincePosted from "../utils/getTimeSincePosted";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function PostComment({ PostComment }) {
  const { data, loading, error } = useQuery(GET_USER_BY_USERNAME, {
    variables: { username: PostComment.username },
  });

  if (loading) {
    return (
      <View className=" p-3 rounded-lg flex-row ">
        <View className="bg-gray-300 w-10 h-10 rounded-full mr-5"></View>

        <View className="bg-white flex-grow p-3 rounded-lg">
          <View style={styles.CommentHeader}>
            <View className="ml-1 flex-row items-center gap-2 bg-gray-300 w-36 h-4"></View>
          </View>

          <View className="bg-gray-300 w-10 h-2 mt-2">
            <View></View>
          </View>
        </View>
      </View>
    );
  }
  if (error) {
    console.log(error, "PostComment Error");
    return <Text>Error</Text>;
  }
  return (
    <>
      <View className=" p-3 rounded-lg flex-row ">
        <Image
          style={styles.ProfileImage}
          source={{
            uri: `https://api.dicebear.com/8.x/adventurer-neutral/png?seed=${PostComment.username}`,
          }}
        />

        <View className="flex-grow gap-1">
          <View className="bg-white flex-grow p-3 rounded-lg">
            <View style={styles.CommentHeader}>
              <View className="ml-1 flex-row items-center gap-2">
                <Text className="font-poppins-bold text-lg">
                  {data.findUserByUsername.name}
                </Text>
                <Text className="font-poppins-regular text-gray-500">
                  @{PostComment.username}
                </Text>
              </View>
            </View>

            <View>
              <Text className="text-base">{PostComment.content}</Text>
            </View>
          </View>
          <View id="CommentFooter" className="pl-2 flex-row justify-between">
            <View className="flex-row gap-5">
              <Text className="text-gray-100">
                {timeSincePosted(PostComment.createdAt)}
              </Text>
              <Text className="text-gray-100 font-poppins-bold">Like</Text>
            </View>

            <View className="flex-row gap-2 items-center justify-center ">
              <FontAwesome name="thumbs-up" size={24} color="red" />
              <Text className="font-poppins-bold text-red-600">0</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  CommentCard: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: "100%",
  },
  CommentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  ProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  Username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  CommentBody: {},
  Content: {
    fontSize: 14,
  },
  CommentFooter: {},
});
