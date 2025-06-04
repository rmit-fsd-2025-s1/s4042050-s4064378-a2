import React from "react";
import axios from "axios";
import TutorCard from "./tutorCard";
import { Grid, TutList } from "./styles/Layout";
import { TutorApplication, TutorRole } from "../../types/Tutor";

interface Props {
  tutors: TutorApplication[];
}

const TutorList: React.FC<Props> = ({ tutors }) => {
  if (tutors.length === 0) {
    return <p className="text-gray-600 text-center mt-7">No Tutors found</p>;
  }

  // Save updated tutor role to backend
  const handleUpdate = async (update: {
    id: number;
    updatedRole: TutorRole;
  }) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/tech_team/applications/${update.id}`,
        {
          role: update.updatedRole.role,
          courseId: update.updatedRole.course.id, // course is now inside appliedRole
          comment: update.updatedRole.comment,
          rank:
            update.updatedRole.status === "accepted"
              ? update.updatedRole.rank
              : 0,
          status: update.updatedRole.status,
        }
      );
      console.log("Application updated successfully");
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
