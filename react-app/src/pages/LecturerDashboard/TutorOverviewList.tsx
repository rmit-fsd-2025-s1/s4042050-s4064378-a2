import React from "react";
import { Tutor } from "../../types/Tutor";
import TutorOverviewCard from "./TutorOverviewCard";
import { TutorOverviewGrid } from "./styles/Layout";

interface Props {
  tutors: Tutor[];
}
// When the user select most selected tutor, least selected tutor or not selected tutor this
// Component is used
const TutorOverviewList: React.FC<Props> = ({ tutors }) => {
  const filteredTutors = Array.from(
    new Map(tutors.map((t) => [t.id, t])).values()
  );

  if (filteredTutors.length === 0) {
    return <p className="text-gray-500 text-center mt-6">No Tutors found.</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: filteredTutors.length === 1 ? "center" : "flex-start",
        width: "100%",
      }}
    >
      <TutorOverviewGrid
        style={{ width: filteredTutors.length === 1 ? "500px" : "100%" }}
      >
        {filteredTutors.map((tutor) => (
          <TutorOverviewCard key={tutor.id} tutor={tutor} />
        ))}
      </TutorOverviewGrid>
    </div>
  );
};

export default TutorOverviewList;
