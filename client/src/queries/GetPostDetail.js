import { gql, useQuery } from "@apollo/client";

export const GET_POST_BY_ID = gql`
  query FindPostById($_id: ID!) {
    findPostById(_id: $_id) {
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
