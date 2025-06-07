// src/graphql/queries.ts
import { gql } from "@apollo/client";

export const GET_CANDIDATES_BY_COURSE = gql`
  query {
    candidatesByCourse {
      courseName
      candidates {
        id
        firstName
        email
      }
    }
  }
`;
