// Import necessary modules and dependencies
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Role } from "../entity/Role";

// Define RoleController class to handle role-related operations
export class RoleController {
  // Initialize repository for Role entity using TypeORM
  private courseRepository = AppDataSource.getRepository(Role);

  // Method to handle fetching all roles
  async all(request: Request, response: Response) {
    // Retrieve all roles from the database
    const roles = await this.courseRepository.find();
    // Return the roles as JSON response
    return response.json(roles);
  }
}
