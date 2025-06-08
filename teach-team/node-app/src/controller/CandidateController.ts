import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Candidate } from "../entity/Candidate";

/**
 * Controller class to handle operations related to the Candidate entity.
 */
export class CandidateController {
  // Repository instance for performing database operations on Candidate entity
  private candidateRepository = AppDataSource.getRepository(Candidate);

  /**
   * Handles saving a new candidate to the database.
   *
   * @param request - Express request object, expects `user_id` in the body
   * @param response - Express response object used to return success or error responses
   * @returns HTTP response with the saved candidate or error message
   */
  async save(request: Request, response: Response) {
    const { user_id } = request.body; // Extract user_id from request body

    const candidate = new Candidate();
    candidate.active = true; // New candidates are active by default
    candidate.userId = user_id; // Associate candidate with a user ID

    try {
      // Attempt to save the new candidate to the database
      const savedCandidate = await this.candidateRepository.save(candidate);
      return response.status(201).json(savedCandidate); // Success: return created resource
    } catch (error) {
      // Failure: return error response with status 400
      return response
        .status(400)
        .json({ message: "Error creating candidate", error });
    }
  }
}
