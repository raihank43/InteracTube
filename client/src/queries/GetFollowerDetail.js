const { gql } = require("@apollo/client");

export const GET_FOLLOWER_DETAIL = gql`
  query FindFollowerDetail($id: ID!) {
    findFollowerDetail(_id: $id) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
      following {
        _id
        name
        email
        username
      }
      follower {
        _id
        name
        email
        username
      }
    }
  }
`;
