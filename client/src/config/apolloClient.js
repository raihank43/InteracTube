import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
  uri: "https://3ca0-120-188-7-55.ngrok-free.app/", // dimasukkan uri server
});

const authLink = setContext(async (_, context) => {
  const { headers } = context;
  const token = await SecureStore.getItemAsync("accessToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: "https://7e79-180-252-241-193.ngrok-free.app/", // dimasukkan uri server
//   cache: new InMemoryCache(),
// });

export default client;
