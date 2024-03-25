const Post = require("../models/posts");

const resolvers = {
  Query: {
    findAllPost: async () => {
      const result = await Post.findAll();
      return result;
    },
  },

  Mutation: {
    createPost: async (_, args) => {
      const newPost = args.newPost;
      const result = await Post.insert(newPost);

      return result;
    },
  },
};

module.exports = resolvers;
