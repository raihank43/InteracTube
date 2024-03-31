import { useQuery } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { GET_USER_BY_ID } from "../queries/GetUserById";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function PeoplesProfile({ route }) {
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: route.params.authorId,
    },
  });

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
          <Button title="Follow" onPress={() => {}} />
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
