import { useQuery, gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register($newUser: RegisterUser!) {
    register(newUser: $newUser) {
      _id
      name
      username
      email
      password
    }
  }
`;
