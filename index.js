const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const userTypeDefs = require("./schemas/user");
const postTypeDefs = require("./schemas/post");

const userResolvers = require("./resolvers/user");
const postResolvers = require("./resolvers/posts");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs],
  resolvers: [userResolvers, postResolvers],
  // supaya sandbox apollo bisa di akses di environment production
  instropection: true,
});

const { url } = startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000 },
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
