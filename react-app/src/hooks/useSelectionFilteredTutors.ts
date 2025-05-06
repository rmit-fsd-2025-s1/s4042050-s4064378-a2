import { useMemo } from "react";
import { Tutor, TutorApplication } from "../types/Tutor";

// Hook to filter Tutors based on most selected, lease selected not selected
export const useSelectionFilteredTutors = (
  TutorApplicants: Tutor[],
  selectionType: "most" | "least" | "unselected"
): TutorApplication[] => {
  return useMemo(() => {
    const tutorSelectionMap = new Map<string, number>();
    
    // New data structure (tutorSelectionMap) is created which store tutor id and how many times 
    // that tutor is slected
    TutorApplicants.forEach((tutor) => {
      const count = tutor.appliedRoles?.filter((r) => r.status === "accepted").length ?? 0;
      tutorSelectionMap.set(tutor.id, count);
    });
    
    // USing the tutorSelectionMap reuried user are filtered
    let mostSelectedTutorId = "";
    let leastSelectedTutorId = "";
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

    return TutorApplicants
      .filter((tutor) => {
        const count = tutorSelectionMap.get(tutor.id) ?? 0;
        if (selectionType === "most") return tutor.id === mostSelectedTutorId;
        if (selectionType === "least") return tutor.id === leastSelectedTutorId;
        if (selectionType === "unselected") return count === 0;
        return false;
      })
      .map((t) => {
        const role = t.appliedRoles?.[0];
        return {
          ...t,
          rank: role?.rank ?? 0,
          appliedRole: role!,
          status: role?.status ?? "pending",
          course: role?.courseId ?? "",
        };
      });
  }, [TutorApplicants, selectionType]);
};
