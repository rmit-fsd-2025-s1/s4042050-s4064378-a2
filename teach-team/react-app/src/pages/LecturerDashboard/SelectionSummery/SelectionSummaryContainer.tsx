import React from "react";
import { Tutor } from "../../../types/Tutor";
import { TutorApplication } from "../../../types/Tutor";
import { filterTutorsBySelectionType } from "../../../util/tutorSelection";
import SelectionSummaryView from "./SelectionSummaryView";

interface Props {
  applicants: Tutor[];
}

const SelectionSummaryContainer: React.FC<Props> = ({ applicants }) => {
  const most = filterTutorsBySelectionType(applicants, "most");
  const least = filterTutorsBySelectionType(applicants, "least");
  const unselected = filterTutorsBySelectionType(applicants, "unselected");

  return (
    <SelectionSummaryView
      most={most}
      least={least}
      unselected={unselected}
    />
  );
};

export default SelectionSummaryContainer;
