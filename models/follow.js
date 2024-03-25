const { ObjectId } = require("mongodb");
const database = require("../config/db");

class Follow {
  static collection() {
    return database.collection("follows");
  }

  static async findById(_id) {
    const followCollection = this.collection();

    return followCollection.findOne({
      _id: new ObjectId(_id),
    });
  }

  static async add(data) {
    try {
      const followCollection = this.collection();

      const result = await followCollection.insertOne({
        followingId: new ObjectId(data.followingId),
        followerId: new ObjectId(data.followerId),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const createdFollower = await this.findById(result.insertedId);
      return createdFollower;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Follow;
