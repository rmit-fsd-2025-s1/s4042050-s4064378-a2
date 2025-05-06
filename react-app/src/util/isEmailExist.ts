import { USER_LOCAL_STORAGE_KEY } from "./constant";

export const isEmailExist = (email: string): boolean => {
  try {
    const userData = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if (!userData) return false;

    const existingUsers = JSON.parse(userData);
    if (Array.isArray(existingUsers)) {
      return Boolean(
        existingUsers.find(
          (user) => user.email.toLowerCase() === email.toLowerCase()
        )
      );
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
