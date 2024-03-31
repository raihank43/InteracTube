import { useQuery, gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation CreatePost($newPost: NewPost) {
    createPost(newPost: $newPost) {
      _id
      content
      tags
      imgUrl
      authorId
    }
  }
`;
