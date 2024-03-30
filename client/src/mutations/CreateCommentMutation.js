const { gql } = require("@apollo/client");

export const CREATE_COMMENT = gql`
  mutation AddComment($newComment: NewComment) {
    addComment(newComment: $newComment) {
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
