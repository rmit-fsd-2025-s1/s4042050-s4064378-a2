import { api } from "./axios";

/**
 * API service for course-related operations
 * Provides methods for interacting with course data
 */
export const courseApi = {
  /**
   * Fetches all available courses from the API
   * @returns Promise resolving to an array of course objects
   * @example
   * // Usage:
   * const courses = await courseApi.getAllCourses();
   */
  getAllCourses: async () => {
    const response = await api.get("/courses");
    return response.data;
  },
};
