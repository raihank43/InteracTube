import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { GET_CURRENT_LOG_USER } from "../queries/GetCurrentLogUser";
import { useQuery } from "@apollo/client";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";

export default function Profile() {
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

  const user = {
    profileImage:
      "https://th.bing.com/th/id/OIP.WBjdfpIWhgt8n8WkzhOpJwHaKX?rs=1&pid=ImgDetMain",
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          style={styles.profileImage}
          source={{ uri: user.profileImage }}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileDetails.name}>
            {data.findCurrentLogUser.name}
          </Text>
          <Text style={styles.profileDetails.username}>
            @{data.findCurrentLogUser.username}
          </Text>
          <Text style={styles.profileDetails.following}>Following: 100</Text>
          <Text style={styles.profileDetails.follower}>Following: 100</Text>
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
    width: "60%"
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
