import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Lecturer } from "../entity/Lecturer";

/**
 * Controller responsible for handling operations related to the Lecturer entity.
 */
export class LecturerController {
  // Repository instance for managing Lecturer entity database operations
  private lecturerRepository = AppDataSource.getRepository(Lecturer);

  /**
   * Creates and saves a new Lecturer entry in the database.
   *
   * @param request - Express Request object containing `user_id` in the body
   * @param response - Express Response object used to send HTTP responses
   * @returns HTTP response containing the saved lecturer or an error message
   */
  async save(request: Request, response: Response) {
    const { user_id } = request.body; // Extract user ID from the request body

    const lecturer = new Lecturer();
    lecturer.userId = user_id; // Associate lecturer with a user

    try {
      // Attempt to save the new Lecturer to the database
      const savedLecturer = await this.lecturerRepository.save(lecturer);
      return response.status(201).json(savedLecturer); // Return the saved lecturer with status 201
    } catch (error) {
      // Handle and return any errors during the save operation
      return response
        .status(400)
        .json({ message: "Error creating candidate", error });
      // Note: message says "candidate" – consider changing it to "lecturer" for clarity
    }
  }
}
