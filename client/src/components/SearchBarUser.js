import { useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { SearchUserContext } from "../context/SearchUserContext";

export default function SearchBarUser() {
  const { searchText, setSearchText } = useContext(SearchUserContext);

  return (
    <View style={styles.SearchBarContainer}>
      <TextInput
        style={styles.SearchBarForm}
        placeholder="Search on Hacktube"
        placeholderTextColor={"white"}
        value={searchText}
        onChangeText={setSearchText}
      ></TextInput>
      <TouchableOpacity>
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  SearchBarContainer: {
    width: 275,
    // backgroundColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    // flex: 1,
    gap: 20,
  },
  SearchBarForm: {
    flex: 1,
    backgroundColor: "gray",
    borderRadius: 20,
    padding: 5,
    color: "white",
  },
});
