const Post = require("../models/posts");

const resolvers = {
  Query: {
    findAllPost: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication(); // untuk memanggil authentication di context

      const result = await Post.findAll();
      return result;
    },

    findPostById: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication(); // untuk memanggil authentication di context
      const { _id } = args;

      const result = await Post.findById(_id);
      return result
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
      const newLike = args.newLike;

      const result = await Post.likePost(newLike);

      return result;
    },

    addComment: async (_, args, contextValue) => {
      // console.log(args)

      const decodedToken = await contextValue.authentication();

      const newComment = args.newComment;
      const result = await Post.addComment(newComment);

      return result;
    },
  },
};

module.exports = resolvers;
