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

  static async insert(data) {
    const postCollection = this.collection();
    /**
      VALIDASI dapat dilakukan disini secara manual menggunakan js
    */
    const result = await postCollection.insertOne({
      ...data,
      likes: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log(result);

    return result;
  }
}

module.exports = Post;
