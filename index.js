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

let posts = [
  {
    id: 1,
    content: "lorem ipsum",
    tags: "food",
    imgUrl: "content.png",
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

  input RegisterUser {
    name: String!
    username: String! 
    email: String! 
    password: String!
  }

  # Query ->  untuk bikin R
  type Query {
    findAllUsers: [User]
    findUserById(id: ID!): User

  }

  # Mutation -> pendaftaran route / endpoint yang selain GET / CUD
  type Mutation {
    addUser(newUser: RegisterUser!): User
  }

`;

const resolvers = {
  Query: {
    findAllUsers: () => {
      // implementasi bagaimana cara mendapatkan datanya
      return users;
    },

    findUserById: (_, args) => {
      return users.find((user) => user.id == args.id);
    },
  },

  Mutation: {
    addUser: (_, args) => {
      console.log(args);
      const { name, username, email, password } = args.newUser;
      const newUser = {
        id: users.length + 1,
        name,
        username,
        email,
        password,
      };

      users.push(newUser);
      return newUser;
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
