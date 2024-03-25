const { ObjectId } = require("mongodb");
const database = require("../config/db");
class Post {
  static collection() {
    return database.collection("posts");
  }

  static async findAll() {
    const postCollection = this.collection();
    const data = await postCollection.find({}).toArray();

    return data;
  }

  static async findById(_id) {
    const postCollection = this.collection();
    const data = await postCollection.findOne({
      _id: new ObjectId(_id),
    });

    return data;
  }

  static async insert(data) {
    const postCollection = this.collection();
    /**
      VALIDASI dapat dilakukan disini secara manual menggunakan js
    */
    const result = await postCollection.insertOne({
      ...data,
      likes: [],
      comments: [],
      authorId: new ObjectId("6601aa66af6d766c5a4dbcfe"),
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
        _id: new ObjectId("6601b84052b9d74f08696f3d"),
      },
      {
        $push: {
          comments: { ...data, createdAt: new Date(), updatedAt: new Date() },
        },
      }
    );

    const updatedPostWithComment = await this.findById(
      "6601b84052b9d74f08696f3d"
    );

    return updatedPostWithComment;
  }

  static async likePost(data) {
    const postCollection = this.collection();

    const result = await postCollection.updateOne(
      {
        _id: new ObjectId("6601b84052b9d74f08696f3d"),
      },
      {
        $push: {
          likes: { ...data, createdAt: new Date(), updatedAt: new Date() },
        },
      }
    );

    console.log(result);
  }
}

module.exports = Post;
