import React from "react";
import TutorCard from "./tutorCard";
import { Tutor, TutorRole } from "../../types/Tutor";
import { loadTutors, saveTutors } from "../../util/localStorage";
import { Grid , TutList} from "./styles/Layout";
import { TutorApplication } from "../../types/Tutor"



interface Props {
  // When displaying tutors in tutor card TutorApplication type is used.
  // Since we have to filter tutors based on course, in this data structure tutors are flatten
  // to applied courses
  tutors: TutorApplication[];
}

const TutorList: React.FC<Props> = ({ tutors }) => {
  if (tutors.length === 0) {
    return (
      <p className="text-gray-600 text-center mt-7">No Tutors found</p>
    );
  }
  
  // This function is passed to tutor card 
  // This is used to save the updated tutors
  const handleUpdate = (update: { id: string; updatedRole: TutorRole }) => {
    const tutors = loadTutors();

    const updatedList = tutors.map((t) => {
      if (t.id === update.id) {
        const newRoles =
          t.appliedRoles?.map((role) =>
            role.courseId === update.updatedRole.courseId
              ? update.updatedRole
              : role
          ) ?? [];

        return {
          ...t,
          appliedRoles: newRoles,
        };
      }
      return t;
    });
    
    //Save the tutors to Local Storage
    saveTutors(updatedList);
    
  };

  return (
    <TutList>
    <Grid>
      {tutors.map((tutorApp, index) => (
        <TutorCard
          key={`${tutorApp.id}-${tutorApp.course}-${index}`}
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
