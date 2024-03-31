import { useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { GET_CURRENT_LOG_USER } from "../queries/GetUserProfile";
import { GET_USER_BY_ID } from "../queries/GetUserById";
import { FOLLOW_USER } from "../mutations/FollowMutation";
import { GET_ALL_USERS } from "../queries/GetAllUsers";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

export default function ProfileCard({ Users }) {
  const navigation = useNavigation();
  const {
    data: data,
    loading: loading,
    error: error,
  } = useQuery(GET_CURRENT_LOG_USER);

  const [followUser] = useMutation(FOLLOW_USER, {
    refetchQueries: [GET_ALL_USERS],
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

  const listTargetFollowers = Users.Followers;
  const currentLogUserId = data.findCurrentLogUser._id;

  const findCurrentLogUserOnTargetFollowerList = listTargetFollowers.find(
    (obj) => obj.followerId.toString() === currentLogUserId
  );

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate("PeoplesProfile", { authorId: Users._id });
      }}
    >
      <Image
        style={styles.image}
        src="https://th.bing.com/th/id/OIP.WBjdfpIWhgt8n8WkzhOpJwHaKX?rs=1&pid=ImgDetMain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{Users.name}</Text>
        <Text style={styles.username}>@{Users.username}</Text>
        <Text style={styles.followInfo}>
          Followers: {Users.Followers.length} | Following:{" "}
          {Users.Followings.length}
        </Text>
      </View>
      {findCurrentLogUserOnTargetFollowerList ? (
        <TouchableOpacity style={styles.buttonUnfollow}>
          <Text
            style={styles.buttonTextUnfollow}
            onPress={() => {
              followUser({
                variables: {
                  followingId: Users._id,
                },
              });
            }}
          >
            Unfollow
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.buttonFollow}
          onPress={() => {
            followUser({
              variables: {
                followingId: Users._id,
              },
            });
          }}
        >
          <Text style={styles.buttonTextFollow}>Follow</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  username: {
    color: "gray",
  },
  followInfo: {
    fontSize: 12,
  },
  buttonFollow: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  buttonUnfollow: {
    padding: 10,
    backgroundColor: "black",
    borderRadius: 5,
  },
  buttonTextFollow: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonTextUnfollow: {
    color: "white",
    fontWeight: "bold",
  },
});
