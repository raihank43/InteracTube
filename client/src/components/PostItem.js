import { View, StyleSheet, Text, Image } from "react-native";

export default function PostItem({ content, imgUrl, likes, comments, author }) {
  return (
    <View style={styles.PostItem}>
      <View style={styles.PostHeader}>
        <Text>{author}</Text>
      </View>

      <View style={styles.PostBody}>
        <Image style={styles.PostBody.Image} src={imgUrl}></Image>
        <Text style={styles.title}>{content}</Text>
      </View>

      <View style={styles.PostFooter}>
        <Text>Likes: {likes}</Text>
        <Text>Comments: {comments}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },

  PostItem: {
    width: "100%",
    padding: 20,
    marginVertical: 8,
    // marginHorizontal: 16,
  },

  PostBody: {
    width: "100%",
    // borderWidth: 1,
    // borderColor: "black",
    Image: {
      width: "100%",
      height: 200,
      alignItems: "center",

    }
  },

  PostFooter: {
    flexDirection: "row",
    gap: 20,
  },

  title: {
    fontSize: 32,
  },

  image: {
    width: 200,
    height: 200,
    alignItems: "center",
  },
});
