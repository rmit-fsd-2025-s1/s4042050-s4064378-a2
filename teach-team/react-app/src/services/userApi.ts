import { User } from "../types/User";
import { api } from "./axios";

/**
 * API service for user management operations
 * Provides complete CRUD functionality for user resources
 * Handles authentication and user profile management
 */
export const userApi = {
  /**
   * Retrieves all registered users from the system
   * @returns Promise resolving to an array of User objects
   * @throws {Error} When API request fails
   * @example
   * const users = await userApi.getAllUsers();
   */
  getAllUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  /**
   * Fetches a specific user by their unique identifier
   * @param id - Numeric ID of the user to retrieve
   * @returns Promise resolving to a single User object
   * @throws {Error} When user is not found or request fails
   */
  getUserById: async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Authenticates a user with email and password credentials
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise resolving to authentication response (typically includes token)
   * @throws {Error} When authentication fails
   * @example
   * const authData = await userApi.login('user@example.com', 'password123');
   */
  login: async (email: string, password: string) => {
    const response = await api.post(`/users/login`, { email, password });
    return response.data;
  },

  /**
   * Creates a new user account
   * @param user - Partial User object containing registration data
   * @returns Promise resolving to the created User object
   * @throws {Error} When creation fails (e.g., duplicate email)
   */
  createUser: async (user: Partial<User>) => {
    const response = await api.post("/users", user);
    return response.data;
  },

  /**
   * Updates an existing user's information
   * @param id - Numeric ID of the user to update
   * @param user - Partial User object containing updated fields
   * @returns Promise resolving to the updated User object
   * @throws {Error} When update fails or user not found
   */
  updateUser: async (id: number, user: Partial<User>) => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },

  /**
   * Permanently deletes a user account
   * @param id - Numeric ID of the user to delete
   * @returns Promise resolving to deletion confirmation
   * @throws {Error} When deletion fails or user not found
   * @warning This action is irreversible
   */
  deleteUser: async (id: number) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
