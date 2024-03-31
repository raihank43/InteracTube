const { gql } = require("@apollo/client");

export const GET_FOLLOWING_DETAIL = gql`
  query FindFollowingDetail($id: ID!) {
    findFollowingDetail(_id: $id) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
      follower {
        _id
        name
        email
        username
      }
      following {
        _id
        name
        email
        username
      }
    }
  }
`;
