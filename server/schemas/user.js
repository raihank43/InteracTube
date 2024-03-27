const typeDefs = `#graphql
  type User {
      _id: ID
      name: String
      username: String
      email: String
      password: String
  }

  input RegisterUser {
    name: String!
    username: String! 
    email: String! 
    password: String!
  }


  type LoginOutput{
    access_token: String
    email: String
  }

  # Query ->  untuk bikin R
  type Query {
    findAllUsers: [User]
    findUserById(_id: ID!): User
    findUserByUsername(username: String!): User

  }

  # Mutation -> pendaftaran route / endpoint yang selain GET / CUD
  type Mutation {
    register(newUser: RegisterUser!): User
    login(email: String!, password: String!): LoginOutput
  }

`;

module.exports = typeDefs;
