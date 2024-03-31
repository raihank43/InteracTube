const { gql } = require("@apollo/client");

export const GET_ALL_USERS = gql`
  query FindAllUsers($searchTerm: String!) {
    findAllUsers(searchTerm: $searchTerm) {
      _id
      name
      username
      email
      createdAt
      Followers {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      Followings {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
    }
  }
`;
