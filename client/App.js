import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  FlatList,
  Button,
  Image,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import { AuthContext } from "./src/context/AuthContext";
import MainStack from "./src/navigators/MainStack";
import { ApolloProvider } from "@apollo/client";
import client from "./src/config/apolloClient";
import { SearchUserContext } from "./src/context/SearchUserContext";

export default function App() {
  //? ini ngirim state sign in saat ini ke context
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [searchText, setSearchText] = useState("");

  //**FLOW SIMPAN,GET,DAN REMOVE PADA LOGIN DAN LOGOUT */
  //? FLOW SIMPAN TOKEN
  // 1. app dibuka
  // 2. bikin logic untuk baca token dari SecureStore
  // 3. kalo token ada, ubah isSignedIn nya jadi true
  //? FLOW RESTORE/GET TOKEN
  // 4. ketika login simpan tokennya ke secureStore
  //? FLOW LOGOUT
  // 5. kalo usernya logout remove tokennya dari store

  useEffect(() => {
    async function getToken() {
      // cek token ada atau tidak di SecureStore
      const dariSecureStore = await SecureStore.getItemAsync("accessToken");

      if (dariSecureStore) {
        setIsSignedIn(true);
      }
      // console.log({ dariSecureStore });
    }
    getToken();
  }, []);

  return (
    // Authentication
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <SearchUserContext.Provider value={{ searchText, setSearchText }}>
        {/* /* Apollo provider in client */}
        <ApolloProvider client={client}>
          {/* Stacks */}
          <MainStack />
        </ApolloProvider>
      </SearchUserContext.Provider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
