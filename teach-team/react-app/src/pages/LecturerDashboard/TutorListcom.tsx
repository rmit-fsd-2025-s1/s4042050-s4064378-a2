import React from "react";
import axios from "axios";
import TutorCard from "./tutorCard";
import { Grid, TutList } from "./styles/Layout";
import { TutorApplication, TutorRole } from "../../types/Tutor";

// Props passed from parent
interface Props {
  tutors: TutorApplication[];       // Filtered or complete list of tutor applications
  refreshTutors: () => void;        // Callback to reload tutor list after updates
}

// Get backend base URL from environment config
const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const TutorList: React.FC<Props> = ({ tutors, refreshTutors }) => {
  // Show fallback message if no tutor data
  if (tutors.length === 0) {
    return <p className="text-gray-600 text-center mt-7">No Tutors found</p>;
  }

  // Handle updates to individual tutor application (status, rank, comment)
  const handleUpdate = async (update: {
    id: number;
    updatedRole: TutorRole;
  }) => {
    try {
      // Send PATCH request to backend with updated role details
      await axios.patch(
        `${BASE_URL}/applications/${update.id}`,
        {
          role: update.updatedRole.role,
          courseId: update.updatedRole.course.id,
          comment: update.updatedRole.comment,
          rank: update.updatedRole.status === "accepted" ? update.updatedRole.rank : 0,
          status: update.updatedRole.status,
        }
      );
      console.log("Application updated successfully");

      // After successful update, refresh tutor data to reflect changes
      refreshTutors();
    } catch (err) {
      console.error("Failed to update tutor application", err);
    }
  };

  return (
    <TutList>
      <Grid>
        {/* Render each tutor's application card */}
        {tutors.map((tutorApp, index) => (
          <TutorCard
            key={`${tutorApp.id}-${tutorApp.appliedRole.course.id}-${index}`} // Ensure unique key
            tutor={tutorApp}              // Pass tutor application object
            allTutors={tutors}            // Needed for duplicate rank validation
            onUpdate={handleUpdate}       // Handler to save updates
          />
        ))}
      </Grid>
    </TutList>
  );
};

export default TutorList;
