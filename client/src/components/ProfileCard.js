import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function ProfileCard({ Users }) {
  return (
    <TouchableOpacity style={styles.card}>
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Follow</Text>
      </TouchableOpacity>
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
  button: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
