import { User } from "../types/User";
import { api } from "./axios";

/**
 * API service for candidate-related operations
 * Provides methods for CRUD operations on candidate data
 */
export const candidateApi = {
  /**
   * Retrieves all candidates from the API
   * @returns Promise resolving to an array of all candidates
   */
  getAllCandidates: async () => {
    const response = await api.get("/candidate");
    return response.data;
  },

  /**
   * Retrieves a specific candidate by user ID
   * @param user_id - The ID of the user to fetch candidate data for
   * @returns Promise resolving to the candidate data
   */
  getCandidateByUserId: async (user_id: number) => {
    const response = await api.get(`/candidate/${user_id}`);
    return response.data;
  },

  /**
   * Creates a new candidate record
   * @param user - Partial user data for the new candidate
   * @returns Promise resolving to the created candidate data
   */
  createCandidate: async (user: Partial<User>) => {
    const response = await api.post("/candidate", user);
    return response.data;
  },

  /**
   * Updates an existing candidate record
   * @param id - The ID of the candidate to update
   * @param user - Partial user data with updates
   * @returns Promise resolving to the updated candidate data
   */
  updateCandidate: async (id: number, user: Partial<User>) => {
    const response = await api.put(`/candidate/${id}`, user);
    return response.data;
  },

  /**
   * Deletes a candidate record
   * @param id - The ID of the candidate to delete
   * @returns Promise resolving to the deletion response
   */
  deleteCandidate: async (id: number) => {
    const response = await api.delete(`/candidate/${id}`);
    return response.data;
  },
};
