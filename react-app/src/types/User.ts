export type Role = "tutor" | "lecturer";

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
}
