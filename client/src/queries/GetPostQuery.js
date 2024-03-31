import { useQuery, gql } from "@apollo/client";

// querynya di copy dari apollo sandbox
export const GET_POSTS = gql`
  query FindAllPost {
    findAllPost {
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
