const Post = require("../models/posts");
const User = require("../models/user");

const resolvers = {
  Query: {
    findAllPost: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication(); // untuk memanggil authentication di context

      const result = await Post.findAll();
      return result;
    },

    findPostById: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication();
      const { _id } = args;

      const result = await Post.findById(_id);
      return result;
    },
  },

  Mutation: {
    createPost: async (_, args, contextValue) => {
      // menggunakan context dan authentication kita bisa mengirim authorId yang membuat post
      const decodedToken = await contextValue.authentication(); // untuk memanggil authentication di context

      const newPost = args.newPost;
      const result = await Post.insert({
        ...newPost,
        authorId: decodedToken._id,
      });

      return result;
    },

    likePost: async (_, args) => {
      await contextValue.authentication();
      const newLike = args.newLike;

      const result = await Post.likePost(newLike);

      return result;
    },

    addComment: async (_, args, contextValue) => {
      // console.log(args)

      const decodedToken = await contextValue.authentication();

      const commenterUsername = decodedToken.username

      const newComment = args.newComment;
      newComment.username = commenterUsername
      const result = await Post.addComment(newComment);

      return result;
    },
  },
};

module.exports = resolvers;
