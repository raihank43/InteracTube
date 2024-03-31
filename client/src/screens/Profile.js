import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Touchable,
  FlatList,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { GET_CURRENT_LOG_USER } from "../queries/GetUserProfile";
import { useQuery } from "@apollo/client";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";
import { GET_FOLLOWING_DETAIL } from "../queries/GetFollowingDetail";
import { GET_FOLLOWER_DETAIL } from "../queries/GetFollowerDetail";
import FollowerProfileCard from "../components/FollowerProfileCard";
import FollowingProfileCard from "../components/FollowingProfileCard";

export default function Profile() {
  const { data, loading, error } = useQuery(GET_CURRENT_LOG_USER);
  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useQuery(GET_FOLLOWER_DETAIL, {
    variables: {
      id: data.findCurrentLogUser._id,
    },
  });

  const {
    data: data3,
    loading: loading3,
    error: error3,
  } = useQuery(GET_FOLLOWING_DETAIL, {
    variables: {
      id: data.findCurrentLogUser._id,
    },
  });

  const [tab, setTab] = useState("Posts");

  if (loading || loading2 || loading3) {
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

  if (error || error2 || error3) {
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
          <Text style={styles.profileDetails.following}>
            Following: {data.findCurrentLogUser.Followings.length}
          </Text>
          <Text style={styles.profileDetails.follower}>
            Follower: {data.findCurrentLogUser.Followers.length}
          </Text>
          {/* <Button title="Follow" onPress={() => {}} /> */}
        </View>
      </View>

      <View style={styles.TabsContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={tab === "Posts" ? styles.activeTab : styles.inactiveTab}
            onPress={() => setTab("Posts")}
          >
            <Text style={styles.TabText}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Followers"
            onPress={() => setTab("Followers")}
            style={tab === "Followers" ? styles.activeTab : styles.inactiveTab}
          >
            <Text style={styles.TabText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Followings"
            onPress={() => setTab("Followings")}
            style={tab === "Followings" ? styles.activeTab : styles.inactiveTab}
          >
            <Text style={styles.TabText}>Followings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {tab === "Posts" && (
        <View style={styles.TabContentBody}>
          <View style={styles.postTemplate}>
            <Text style={styles.postTitle}>Judul Post</Text>
            <Text style={styles.postContent}>Isi post...</Text>
          </View>
          <Text>This is the Posts tab</Text>
        </View>
      )}
      {tab === "Followers" && (
        <View style={styles.TabContentBody}>
          <FlatList
            data={data2.findFollowerDetail}
            renderItem={({ item }) => <FollowerProfileCard Users={item} />}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
      {tab === "Followings" && (
        <View style={styles.TabContentBody}>
          <FlatList
            data={data3.findFollowingDetail}
            renderItem={({ item }) => <FollowingProfileCard Users={item} />}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
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

  TabsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  tabs: {
    flexDirection: "row",
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
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
  TabContentBody: {
    backgroundColor: "#E2E8CE",
  },
  activeTab: {
    backgroundColor: "#E2E8CE", // ganti dengan warna yang Anda inginkan
    padding: 20,
    marginTop: 10,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
  inactiveTab: {
    marginTop: 10,
    backgroundColor: "white", // ganti dengan warna yang Anda inginkan
    padding: 20,
  },
  TabText: {
    fontWeight: "bold",
  },
});
