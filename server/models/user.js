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

  static async findByEmail(email) {
    const userCollection = this.collection();
    const data = await userCollection.findOne({
      email: email,
    });
    return data;
  }

  static async findByUsername(username) {
    const userCollection = this.collection();
    const result = await userCollection.findOne({
      username,
    });
    return result;
  }

  static async createUser(newUser) {
    const userCollection = this.collection();
    /**
      VALIDASI dapat dilakukan disini secara manual menggunakan js
    */
    if (
      !newUser.username &&
      !newUser.email &&
      !newUser.password &&
      !newUser.name
    ) {
      throw new GraphQLError("Please fill the fields.", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (!newUser.username) {
      throw new GraphQLError("Username can't be empty", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    //handling unique username
    const findUsername = await this.findByUsername(newUser.username);

    if (findUsername) {
      throw new GraphQLError("Username is already exist", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (!newUser.email) {
      throw new GraphQLError("Email can't be empty", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }
    const isEmailValid = validator.isEmail(newUser.email);

    // validasi email/handle error
    if (!isEmailValid) {
      throw new GraphQLError("Invalid Email.", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    // handling duplicate email
    const findEmail = await this.findByEmail(newUser.email);

    if (findEmail) {
      throw new GraphQLError("Email already exist", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (!newUser.password) {
      throw new GraphQLError("Password can't be empty", {
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
}

module.exports = User;
