import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query FindUserById($id: ID!) {
    findUserById(_id: $id) {
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
