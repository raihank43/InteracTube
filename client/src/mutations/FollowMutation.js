import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
  mutation FollowUser($followingId: ID!) {
    followUser(followingId: $followingId) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
      following {
        _id
        name
        email
      }
      follower {
        _id
        name
        email
      }
    }
  }
`;
