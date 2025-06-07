import { Base } from "./Base";
import { Candidate } from "./Candidate";
import { Course } from "./Course";
import { Role } from "./Role";

export interface Application extends Base {
  id: number;
  availability: "part-time" | "full-time";
  skills: string[];
  credentials: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  previousRoles: Array<{
    course: string;
    role: string;
  }>;
  status: "accepted" | "rejected" | "pending";
  rank: number;
  comment: string;
  role: Role;
  course: Course;
  candidate: Candidate;
}
