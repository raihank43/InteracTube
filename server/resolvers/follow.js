const Follow = require("../models/follow");

const resolvers = {
  Query: {
    findFollowingDetail: async (_, args) => {
      const { _id } = args;

      const data = await Follow.findFollowing(_id);
      return data;
    },

    findFollowerDetail: async (_, args) => {
      const { _id } = args;

      const data = await Follow.findFollower(_id);
      return data;
    },
  },

  Mutation: {
    followUser: async (_, args, contextValue) => {
      const currentUser = await contextValue.authentication();
      const followerId = currentUser._id; /// current log user as Follower
      const { followingId } = args; /// target user as Following

      // check if the user is already following the target user or not
      const ListTargetFollower = await Follow.findFollower(followingId);

      // console.log(followerId, "<<<<<<<< id orang yang login");

      const findCurrentLogUserOnTargetFollowerList = ListTargetFollower.find(
        (obj) => obj.followerId.toString() === followerId
      );

      // console.log(findCurrentLogUserOnTargetFollowerList, "<<<<");

      // if current user is found within target follower list, we delete the data, which means we basically "unfollow" them, so to speak.

      if (findCurrentLogUserOnTargetFollowerList) {
        const deleteFollowData = await Follow.deleteFollowDataByFollowerId(
          followerId
        );
        // console.log(deleteFollowData);
      } else {
        // if not, create follow data, so we "follow" them
        const result = await Follow.add({
          followerId,
          followingId,
        });
        return result;
      }
    },
  },
};

module.exports = resolvers;
