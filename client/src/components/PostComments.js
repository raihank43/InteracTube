import { View, StyleSheet, Text, Image } from "react-native";

export default function PostComment({ PostComment }) {
  return (
    <View style={styles.CommentCard}>
      <View style={styles.CommentHeader}>
        <Image
          style={styles.ProfileImage}
          source={{
            uri: "https://th.bing.com/th/id/OIP.WBjdfpIWhgt8n8WkzhOpJwHaKX?rs=1&pid=ImgDetMain",
          }}
        />
        <Text style={styles.Username}>{PostComment.username}</Text>
      </View>

      <View style={styles.CommentBody}>
        <Text style={styles.Content}>{PostComment.content}</Text>
      </View>

      <View style={styles.CommentFooter}></View>
    </View>
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
    marginBottom: 10,
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
