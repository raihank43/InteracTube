import { View, StyleSheet, Text } from "react-native";

export default function PostComment({ PostComment }) {
  return (
    <View style={styles.CommentCard}>
      <View style={styles.CommentHeader}>
        <Text>{PostComment.username}</Text>
      </View>

      <View style={styles.CommentBody}>
        <Text>{PostComment.content}</Text>
      </View>

      <View style={styles.CommentFooter}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CommentCard: {
    backgroundColor: "white",
    // borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    width: "100%",
  },
});
