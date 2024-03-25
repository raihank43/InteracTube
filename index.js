const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

let users = [
  {
    id: 1,
    name: "raihan",
    username: "raihank43",
    email: "raihan@mail.com",
    password: "password",
  },
  {
    id: 2,
    name: "raihan2",
    username: "raihank432",
    email: "raihan2@mail.com",
    password: "password",
  },
];

const typeDefs = `#graphql
  type User {
      id: ID
      name: String
      username: String
      email: String
      password: String
  }
  type Query {
    findAllUsers: [User]
  }

`;

const resolvers = {
  Query: {
    findAllUsers: () => {
      // implementasi bagaimana cara mendapatkan datanya
      return users;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // supaya sandbox apollo bisa di akses di environment production
  instropection: true,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = startStandaloneServer(server, {
  listen: { port: 3000 },
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
