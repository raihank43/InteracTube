const { GraphQLError } = require("graphql");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// let users = [
//   {
//     id: 1,
//     name: "raihan",
//     username: "raihank43",
//     email: "raihan@mail.com",
//     password: "password",
//   },
//   {
//     id: 2,
//     name: "raihan2",
//     username: "raihank432",
//     email: "raihan2@mail.com",
//     password: "password",
//   },
// ];

const resolvers = {
  Query: {
    findAllUsers: async () => {
      // implementasi bagaimana cara mendapatkan datanya
      const users = await User.findAll();
      return users;
    },

    findUserById: async (_, args) => {
      //   console.log(args); // id nya didapat dari args
      const user = await User.findById(args._id);

      return user;
      //   return users.find((user) => user.id == args.id);
    },

    findUserByUsername: async (_, args) => {
      const findUser = await User.findByUsername(args.username);
      return findUser;
    },
  },

  Mutation: {
    register: async (_, args) => {
      const newUser = args.newUser;
      const result = await User.createUser(newUser);
      return result;
    },

    login: async (_, args) => {
      const { email, password } = args;
      const user = await User.findByEmail(email);
      if (!user) {
        throw new GraphQLError("Invalid email/password", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      const isPasswordValid = bcryptjs.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new GraphQLError("Invalid email/password", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      const access_token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          username: user.username
        },
        JWT_SECRET_KEY
      );

      return {
        access_token,
        email,
      };
    },
  },
};

module.exports = resolvers;
