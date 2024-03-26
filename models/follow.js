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
    const followCollection = this.collection();

    const result = await followCollection.insertOne({
      followingId: new ObjectId(data.followingId),
      followerId: new ObjectId(data.followerId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdFollower = await this.findById(result.insertedId);
    return createdFollower;
  }

  static async findFollowing(_id) {
    // follower
    return this.collection()
      .aggregate([
        {
          $match: {
            followerId: new ObjectId(_id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "followingId",
            foreignField: "_id",
            as: "following",
          },
        },
        {
          $unwind: {
            path: "$following",
          },
        },
        {
          $project: {
            "following.password": 0,
          },
        },
      ])
      .toArray();
  }

  static async findFollower(_id) {
    // follower
    return this.collection()
      .aggregate([
        {
          $match: {
            followingId: new ObjectId(_id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "followerId",
            foreignField: "_id",
            as: "follower",
          },
        },
        {
          $unwind: {
            path: "$follower",
          },
        },
        {
          $project: {
            "follower.password": 0,
          },
        },
      ])
      .toArray();
  }
}

module.exports = Follow;
