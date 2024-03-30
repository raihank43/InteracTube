const { gql } = require("@apollo/client");

export const LIKE_POST = gql`
  mutation LikePost($newLike: NewLike) {
    likePost(newLike: $newLike) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
      }
      likes {
        username
      }
      author {
        _id
        name
        username
        email
      }
    }
  }
`;
