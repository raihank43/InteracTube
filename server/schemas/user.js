const typeDefs = `#graphql
  type User {
      _id: ID
      name: String
      username: String
      email: String
      password: String
      createdAt: String
      Followers: [FollowersDetail]
      Followings: [FollowingsDetail]
  }

  input RegisterUser {
    name: String!
    username: String! 
    email: String! 
    password: String!
  }

  type FollowersDetail{
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  type FollowingsDetail{
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }


  type LoginOutput{
    access_token: String
    email: String
  }

  # Query ->  untuk bikin R
  type Query {
    findAllUsers(searchTerm: String!): [User]
    findUserById(_id: ID!): User
    findUserByUsername(username: String!): User
    findCurrentLogUser: User

  }

  # Mutation -> pendaftaran route / endpoint yang selain GET / CUD
  type Mutation {
    register(newUser: RegisterUser!): User
    login(email: String!, password: String!): LoginOutput
  }

`;

module.exports = typeDefs;
