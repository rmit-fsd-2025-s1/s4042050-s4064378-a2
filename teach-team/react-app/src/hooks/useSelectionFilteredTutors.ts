import { useMemo } from "react";
import { Tutor, TutorApplication } from "../types/Tutor";

// Hook to filter Tutors based on most selected, least selected, or unselected
export const useSelectionFilteredTutors = (
  TutorApplicants: Tutor[],
  selectionType: "most" | "least" | "unselected"
): TutorApplication[] => {
  return useMemo(() => {
    const tutorSelectionMap = new Map<number, number>();

    // Count accepted applications per tutor
    TutorApplicants.forEach((tutor) => {
      const count =
        tutor.appliedRoles?.filter((r) => r.status === "accepted").length ?? 0;
      tutorSelectionMap.set(tutor.id, count);
    });

    // Determine most and least selected tutor IDs
    let mostSelectedTutorId = -1;
    let leastSelectedTutorId = -1;
    let maxCount = -1;
    let minCount = Infinity;

    tutorSelectionMap.forEach((count, id) => {
      if (count > maxCount) {
        maxCount = count;
        mostSelectedTutorId = id;
      }
      if (count > 0 && count < minCount) {
        minCount = count;
        leastSelectedTutorId = id;
      }
    });

    // Filter tutors by selection type
    const filtered = TutorApplicants.filter((tutor) => {
      const count = tutorSelectionMap.get(tutor.id) ?? 0;
      if (selectionType === "most") return tutor.id === mostSelectedTutorId;
      if (selectionType === "least") return tutor.id === leastSelectedTutorId;
      if (selectionType === "unselected") return count === 0;
      return false;
    });

    // Flatten each tutor into TutorApplication objects (one per applied role)
    return filtered.flatMap((tutor) =>
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
  }, [TutorApplicants, selectionType]);
};
