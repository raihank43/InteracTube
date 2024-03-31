const { ObjectId } = require("mongodb");
const database = require("../config/db");
const redis = require("../config/redis");
class Post {
  static collection() {
    return database.collection("posts");
  }

  static async findAll() {
    const postCollection = this.collection();
    const data = await postCollection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
          },
        },
        {
          $project: {
            "author.password": 0,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .toArray();

    return data;
  }

  static async findById(_id) {
    const postCollection = this.collection();
    // const data = await postCollection.findOne({
    //   _id: new ObjectId(_id),
    // });

    const data = await postCollection
      .aggregate([
        {
          $match: {
            _id: new ObjectId(_id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
          },
        },
        {
          $project: {
            "author.password": 0,
          },
        },
      ])
      .toArray();
    // console.log(_id, "<<<<<<<<<< idnya");
    return data[0];
  }

  static async insert(data) {
    const postCollection = this.collection();
    /**
      VALIDASI dapat dilakukan disini secara manual menggunakan js
    */

    // split tags
    let tags;
    if (data.tags) {
      tags = data.tags.split(" ");
    }

    const result = await postCollection.insertOne({
      ...data,
      tags: tags || [],
      likes: [],
      comments: [],
      authorId: new ObjectId(data.authorId), // sesuai dengan orang yang lagi login
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // return ini harus sesuai janji yang dibuat di schema
    const createdPost = await this.findById(result.insertedId);
    return createdPost;
  }

  static async addComment(data) {
    const postCollection = this.collection();
    const result = await postCollection.updateOne(
      {
        _id: new ObjectId(data.postId),
      },
      {
        $push: {
          comments: { ...data, createdAt: new Date(), updatedAt: new Date() },
        },
      }
    );

    const updatedPostWithComment = await this.findById(data.postId);

    return updatedPostWithComment;
  }

  static async likePost(data) {
    const postCollection = this.collection();
    // validasi user - like or unlike

    // validasi like/unlike
    const findPost = await postCollection.findOne({
      _id: new ObjectId(data.postId),
    });

    // find whether current log user is on the list of people who likes the post
    const findUser = findPost.likes.find(
      (obj) => obj.username.toString() === data.username
    );

    // if user found, we "pull out" the userdata from the "likes" lists
    if (findUser) {
      const result = await postCollection.updateOne(
        {
          _id: new ObjectId(data.postId),
        },
        {
          $pull: {
            likes: { username: data.username },
          },
        }
      );
      console.log("user pulled out || User unlike the post");
      const updatedPostWithLike = await this.findById(data.postId);
      return updatedPostWithLike;
    } else {
      // if user not found we "push" the user data to the likes list
      const result = await postCollection.updateOne(
        {
          _id: new ObjectId(data.postId),
        },
        {
          $push: {
            likes: { ...data, createdAt: new Date(), updatedAt: new Date() },
          },
        }
      );

      const updatedPostWithLike = await this.findById(data.postId);
      return updatedPostWithLike;
    }
  }
}

module.exports = Post;
