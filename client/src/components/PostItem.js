import { useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LIKE_POST } from "../mutations/LikePostMutation";
import { GET_POSTS } from "../queries/GetPostQuery";
import { GET_CURRENT_LOG_USER } from "../queries/GetUserProfile";

export default function PostItem({ Post }) {
  const navigation = useNavigation();
  const [addLike] = useMutation(LIKE_POST, {
    refetchQueries: {
      GET_POSTS,
    },
  });

  const { data, loading, error } = useQuery(GET_CURRENT_LOG_USER);

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

  // console.log(Post.likes[0]?.username, "<<<<<");

  const listPostLikes = Post.likes;
  const currentLogUsername = data.findCurrentLogUser.username;

  const findLikes = listPostLikes.find(
    (obj) => obj.username.toString() === currentLogUsername
  );
  return (
    <TouchableOpacity
      style={styles.PostItem}
      onPress={() => {
        navigation.push("PostDetail", {
          _id: Post._id,
        });
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PeoplesProfile", { authorId: Post.authorId });
        }}
      >
        <View style={styles.PostHeader}>
          <Text style={styles.PostHeader.AuthorName}> {Post.author.name}</Text>
        </View>
      </TouchableOpacity>

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
          <TouchableOpacity
            onPress={() => {
              addLike({
                variables: {
                  newLike: {
                    postId: Post._id,
                  },
                },
              });
            }}
          >
            {findLikes ? (
              <View style={styles.PostFooter.footerItem}>
                <FontAwesome name="thumbs-up" size={24} color="red" />
                <Text>{Post.likes.length} Likes</Text>
              </View>
            ) : (
              <View style={styles.PostFooter.footerItem}>
                <FontAwesome name="thumbs-up" size={24} color="black" />
                <Text>{Post.likes.length} Likes</Text>
              </View>
            )}
          </TouchableOpacity>
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
