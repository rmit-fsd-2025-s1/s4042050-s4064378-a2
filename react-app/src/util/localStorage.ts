import { Page } from "../App";
// import {  } from "../types/Tutor";
import { User } from "../types/User";
import {
  CURRENT_PAGE_KEY,
  CURRENT_USER_KEY,
  TUTOR_LOCAL_STORAGE_KEY,
} from "./constant";

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
