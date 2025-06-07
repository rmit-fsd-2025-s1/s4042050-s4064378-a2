import React from "react";
import { Tutor } from "../../types/Tutor";
import TutorOverviewCard from "./TutorOverviewCard";
import { TutorOverviewGrid } from "./styles/Layout";

interface Props {
  tutors: Tutor[];
}

const TutorOverviewList: React.FC<Props> = ({ tutors }) => {
  // Remove duplicate tutors by ID
  const uniqueTutors = Array.from(new Map(tutors.map(t => [t.id, t])).values());

  if (uniqueTutors.length === 0) {
    return <p className="text-gray-500 text-center mt-6">No Tutors found.</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: uniqueTutors.length === 1 ? "center" : "flex-start",
        width: "100%",
      }}
    >
      <TutorOverviewGrid
        style={{ width: uniqueTutors.length === 1 ? "500px" : "100%" }}
      >
        {uniqueTutors.map(tutor => (
          <TutorOverviewCard key={tutor.id} tutor={tutor} />
        ))}
      </TutorOverviewGrid>
    </div>
  );
};

export default TutorOverviewList;
