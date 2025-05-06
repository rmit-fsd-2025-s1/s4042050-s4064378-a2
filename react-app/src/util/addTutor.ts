import { Tutor } from "../types/Tutor";
import { TUTOR_LOCAL_STORAGE_KEY } from "./constant";

export const addTutor = (tutor: Tutor) => {
  const data = localStorage.getItem(TUTOR_LOCAL_STORAGE_KEY);

  if (!data) {
    localStorage.setItem(TUTOR_LOCAL_STORAGE_KEY, JSON.stringify([tutor]));
    return;
  }

  const tutors = JSON.parse(data);
  if (Array.isArray(tutors)) {
    localStorage.setItem(
      TUTOR_LOCAL_STORAGE_KEY,
      JSON.stringify([...tutors, tutor])
    );
    return;
  }
  return null;
};
