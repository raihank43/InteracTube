const { gql } = require("@apollo/client");

export const GET_CURRENT_LOG_USER = gql`
  query FindCurrentLogUser {
    findCurrentLogUser {
      _id
      name
      username
      email
    }
  }
`;
