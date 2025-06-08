import React from "react";
import axios from "axios";
import TutorCard from "./tutorCard";
import { Grid, TutList } from "./styles/Layout";
import { TutorApplication, TutorRole } from "../../types/Tutor";

interface Props {
  tutors: TutorApplication[];
  refreshTutors: () => void; // ✅ Add refresh function as prop
}

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

const TutorList: React.FC<Props> = ({ tutors, refreshTutors }) => {
  if (tutors.length === 0) {
    return <p className="text-gray-600 text-center mt-7">No Tutors found</p>;
  }

  // Save updated tutor role to backend and then refresh
  const handleUpdate = async (update: {
    id: number;
    updatedRole: TutorRole;
  }) => {
    try {
      await axios.patch(
        `${BASE_URL}/applications/${update.id}`,
        {
          role: update.updatedRole.role,
          courseId: update.updatedRole.course.id,
          comment: update.updatedRole.comment,
          rank:
            update.updatedRole.status === "accepted"
              ? update.updatedRole.rank
              : 0,
          status: update.updatedRole.status,
        }
      );
      console.log("Application updated successfully");
      refreshTutors(); // ✅ Refetch tutor data after update
    } catch (err) {
      console.error("Failed to update tutor application", err);
    }
  };

  return (
    <TutList>
      <Grid>
        {tutors.map((tutorApp, index) => (
          <TutorCard
            key={`${tutorApp.id}-${tutorApp.appliedRole.course.id}-${index}`}
            tutor={tutorApp}
            allTutors={tutors}
            onUpdate={handleUpdate}
          />
        ))}
      </Grid>
    </TutList>
  );
};

export default TutorList;
