import { View, StyleSheet, Text, Image } from "react-native";

export default function PostItem({ Post }) {
  return (
    <View style={styles.PostItem}>
      <View style={styles.PostHeader}>
        <Text style={styles.PostHeader.AuthorName}>{Post.author.name}</Text>
      </View>

      <View style={styles.PostBody}>
        {Post.imgUrl ? (
          <Image style={styles.PostBody.Image} src={Post.imgUrl}></Image>
        ) : (
          ""
        )}

        <Text style={styles.title}>{Post.content}</Text>
      </View>

      <View style={styles.PostFooter}>
        <Text>Likes: {Post.likes.length}</Text>
        <Text>Comments: {Post.comments.length}</Text>
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

  PostHeader: {
    AuthorName: {
      fontWeight: "bold",
      fontSize: 24,
    },
  },

  PostBody: {
    width: "100%",
    // borderWidth: 1,
    // borderColor: "black",
    Image: {
      width: "100%",
      height: 200,
      alignItems: "center",
    },
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
