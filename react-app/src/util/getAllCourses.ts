import { Course } from "../types/Tutor";
import { COURSE_LOCAL_STORAGE_KEY } from "./constant";

export const getAllCourses = (): Course[] => {
  const data = localStorage.getItem(COURSE_LOCAL_STORAGE_KEY);

  if (!data) {
    return [];
  }

  const courses = JSON.parse(data);
  if (Array.isArray(courses)) {
    return courses;
  }

  return [];
};
