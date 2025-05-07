import { User } from "./User";

export interface Candidate extends User {
  candidateId: string;
  // name:string, // use first name and last name from User parent object
  // course: string; // should be removed
  availability: "full-time" | "part-time";
  skills: string[];
  credentials: {
    degree: string;
    institution: string;
    year: number;
  }[];
  appliedRoles?: CandidateRole[];
}

export interface Course {
  id: string;
  code: string; // Format: COSCxxxx
  name: string;
  semester: string;
}

export interface CandidateRole {
  // id: string; I feel we don't need this
  courseId: string;
  role: "candidate" | "lab-assistant";
  status: "accepted" | "rejected" | "pending";
  rank?: number;
  comment?: string;
}

// export interface CandidateApplication extends Candidate {
//   course: string;
//   rank: number;
//   status: "pending" | "accepted" | "rejected";
//   appliedRole: CandidateRole;
// }
