import { Base } from "./Base";
import { Candidate } from "./Candidate";
import { Role } from "./Role";

export interface CandidateRole extends Base {
  id: number;
  candidate: Candidate;
  role: Role;
}
