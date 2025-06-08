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
export const CREATE_COURSE = gql`
  mutation CreateCourse($input: CourseInput!) {
    createCourse(input: $input) {
      success
      message
      course {
        id
        code
        name
        createdAt
      }
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $name: String!, $code: String!) {
    updateCourse(id: $id, name: $name, code: $code) {
      success
      message
      course {
        id
        code
        name
      }
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      success
      message
    }
  }
`;

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      success
      message
      course {
        id
        code
        name
        semester
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ALL_COURSES = gql`
  query {
    getAllCourses {
      success
      message
      courses {
        id
        code
        name
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
