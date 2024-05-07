import { gql } from "@apollo/client";

export const GET_USER_BY_USERNAME = gql`
  query FindUserByUsername($username: String!) {
    findUserByUsername(username: $username) {
      name
    }
  }
`;
