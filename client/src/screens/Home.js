import {
  Button,
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import PostItem from "../components/PostItem";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_POSTS } from "../queries/GetPostQuery"; 
import { LIKE_POST } from "../mutations/LikePostMutation";

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_POSTS);
  
  // loading dan error harus di handle
  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            ...styles.HomeContainer,
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
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            ...styles.HomeContainer,
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
    <View style={styles.HomeContainer}>
      {/* Posts */}

      <FlatList
        data={data.findAllPost}
        renderItem={({ item }) => <PostItem Post={item} />}
        keyExtractor={(item) => item._id}
      />

      {/* <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate("Details", {
            id: 100,
            type: "t-shirt",
          });
        }}
      /> */}

      {/* <Button
        title="Go to Details Push"
        onPress={() => {
          navigation.push("Details");
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#262626ff",
  },
  PostContainer: {
    width: "100%",
  },
});
