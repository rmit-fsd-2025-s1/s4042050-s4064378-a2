import { Tutor } from "../types/Tutor";
import { TUTOR_LOCAL_STORAGE_KEY } from "./constant";

export const updateTutor = (tutor: Tutor) => {
  const data = localStorage.getItem(TUTOR_LOCAL_STORAGE_KEY);

  if (!data) {
    localStorage.setItem(TUTOR_LOCAL_STORAGE_KEY, JSON.stringify([tutor]));
    return;
  }

  const tutors = JSON.parse(data);
  if (Array.isArray(tutors)) {
    const updateList = tutors.reduce((ls: Tutor[], acc: Tutor) => {
      if (acc.email.toLowerCase() === tutor.email.toLowerCase()) {
        return [...ls, tutor];
      }
      return [...ls, acc];
    }, [] as Tutor[]);

    localStorage.setItem(TUTOR_LOCAL_STORAGE_KEY, JSON.stringify(updateList));
    return;
  }
};
