const User = require("../models/user");

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

      return user
      //   return users.find((user) => user.id == args.id);
    },
  },

  Mutation: {
    register: async (_, args) => {
      const newUser = args.newUser;
      const result = await User.createUser(newUser);
      return result;
    },
  },
};

module.exports = resolvers;
