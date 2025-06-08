import { Application } from "../types/Application";
import { api } from "./axios";

// API service object for handling application-related operations
export const applicationApi = {
  /**
   * Creates a new application
   * @param application - Partial application data to be submitted
   * @returns Promise resolving to the created application data
   */
  create: async (application: Partial<Application>) => {
    const response = await api.post("/applications", application);
    return response.data;
  },

  /**
   * Fetches all applications
   * @returns Promise resolving to an array of all applications
   */
  getAll: async () => {
    const response = await api.get("/applications");
    return response.data;
  },

  /**
   * Fetches applications for a specific candidate
   * @param candidateId - The ID of the candidate to filter applications
   * @returns Promise resolving to the candidate's applications
   */
  getApplicationsByCandidateId: async (candidateId: number) => {
    const response = await api.get(`/applications/${candidateId}`);
    return response.data;
  },
};
