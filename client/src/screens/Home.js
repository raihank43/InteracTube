import {
  Button,
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import PostItem from "../components/PostItem";
import { useQuery, gql } from "@apollo/client";
import { GET_POSTS } from "../queries/GetPostQuery";

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_POSTS);
  console.log(error)

  // loading dan error harus di handle
  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{
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
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Something went wrong: </Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Home Screen</Text>

      {/* Posts */}
      <FlatList
        data={data.findAllPost}
        renderItem={({ item }) => <PostItem Post={item} />}
        keyExtractor={(item) => item._id}
      />

      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate("Details", {
            id: 100,
            type: "t-shirt",
          });
        }}
      />

      <Button
        title="Go to Details Push"
        onPress={() => {
          navigation.push("Details");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  PostContainer: {
    width: "100%",
  },
});
