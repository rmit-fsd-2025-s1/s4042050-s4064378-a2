import { Tutor, TutorApplication } from "../types/Tutor";

/**
 * Filters tutors by selection type:
 * - "most": tutor with the highest number of accepted roles
 * - "least": tutor with the lowest non-zero number of accepted roles
 * - "unselected": tutors with zero accepted roles
 */
export const filterTutorsBySelectionType = (
  TutorApplicants: Tutor[],
  selectionType: "most" | "least" | "unselected"
): TutorApplication[] => {
  const selectionCountMap = new Map<number, number>();

  // Count accepted applications per tutor
  TutorApplicants.forEach((tutor) => {
    const count = tutor.appliedRoles?.filter((r) => r.status === "accepted").length ?? 0;
    selectionCountMap.set(tutor.id, count);
  });

  let mostId = -1;
  let leastId = -1;
  let max = -1;
  let min = Infinity;

  // Identify most and least selected tutors
  selectionCountMap.forEach((count, id) => {
    if (count > max) {
      max = count;
      mostId = id;
    }
    if (count > 0 && count < min) {
      min = count;
      leastId = id;
    }
  });

  // Filter tutors based on type
  const matched = TutorApplicants.filter((tutor) => {
    const count = selectionCountMap.get(tutor.id) ?? 0;
    if (selectionType === "most") return tutor.id === mostId;
    if (selectionType === "least") return tutor.id === leastId;
    if (selectionType === "unselected") return count === 0;
    return false;
  });

  // Flatten into TutorApplication array
  return matched.flatMap((tutor) =>
    tutor.appliedRoles.map((role) => ({
      id: tutor.id,
      firstName: tutor.firstName,
      lastName: tutor.lastName,
      email: tutor.email,
      skills: tutor.skills,
      availability: tutor.availability,
      appliedRole: role,
      rank: role.rank ?? 0,
    }))
  );
};
