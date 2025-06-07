import React from "react";
import { Select } from "../styles/Shared";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

// Drop down to filter the user based on most selected, lease selected and not selected tutors
const TutorFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">All Selection States</option>
      <option value="most">Most Chosen Applicant</option>
      <option value="least">Least Chosen Applicant</option>
      <option value="unselected">Not Selected Applicants</option>
    </Select>

  );
};

export default TutorFilter;
