import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { hashPassword } from "../util/hashPassword";
import { comparePassword } from "../util/comparePassword";
import { CandidateController } from "./CandidateController";
import { LecturerController } from "./LecturerController";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  /**
   * Retrieves all users from the database
   * @param request - Express request object
   * @param response - Express response object
   * @returns JSON response containing an array of all users
   */
  async all(request: Request, response: Response) {
    const users = await this.userRepository.find();
    return response.json(users);
  }

  /**
   * Retrieves a single user by their ID
   * @param request - Express request object containing the user ID in params
   * @param response - Express response object
   * @returns JSON response containing the user if found, or 404 error if not found
   */
  async one(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    return response.json(user);
  }

  /**
   * Creates a new user in the database
   * @param request - Express request object containing user details in body
   * @param response - Express response object
   * @returns JSON response containing the created user or error message
   */
  async save(request: Request, response: Response) {
    const { firstName, lastName, email, password, role, avatarConfig } =
      request.body;

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      email,
      password: await hashPassword(password),
      avatarConfig,
    });

    try {
      const savedUser = await this.userRepository
        .save(user)
        .then(async (res) => {
          request.body.user_id = res.id;
          if (role === "candidate") {
            const candidateController = new CandidateController();
            const respond = await candidateController.save(request, response);
          } else if (role === "lecturer") {
            console.log("inside");
            const lecturerController = new LecturerController();
            const respond = await lecturerController.save(request, response);
          }
        });

      return response.status(201).json(savedUser);
    } catch (error) {
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
    const id = parseInt(request.params.id);
    const userToRemove = await this.userRepository.findOne({
      where: { id },
    });

    if (!userToRemove) {
      return response.status(404).json({ message: "User not found" });
    }

    await this.userRepository.remove(userToRemove);
    return response.json({ message: "User removed successfully" });
  }

  /**
   * Updates an existing user's information
   * @param request - Express request object containing user ID in params and updated details in body
   * @param response - Express response object
   * @returns JSON response containing the updated user or error message
   */
  async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { firstName, lastName, email, age } = request.body;

    let userToUpdate = await this.userRepository.findOne({
      where: { id },
    });

    if (!userToUpdate) {
      return response.status(404).json({ message: "User not found" });
    }

    userToUpdate = Object.assign(userToUpdate, {
      firstName,
      lastName,
      email,
      age,
    });

    try {
      const updatedUser = await this.userRepository.save(userToUpdate);
      return response.json(updatedUser);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error updating user", error });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    console.log("test", request.body);

    try {
      let user = await this.userRepository.findOne({
        where: { email },
        relations: ["candidate", "lecturer"],
      });

      if (!user) {
        return response.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await comparePassword(password, user.password);

      if (!isValidPassword) {
        return response.status(401).json({ message: "Invalid credentials" });
      }

      let role = "";

      if (user.candidate) {
        role = "candidate";
      } else if (user.lecturer) {
        role = "lecturer";
      }
      return response.json({ ...user, role });
    } catch (error) {
      return response.status(400).json({ message: "Error login user", error });
    }
  }
}
