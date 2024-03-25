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
    //   console.log(args);
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

module.exports = resolvers;
