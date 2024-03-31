import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import { useApolloClient } from "@apollo/client";

export default function LogoutScreen({ navigation }) {
  const { setIsSignedIn } = useContext(AuthContext);
  const client = useApolloClient();

  useEffect(() => {
    // navigation.navigate("Login");
    async function clearToken() {
      await SecureStore.deleteItemAsync("accessToken");
      await client.clearStore();
    }

    clearToken();
    setIsSignedIn(false);
  }, []);

  return null;
}
