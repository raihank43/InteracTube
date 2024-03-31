import { useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function FollowerProfileCard({ Users }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate("PeoplesProfile", { authorId: Users.follower._id });
      }}
    >
      <Image
        style={styles.image}
        src="https://th.bing.com/th/id/OIP.WBjdfpIWhgt8n8WkzhOpJwHaKX?rs=1&pid=ImgDetMain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{Users.follower.name}</Text>
        <Text style={styles.username}>@{Users.follower.username}</Text>
        <Text style={styles.followInfo}>
        </Text>
      </View>
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
