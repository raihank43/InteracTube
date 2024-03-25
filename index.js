const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const userTypeDefs = require("./schemas/user");
const userResolvers = require("./resolvers/user");

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
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
