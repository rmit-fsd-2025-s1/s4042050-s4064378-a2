import { mockCourses, mockTutors, mockUsers } from "../mockData/mockData";
import {
  COURSE_LOCAL_STORAGE_KEY,
  TUTOR_LOCAL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY,
} from "./constant";

export const addMockDataToLocalStorage = () => {
  const users = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  const tutors = localStorage.getItem(TUTOR_LOCAL_STORAGE_KEY);
  const courses = localStorage.getItem(COURSE_LOCAL_STORAGE_KEY);

  if (!users)
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(mockUsers));
  if (!tutors)
    localStorage.setItem(TUTOR_LOCAL_STORAGE_KEY, JSON.stringify(mockTutors));
  if (!courses)
    localStorage.setItem(COURSE_LOCAL_STORAGE_KEY, JSON.stringify(mockCourses));
};
