const typeDefs = `#graphql
  type User {
      id: ID
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

  # Query ->  untuk bikin R
  type Query {
    findAllUsers: [User]
    findUserById(id: ID!): User

  }

  # Mutation -> pendaftaran route / endpoint yang selain GET / CUD
  type Mutation {
    addUser(newUser: RegisterUser!): User
  }

`;


module.exports = typeDefs