import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Candidate } from "../entity/Candidate";

export class CandidateController {
  private candidateRepository = AppDataSource.getRepository(Candidate);

  async save(request: Request, response: Response) {
    const { user_id } = request.body;
    const candidate = new Candidate();
    // candidate.availability = "part-time";
    // candidate.skills = [];
    // candidate.credentials = [];
    candidate.userId = user_id;
    try {
      const savedCandidate = await this.candidateRepository.save(candidate);
      return response.status(201).json(savedCandidate);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error creating candidate", error });
    }
  }
}
