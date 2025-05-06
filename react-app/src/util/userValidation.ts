import { User } from "../types/User";
import { USER_LOCAL_STORAGE_KEY } from "./constant";

export const userValidation = (
  user: Omit<User, "role" | "firstName" | "lastName">
): User | undefined => {
  const userData = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

  if (!userData) return undefined;

  const existingUsers = JSON.parse(userData);
  if (Array.isArray(existingUsers)) {
    return existingUsers.find(
      (x) =>
        x.email.toLowerCase() === user.email.toLowerCase() &&
        x.password === user.password
    );
  }
  return undefined;
};
