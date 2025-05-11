import { AvatarConfigProps } from "../components/Avatar/avatarConfig";
import { Base } from "./Base";
import { Candidate } from "./Candidate";
import { Lecturer } from "./Lecturer";

export type UserType = "candidate" | "lecturer";

export interface User extends Base {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserType;
  avatarConfig: AvatarConfigProps;

  // we keep this for easy data processing
  candidate?: Candidate;
  lecturere?: Lecturer;
}
