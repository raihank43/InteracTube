const redis = require("../config/redis");
const Post = require("../models/posts");
const User = require("../models/user");
const resolvers = {
  Query: {
    findAllPost: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication(); // untuk memanggil authentication di context
      // caching
      // 1. jika ada data dari cache
      // -> kembalikan data dari cachenya

      const cache = await redis.get("posts");
      if (cache) {
        console.log(cache, "lewat cache");
        return JSON.parse(cache);
      }

      // 2. jika tidak ada data dari cache
      // -> hit ke mongoDB lewat model yang sudah dibuat
      // -> simpan hasil mongodbnya ke cache

      const result = await Post.findAll();

      console.log(result, "lewat mongodb");

      await redis.set("posts", JSON.stringify(result));

      return result;
    },

    findPostById: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication();
      const { _id } = args;

      const result = await Post.findById(_id);
      console.log(result, "<<<< ini result di resolvers")
      return result;
    },
  },

  Mutation: {
    createPost: async (_, args, contextValue) => {
      // menggunakan context dan authentication kita bisa mengirim authorId yang membuat post
      const decodedToken = await contextValue.authentication(); // untuk memanggil authentication di context

      // invalidate cache
      // jika berhasil melakukan create data/ delete data/update data ->
      const newPost = args.newPost;
      const result = await Post.insert({
        ...newPost,
        authorId: decodedToken._id,
        // authorId: "66019641aaddd7ef336278d8",
      });

      // hapus cachenya
      await redis.del("posts");
      return result;
    },

    likePost: async (_, args, contextValue) => {
      const decodedToken = await contextValue.authentication();

      const likerUsername = decodedToken.username;

      const newLike = args.newLike;
      newLike.username = likerUsername;
      const result = await Post.likePost(newLike);


      // console.log(decodedToken)
      

      await redis.del("posts");
      return result;
    },

    addComment: async (_, args, contextValue) => {
      // console.log(args)

      const decodedToken = await contextValue.authentication();

      const commenterUsername = decodedToken.username;

      const newComment = args.newComment;
      newComment.username = commenterUsername;
      const result = await Post.addComment(newComment);

      await redis.del("posts");
      return result;
    },
  },
};

module.exports = resolvers;
