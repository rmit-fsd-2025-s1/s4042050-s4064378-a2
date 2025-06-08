import { Page } from "../App";
// import {  } from "../types/Tutor";
import { User } from "../types/User";
import { CURRENT_PAGE_KEY, CURRENT_USER_KEY } from "./constant";

/**
 * Saves the current user object to localStorage
 * @param user - The User object to be stored (or null to clear)
 */
export const setCurrentUserToLocalStorage = (user: User | null) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

/**
 * Retrieves the current user from localStorage
 * @returns The parsed User object if found, undefined otherwise
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  if (user) {
    return JSON.parse(user) as User;
  }
  // Returns undefined implicitly if no user found
};

/**
 * Saves the current page identifier to localStorage
 * @param page - The page identifier string to be stored
 */
export const setCurrentPageToLocalStorage = (page: string) => {
  localStorage.setItem(CURRENT_PAGE_KEY, page);
};

/**
 * Retrieves the current page from localStorage
 * @returns The page identifier as a Page type if found, undefined otherwise
 */
export const getCurrentPage = (): Page | undefined => {
  const page = localStorage.getItem(CURRENT_PAGE_KEY);
  if (page) {
    return page as Page;
  }
  // Returns undefined implicitly if no page found
};
