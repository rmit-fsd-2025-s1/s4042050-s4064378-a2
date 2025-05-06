import { Tutor, TutorApplication } from "../types/Tutor";
import { TUTOR_LOCAL_STORAGE_KEY } from "./constant";

export const getTutorByEmail = (email: string): Tutor | null => {
  const data = localStorage.getItem(TUTOR_LOCAL_STORAGE_KEY);

  if (!data) return null;

  const tutorList = JSON.parse(data);
  if (Array.isArray(tutorList)) {
    return tutorList.find(
      (tutor) => tutor.email.toLowerCase() === email.toLocaleLowerCase()
    );
  }
  return null;
};

export const flattenTutors = (tutors: Tutor[]): TutorApplication[] => {
  const applicant: TutorApplication[] = [];
  tutors.forEach((tutor) => {
    tutor.appliedRoles?.forEach((role) => {
      applicant.push({
        ...tutor,
        rank: role.rank ?? 0,
        appliedRole: role,
        status: role.status,
        course: role.courseId,
     
      });
    });
  });
  return applicant;
};

