const Follow = require("../models/follow");

const resolvers = {
  Mutation: {
    followUser: async (_, args, contextValue) => {
      const currentUser = await contextValue.authentication();
      const followerId = currentUser._id;
      const { followingId } = args;
      const result = await Follow.add({
        followerId,
        followingId,
      });
      return result;
    },
  },
};

module.exports = resolvers;
