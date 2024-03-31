import { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SearchUserContext } from "../context/SearchUserContext";
import ProfileCard from "../components/ProfileCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../queries/GetAllUsers";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const { searchText, setSearchText } = useContext(SearchUserContext);

  const { data, loading, error } = useQuery(GET_ALL_USERS, {
    variables: {
      searchTerm: searchText,
    },
  });

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
          <Text style={{ fontWeight: "bold", color: "black" }}>
            Something went wrong:{" "}
          </Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  if (data.findAllUsers.length == 0) {
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
          <Text style={{ fontWeight: "bold", color: "black" }}>
            No users match your search.
          </Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          data={data.findAllUsers}
          renderItem={({ item }) => <ProfileCard Users={item} />}
          keyExtractor={(item) => item._id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  HomeContainer: {},
});
