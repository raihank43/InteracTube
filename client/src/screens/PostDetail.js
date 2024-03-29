import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function PostDetail() {
  return (
    <View style={styles.container}>
      <Text style={styles.author}>Author Name</Text>
      <Image style={styles.image} src="image.png" />
      <Text style={styles.content}>Post Content</Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeButton}>
          <FontAwesome name="thumbs-up" size={24} color="red" />
          <Text style={styles.likeCount}>200</Text>
        </TouchableOpacity>
        <View style={styles.comments}>
          <Text style={styles.comment}>Author Comment: Comment text</Text>
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
