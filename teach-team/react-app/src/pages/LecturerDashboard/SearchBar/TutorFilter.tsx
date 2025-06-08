import React from "react";
import { Select } from "../styles/Shared"; // Reusable styled dropdown component

// Props expected from the parent component
interface Props {
  value: string; // Currently selected filter value
  onChange: (value: string) => void; // Callback when selection changes
}

// Dropdown to filter tutor applications based on selection frequency/status
const TutorFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Select
      value={value} // Bind dropdown to current filter value
      onChange={(e) => onChange(e.target.value)} // Notify parent on change
    >
      {/* Default option to show all applicants */}
      <option value="all">All Selection States</option>

      {/* Filter to show tutors chosen most frequently */}
      <option value="most">Most Chosen Applicant</option>

      {/* Filter to show tutors chosen the least */}
      <option value="least">Least Chosen Applicant</option>

      {/* Filter to show tutors who were not selected at all */}
      <option value="unselected">Not Selected Applicants</option>
    </Select>
  );
};

export default TutorFilter;
