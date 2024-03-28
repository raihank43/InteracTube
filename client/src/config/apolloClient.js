import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://7e79-180-252-241-193.ngrok-free.app/", // dimasukkan uri server
  cache: new InMemoryCache(),
});

export default client