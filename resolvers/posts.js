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

    likePost: async (_, args) => {
      console.log(args);

      const newLike = args.newLike;

      const result = await Post.likePost(newLike);
    },

    addComment: async (_, args) => {
      // console.log(args)
      const newComment = args.newComment;
      const result = await Post.addComment(newComment);

      return result;
    },
  },
};

module.exports = resolvers;
