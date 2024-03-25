const Follow = require("../models/follow");

const resolvers = {
  Mutation: {
    followUser: async (_, args) => {
      const result = await Follow.add(args.newFollow);
      return result;
    },
  },
};

module.exports = resolvers;
