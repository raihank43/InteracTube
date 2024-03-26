const { ObjectId } = require("mongodb");
const database = require("../config/db");
const bcryptjs = require("bcryptjs");
const validator = require("validator");
const { GraphQLError } = require("graphql");

class User {
  static collection() {
    return database.collection("users");
  }

  static async findAll() {
    const userCollection = this.collection();
    const data = await userCollection.find({}).toArray();

    return data;
  }

  static async findById(_id) {
    const userCollection = this.collection();
    const data = await userCollection.findOne({
      _id: new ObjectId(_id),
    });
    return data;
  }

  static async findByUsername(username) {
    const userCollection = this.collection();
    const result = await userCollection.findOne({
      username
    })
    return result
  }

  static async createUser(newUser) {
    const userCollection = this.collection();
    /**
      VALIDASI dapat dilakukan disini secara manual menggunakan js
    */
    const isEmailValid = validator.isEmail(newUser.email);

    // validasi email/handle error
    if (!isEmailValid) {
      throw new GraphQLError("Invalid argument value", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }
    const result = await userCollection.insertOne({
      ...newUser,
      password: bcryptjs.hashSync(newUser.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = this.findById(result.insertedId);
    return createdUser;
  }

  static async findByEmail(email) {
    const userCollection = this.collection();

    const findUser = await userCollection.findOne({
      email
    })

    return findUser
  }
}

module.exports = User;
