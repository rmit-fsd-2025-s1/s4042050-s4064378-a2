export interface Tutor {
  id: number; // candidate id
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
  availability: string;
  appliedRoles: TutorRole[];
}

// A single role applied by a tutor (used inside Tutor.appliedRoles)
export interface TutorRole {
  id: number;
  role: string;
  course: {
    id: number;
    code: string;
    name: string;
  };
  rank: number;
  status: "pending" | "accepted" | "rejected";
  comment?: string;
  availability: "full-time" | "part-time"; // ✅ new
  skills: string[]; // ✅ new
}

export interface TutorApplication extends Omit<Tutor, "appliedRoles"> {
  appliedRole: TutorRole; // single role (course + role + status + comment)
  rank: number; 
}
