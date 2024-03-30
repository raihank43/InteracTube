import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function PostItem({ Post }) {
  const navigation = useNavigation();

  // console.log(Post.author ? Post.author : "UNDEFINE NIH", "<<<<<<<<<<<<<<");
  // console.log(Post._id ? Post._id : "UNDEFINED NIHHHHH");
  return (
    <TouchableOpacity
      style={styles.PostItem}
      onPress={() => {
        navigation.push("PostDetail", {
          _id: Post._id,
        });
      }}
    >
      <View style={styles.PostHeader}>
        <Text style={styles.PostHeader.AuthorName}>
          {" "}
          {Post.author.name}
        </Text>
      </View>

      <View style={styles.PostBody}>
        {Post.imgUrl ? (
          <Image style={styles.PostBody.Image} src={Post.imgUrl}></Image>
        ) : (
          ""
        )}

        <Text style={styles.PostContent}>{Post.content}</Text>
      </View>

      <View style={styles.PostFooter}>
        <TouchableOpacity>
          <View style={styles.PostFooter.footerItem}>
            <FontAwesome name="thumbs-up" size={24} color="black" />
            <Text>{Post.likes.length} Likes</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.PostFooter.footerItem}>
          <FontAwesome name="comment" size={24} color="black" />
          <Text>{Post.comments.length} Comments</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },

  PostItem: {
    borderRadius: 10,
    width: "100%",
    padding: 20,
    marginVertical: 8,
    width: "100%",
    // marginHorizontal: 16,
    backgroundColor: "white",
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

  PostContent: {
    fontSize: 16,
  },

  PostFooter: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    footerItem: {
      borderStyle: "solid",
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
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
