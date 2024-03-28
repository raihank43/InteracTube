import {
  Button,
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import PostItem from "../components/PostItem";

export default function HomeScreen({ navigation }) {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      content: "What a good looking day today!",
      imgUrl:
        "https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-1024.png",
      likes: "3",
      comments: "0",
      author: "Jimmy",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      content: "I have just eaten a very good cake, feels good.",
      imgUrl:
        "https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-1024.png",
      likes: "3",
      comments: "0",
      author: "Bob",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      content: "My mom just bought me a new pc! hooraay!",
      imgUrl:
        "https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-1024.png",
      likes: "3",
      comments: "0",
      author: "Charlie",
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Home Screen</Text>

      {/* Posts */}
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <PostItem
            content={item.content}
            imgUrl={item.imgUrl}
            likes={item.likes}
            comments={item.comments}
            author={item.author}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate("Details", {
            id: 100,
            type: "t-shirt",
          });
        }}
      />

      <Button
        title="Go to Details Push"
        onPress={() => {
          navigation.push("Details");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  PostContainer: {
    backgroundColor: "gray",
    width: "100%",
  },
});
