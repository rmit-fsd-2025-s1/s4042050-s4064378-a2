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
        role
        availability
        semester
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

export const UPDATE_CANDIDATE_ACTIVE = gql`
  mutation updateCandidateActive($id: ID!, $active: Boolean!) {
    updateCandidateActive(id: $id, active: $active) {
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

// Updated to match your AuthPayload type
export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      message
      user {
        id
        username
      }
    }
  }
`;


export const GET_CANDIDATES_WITH_MORE_THAN_3_COURSES = gql`
  query {
    candidatesWithMoreThan3Courses {
      id
      name
      email
      courses {
        courseName
        role
        availability
        semester
      }
    }
  }
`;


export const GET_UNSELECTED_CANDIDATES = gql`
  query {
    unselectedCandidates {
      id
      name
      email
      applications {
        courseName
        semester
        role
        availability
      }
    }
  }
`;
