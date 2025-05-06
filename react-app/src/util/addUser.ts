import { User } from "../types/User";
import { USER_LOCAL_STORAGE_KEY } from "./constant";

export const addUser = (user: User) => {
  try {
    const existingData = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

    if (!existingData) {
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify([user]));
      return;
    }

    const existingUsers = JSON.parse(existingData);
    if (Array.isArray(existingUsers)) {
      localStorage.setItem(
        USER_LOCAL_STORAGE_KEY,
        JSON.stringify([...existingUsers, user])
      );
    } else {
      console.log("Error: wrong user data format");
    }

    // localStorage.setItem(user.email.toLowerCase(), JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};
