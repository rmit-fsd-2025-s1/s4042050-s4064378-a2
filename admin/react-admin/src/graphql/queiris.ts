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

export const GET_ALL_CANDIDATES = gql`
  query {
    allCandidates {
      success
      message
      candidates {
        id
        name
        createdAt
        active
      }
    }
  }
`;
