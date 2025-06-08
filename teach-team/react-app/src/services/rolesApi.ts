import { api } from "./axios";

/**
 * API service for role-related operations
 * Provides methods for interacting with role data
 */
export const rolesApi = {
  /**
   * Retrieves all available roles from the API
   * @returns Promise resolving to an array of role objects
   * @throws Will throw an error if the API request fails
   * @example
   * // Usage example:
   * try {
   *   const allRoles = await rolesApi.getAll();
   *   console.log(allRoles);
   * } catch (error) {
   *   console.error('Failed to fetch roles:', error);
   * }
   */
  getAll: async () => {
    const response = await api.get("/roles");
    return response.data;
  },
};
