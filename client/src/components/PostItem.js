import { useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LIKE_POST } from "../mutations/LikePostMutation";
import { GET_POSTS } from "../queries/GetPostQuery";
import { GET_CURRENT_LOG_USER } from "../queries/GetUserProfile";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import timeSincePosted from "../utils/getTimeSincePosted";

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
          <Image
            style={styles.ProfileImage}
            src={`https://api.dicebear.com/8.x/adventurer-neutral/png?seed=${Post.author.name}`}
          />
          <View className="ml-2  justify-between ">
            <Text className="font-poppins-bold text-xl">{Post.author.name}</Text>
            <Text className="font-poppins-regular" style={styles.PostHeader.Time}>
              {timeSincePosted(Post.createdAt)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.PostBody}>
        <View className="w-full max-h-96 mb-3 ">
          {Post.imgUrl ? (
            <Image
              className="w-full h-full items-center rounded-lg"
              src={Post.imgUrl}
              resizeMode="cover"
            ></Image>
          ) : (
            ""
          )}
        </View>

        <Text className="text-base">{Post.content}</Text>

        <View style={styles.PostTags}>
          {Post.tags.map((el, index) => {
            return (
              <View style={styles.PostTags.PerTags} key={index}>
                <FontAwesome name="tags" size={20} color="red" />
                <Text style={styles.PostTags.PostTagsText}>{el}</Text>
              </View>
            );
          })}
        </View>
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
  ProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  PostItem: {
    borderRadius: 10,
    minWidth: "100%",
    padding: 20,
    marginVertical: 8,

    // marginHorizontal: 16,
    backgroundColor: "white",
  },

  PostHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    AuthorName: {
      margin: 0,
      // fontWeight: "bold",
      fontSize: 24,
      fontFamily: "Poppins-Bold",
    },
    Time: {
      color: "gray",
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

  PostTags: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginTop: 20,
    marginLeft: 10,
    PerTags: {
      flexDirection: "row",
      gap: 10,
    },
  },

  PostContent: {
    fontSize: 16,
  },

  PostFooter: {
    marginTop: 20,
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
