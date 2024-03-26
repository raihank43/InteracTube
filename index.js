require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userTypeDefs = require("./schemas/user");
const postTypeDefs = require("./schemas/post");
const followTypeDefs = require("./schemas/follow");

const userResolvers = require("./resolvers/user");
const postResolvers = require("./resolvers/posts");
const followResolvers = require("./resolvers/follow");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  // supaya sandbox apollo bisa di akses di environment production
  instropection: true,
});

const { url } = startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000 },
  context: async ({ req, res }) => {
    // kita bisa menyimpan function function untuk autentikasi yang kita perlukan
    // context ini dipanggil oleh semua query dan mutation, namun context ini bentuknya function, dan dia tidak akan terpanggil jika tidak di invoke
    return {
      authentication: () => {
        // cek dari req.headers, ada gak headers Authorization
        // -> melakukan decode token, dan memastikan tokennya valid
        
        // console.log(req.headers.authorization);
        if (!req.headers.authorization) {
          throw new GraphQLError("access token must be provided.", {
            extensions: {
              code: "UNAUTHORIZED",
            },
          });
        }

        // split
        const accessToken = req.headers.authorization.split(" ")[1];
        if (!accessToken) {
          throw new GraphQLError("access token must be provided.", {
            extensions: {
              code: "UNAUTHORIZED",
            },
          });
        }

        const decodedToken = jwt.verify(accessToken, JWT_SECRET_KEY);

        if (!decodedToken) {
          throw new GraphQLError("access token must be valid.", {
            extensions: {
              code: "UNAUTHORIZED",
            },
          });
        }

        return decodedToken;
      },
    };
  },
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
