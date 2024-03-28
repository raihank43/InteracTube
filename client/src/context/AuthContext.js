import { createContext } from "react";

export const AuthContext = createContext({
  isSignedIn: false,
  setIsSignedIn: () => {
    console.log("ini cuma callback")
  },
});
