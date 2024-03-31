const { GraphQLError } = require("graphql");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const resolvers = {
  Query: {
    findAllUsers: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication();
      const { searchTerm } = args;

      // implementasi bagaimana cara mendapatkan datanya
      const users = await User.findAll(searchTerm);
      // console.log(users)
      return users;
    },

    findUserById: async (_, args, contextValue) => {
      //   console.log(args); // id nya didapat dari args
      const decodedToken = await contextValue.authentication();

      const user = await User.findById(args._id);

      return user;
      //   return users.find((user) => user.id == args.id);
    },

    findUserByUsername: async (_, args) => {
      const findUser = await User.findByUsername(args.username);
      return findUser;
    },

    findCurrentLogUser: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication();

      const user = await User.getUserProfile(decodedToken._id);
      return user;
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
          username: user.username,
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
