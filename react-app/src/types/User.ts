export type Role = "candidate" | "lecturer";

// export interface User {
//   email: string;
//   firstName: string;
//   lastName: string;
//   password: string;
//   role: Role;
// }

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
