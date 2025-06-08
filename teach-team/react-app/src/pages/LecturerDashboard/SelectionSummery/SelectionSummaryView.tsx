import React from "react";
import { TutorApplication } from "../../../types/Tutor";
import SummaryCardContainer from "./SelectionSummaryContainer";

interface Props {
  most: TutorApplication[];
  least: TutorApplication[];
  unselected: TutorApplication[];
}

/**
 * SelectionSummaryView Component
 *
 * Architectural Note:
 * --------------------
 * This component handles **layout composition** and **view orchestration** only.
 *
 * - It organizes the summary views by category (most/least/unselected)
 * - It delegates data transformation to `SummaryCardContainer`
 * - It further delegates rendering to `SummaryCard` (deepest presentation layer)
 *
 * This layered decomposition supports:
 * - Clear separation of concerns: layout vs. transformation vs. rendering
 * - Better scalability for future changes in layout or data logic
 * - Easier testing and maintenance
 */

const SelectionSummaryView: React.FC<Props> = ({ most, least, unselected }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* High-level layout with specialized data slices passed down */}
      <SummaryCardContainer title="Most Chosen Applicant" tutors={most} />
      <SummaryCardContainer title="Least Chosen Applicant" tutors={least} />
      <SummaryCardContainer title="Unselected Applicants" tutors={unselected} />
    </div>
  );
};

export default SelectionSummaryView;
