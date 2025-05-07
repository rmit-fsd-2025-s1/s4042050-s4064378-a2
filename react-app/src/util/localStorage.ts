import { Page } from "../App";
// import {  } from "../types/Tutor";
import { User } from "../types/User";
import {
  CURRENT_PAGE_KEY,
  CURRENT_USER_KEY,
  TUTOR_LOCAL_STORAGE_KEY,
} from "./constant";

// const LOCAL_STORAGE_KEY = "tutors";

// export const loadTutors = (): Tutor[] => {
//   try {
//     const raw = localStorage.getItem(TUTOR_LOCAL_STORAGE_KEY);

//     if (!raw) return [];
//     console.log("Load users called");

//     const data = JSON.parse(raw);

//     if (!Array.isArray(data)) {
//       console.warn("Invalid data structure for tutors");
//       return [];
//     }

//     return data as Tutor[];
//   } catch (error) {
//     console.error("Failed to load tutors from localStorage:", error);
//     return [];
//   }
// };

// export const saveTutors = (applicants: Tutor[]): void => {
//   try {
//     const serialized = JSON.stringify(applicants);
//     localStorage.setItem(TUTOR_LOCAL_STORAGE_KEY, serialized);
//     console.log("Tutor saved to localStorage.");
//   } catch (error) {
//     console.error("Error saving Tutor to localStorage:", error);
//   }
// };

export const setCurrentUserToLocalStorage = (user: User | null) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  if (user) {
    return JSON.parse(user) as User;
  }
};

export const setCurrentPageToLocalStorage = (page: string) => {
  localStorage.setItem(CURRENT_PAGE_KEY, page);
};

export const getCurrentPage = (): Page | undefined => {
  const page = localStorage.getItem(CURRENT_PAGE_KEY);
  if (page) {
    return page as Page;
  }
};
