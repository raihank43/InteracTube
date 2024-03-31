import { createContext } from "react";

export const SearchUserContext = createContext({
  searchText: "",
  setSearchText: () => {
    console.log("ini cuma callback");
  },
});
