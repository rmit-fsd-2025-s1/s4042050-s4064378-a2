import React from "react";
import { TutorApplication } from "../../../types/Tutor";
import SummaryCardContainer from "./SelectionSummaryContainer";

interface Props {
  most: TutorApplication[];
  least: TutorApplication[];
  unselected: TutorApplication[];
}

const SelectionSummaryView: React.FC<Props> = ({ most, least, unselected }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <SummaryCardContainer title="Most Chosen Applicant" tutors={most} />
      <SummaryCardContainer title="Least Chosen Applicant" tutors={least} />
      <SummaryCardContainer title="Unselected Applicants" tutors={unselected} />
    </div>
  );
};

export default SelectionSummaryView;
