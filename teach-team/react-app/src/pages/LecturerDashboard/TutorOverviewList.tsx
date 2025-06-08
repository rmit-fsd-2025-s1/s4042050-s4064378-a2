import React from "react";
import { Tutor } from "../../types/Tutor";
import TutorOverviewCard from "./TutorOverviewCard";
import { TutorOverviewGrid } from "./styles/Layout";

interface Props {
  tutors: Tutor[]; // List of tutors to display (may include duplicates)
}

const TutorOverviewList: React.FC<Props> = ({ tutors }) => {
  // Remove duplicate tutors by their unique `id`
  const uniqueTutors = Array.from(new Map(tutors.map(t => [t.id, t])).values());

  // Display fallback message if no tutors are found
  if (uniqueTutors.length === 0) {
    return <p className="text-gray-500 text-center mt-6">No Tutors found.</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: uniqueTutors.length === 1 ? "center" : "flex-start", // Center if only 1 tutor
        width: "100%",
      }}
    >
      <TutorOverviewGrid
        style={{ width: uniqueTutors.length === 1 ? "500px" : "100%" }} // Reduce width if one card
      >
        {/* Render an overview card for each unique tutor */}
        {uniqueTutors.map(tutor => (
          <TutorOverviewCard key={tutor.id} tutor={tutor} />
        ))}
      </TutorOverviewGrid>
    </div>
  );
};

export default TutorOverviewList;
