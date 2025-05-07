import { AppDataSource } from "src/data-source";
import { Candidate } from "src/entity/Candidate";

export class CandidateController {
  private userRepository = AppDataSource.getRepository(Candidate);

  async save(request: Request, response: Response) {
    // const {}
  }
}
