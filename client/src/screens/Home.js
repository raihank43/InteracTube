import {
  Button,
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
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
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_POSTS);

  // loading dan error harus di handle

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      console.log("refetched");
      setRefreshing(false);
    });
  }, [data, loading]);

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
    console.log(error);
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
      <StatusBar style="dark" />

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data.findAllPost}
        renderItem={({ item }) => <PostItem Post={item} />}
        keyExtractor={(item) => item._id}
      />
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
