import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
export default function LogoutScreen({ navigation }) {
  const { setIsSignedIn } = useContext(AuthContext);
  useEffect(() => {
    // navigation.navigate("Login");
    async function clearToken() {
      await SecureStore.deleteItemAsync("accessToken");
    }

    clearToken();
    setIsSignedIn(false);
  }, []);

  return null;
}
