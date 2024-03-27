const Follow = require("../models/follow");

const resolvers = {
  Query: {
    findFollowingDetail: async (_, args) => {
      const { _id } = args;

      const data = await Follow.findFollowing(_id);
      return data
    },

    findFollowerDetail: async (_, args) => {
      const {_id} = args

      const data = await Follow.findFollower(_id)
      return data
    }
  },

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