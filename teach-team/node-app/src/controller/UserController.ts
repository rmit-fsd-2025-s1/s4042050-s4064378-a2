// Import required modules and dependencies
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { hashPassword } from "../util/hashPassword";
import { comparePassword } from "../util/comparePassword";
import { CandidateController } from "./CandidateController";
import { LecturerController } from "./LecturerController";

// Controller class for handling user-related operations
export class UserController {
  // Initialize TypeORM repository for User entity
  private userRepository = AppDataSource.getRepository(User);

  /**
   * Retrieves all users from the database
   * @param request - Express request object
   * @param response - Express response object
   * @returns JSON response containing an array of all users
   */
  async all(request: Request, response: Response) {
    // Fetch all users from the database
    const users = await this.userRepository.find();
    // Return users as JSON response
    return response.json(users);
  }

  /**
   * Retrieves a single user by their ID
   * @param request - Express request object containing the user ID in params
   * @param response - Express response object
   * @returns JSON response containing the user if found, or 404 error if not found
   */
  async one(request: Request, response: Response) {
    // Extract user ID from request parameters
    const id = parseInt(request.params.id);
    // Find user by ID in the database
    const user = await this.userRepository.findOne({
      where: { id },
    });

    // Handle case when user is not found
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    // Return found user as JSON response
    return response.json(user);
  }

  /**
   * Creates a new user in the database
   * @param request - Express request object containing user details in body
   * @param response - Express response object
   * @returns JSON response containing the created user or error message
   */
  async save(request: Request, response: Response) {
    // Destructure required fields from request body
    const { firstName, lastName, email, password, role, avatarConfig } =
      request.body;

    // Create new User instance with hashed password
    const user = Object.assign(new User(), {
      firstName,
      lastName,
      email,
      password: await hashPassword(password),
      avatarConfig,
    });

    try {
      // Save the new user to database
      const savedUser = await this.userRepository
        .save(user)
        .then(async (res) => {
          // Set user_id in request body for role-specific controllers
          request.body.user_id = res.id;
          // Handle role-specific user creation
          if (role === "candidate") {
            const candidateController = new CandidateController();
            const respond = await candidateController.save(request, response);
          } else if (role === "lecturer") {
            console.log("inside");
            const lecturerController = new LecturerController();
            const respond = await lecturerController.save(request, response);
          }
        });

      // Return success response with created user
      return response.status(201).json(savedUser);
    } catch (error) {
      // Handle errors during user creation
      return response
        .status(400)
        .json({ message: "Error creating user", error });
    }
  }

  /**
   * Deletes a user from the database by their ID
   * @param request - Express request object containing the user ID in params
   * @param response - Express response object
   * @returns JSON response with success message or 404 error if user not found
   */
  async remove(request: Request, response: Response) {
    // Extract user ID from request parameters
    const id = parseInt(request.params.id);
    // Find user to delete
    const userToRemove = await this.userRepository.findOne({
      where: { id },
    });

    // Handle case when user is not found
    if (!userToRemove) {
      return response.status(404).json({ message: "User not found" });
    }

    // Remove user from database
    await this.userRepository.remove(userToRemove);
    // Return success message
    return response.json({ message: "User removed successfully" });
  }

  /**
   * Updates an existing user's information
   * @param request - Express request object containing user ID in params and updated details in body
   * @param response - Express response object
   * @returns JSON response containing the updated user or error message
   */
  async update(request: Request, response: Response) {
    // Extract user ID from request parameters
    const id = parseInt(request.params.id);
    // Destructure updatable fields from request body
    const { firstName, lastName, email, avatarConfig, password } = request.body;

    // Find existing user including related entities
    let userToUpdate = await this.userRepository.findOne({
      where: { id },
      relations: ["candidate", "lecturer"],
    });

    // Handle case when user is not found
    if (!userToUpdate) {
      return response.status(404).json({ message: "User not found" });
    }

    // Update user properties with new values
    userToUpdate = Object.assign(userToUpdate, {
      firstName,
      lastName,
      email,
      avatarConfig,
    });

    // Handle password update with hashing
    if (password) {
      userToUpdate = Object.assign(userToUpdate, {
        password: await hashPassword(password),
      });
    }

    try {
      // Save updated user to database
      const updatedUser = await this.userRepository.save(userToUpdate);
      // Return updated user
      return response.json(updatedUser);
    } catch (error) {
      // Handle errors during update
      return response
        .status(400)
        .json({ message: "Error updating user", error });
    }
  }

  /**
   * Handles user login authentication
   * @param request - Express request object containing email and password
   * @param response - Express response object
   * @returns JSON response with user data if successful, or error message
   */
  async login(request: Request, response: Response) {
    // Extract credentials from request body
    const { email, password } = request.body;

    try {
      // Find user by email including related entities
      let user = await this.userRepository.findOne({
        where: { email },
        relations: ["candidate", "lecturer"],
      });

      // Handle invalid email
      if (!user) {
        return response.status(401).json({ message: "Invalid credentials" });
      }

      // Verify password matches
      const isValidPassword = await comparePassword(password, user.password);

      // Handle invalid password
      if (!isValidPassword) {
        return response.status(401).json({ message: "Invalid credentials" });
      }

      // Determine user role
      let role = "";

      if (user.candidate) {
        role = "candidate";

        // Check if candidate account is active
        if (!user.candidate.active) {
          return response
            .status(400)
            .json({ message: "User is blocked by the system" });
        }
      } else if (user.lecturer) {
        role = "lecturer";
      }
      // Return user data with role information
      return response.json({ ...user, role });
    } catch (error) {
      // Handle login errors
      return response.status(400).json({ message: "Error login user", error });
    }
  }
}
