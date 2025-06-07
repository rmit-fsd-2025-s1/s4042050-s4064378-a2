import React from "react";
import { TutorApplication } from "../../../types/Tutor";
import SummaryCard from "./SummaryCard";

interface Props {
  most: TutorApplication[];
  least: TutorApplication[];
  unselected: TutorApplication[];
}

const SelectionSummaryView: React.FC<Props> = ({ most, least, unselected }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <SummaryCard title="Most Chosen Applicant" tutors={most} />
      <SummaryCard title="Least Chosen Applicant" tutors={least} />
      <SummaryCard title="Unselected Applicants" tutors={unselected} />
    </div>
  );
};

export default SelectionSummaryView;
