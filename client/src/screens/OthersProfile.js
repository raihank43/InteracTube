import { useMutation, useQuery } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { GET_USER_BY_ID } from "../queries/GetUserById";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FOLLOW_USER } from "../mutations/FollowMutation";
import { GET_CURRENT_LOG_USER } from "../queries/GetUserProfile";

export default function PeoplesProfile({ route }) {
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: route.params.authorId,
    },
  });

  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useQuery(GET_CURRENT_LOG_USER);

  const [followUser] = useMutation(FOLLOW_USER, {
    refetchQueries: [GET_USER_BY_ID],
  });

  if (loading || loading2) {
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

  if (error || error2) {
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

  // console.log(data2.findCurrentLogUser._id, "<<<<< data user yang login");
  // console.log(data.findUserById.Followers, "<<<< data followers target");

  const listTargetFollowers = data.findUserById.Followers;
  const currentLogUserId = data2.findCurrentLogUser._id;

  const findCurrentLogUserOnTargetFollowerList = listTargetFollowers.find(
    (obj) => obj.followerId.toString() === currentLogUserId
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          style={styles.profileImage}
          src="https://th.bing.com/th/id/OIP.WBjdfpIWhgt8n8WkzhOpJwHaKX?rs=1&pid=ImgDetMain"
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileDetails.name}>
            {data.findUserById.name}
          </Text>
          <Text style={styles.profileDetails.username}>
            @{data.findUserById.username}
          </Text>
          <Text style={styles.profileDetails.following}>
            Following: {data.findUserById.Followings.length}
          </Text>
          <Text style={styles.profileDetails.follower}>
            Follower: {data.findUserById.Followers.length}
          </Text>
          {findCurrentLogUserOnTargetFollowerList ? (
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                followUser({
                  variables: {
                    followingId: route.params.authorId,
                  },
                });
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Unfollow</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                followUser({
                  variables: {
                    followingId: route.params.authorId,
                  },
                });
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Follow</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.postTemplate}>
        <Text style={styles.postTitle}>Judul Post</Text>
        <Text style={styles.postContent}>Isi post...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626ff",
  },
  profileHeader: {
    backgroundColor: "white",
    flexDirection: "row",
    marginBottom: 20,
    padding: 15,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileDetails: {
    justifyContent: "center",
    gap: 5,
    name: {
      fontSize: 24,
      fontWeight: "bold",
    },
    username: {
      fontWeight: "bold",
    },
    following: {},
    follower: {},
    width: "60%",
  },

  postTemplate: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postContent: {
    marginTop: 10,
  },
});
