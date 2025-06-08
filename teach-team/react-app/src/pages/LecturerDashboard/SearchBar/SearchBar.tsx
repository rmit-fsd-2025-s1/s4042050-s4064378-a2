import React from "react";
import { Input } from "../styles/Shared"; // Styled input component

// Props expected from parent component
interface Props {
  onChange: (value: string) => void; // Function to call when input changes
  value: string; // Current search input value
}

// Search bar component for filtering tutor applications
const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      value={value} // Bind input to passed value
      placeholder="Search by tutor course, name, skills, availability, ..."
      onChange={(e) => onChange(e.target.value)} // Trigger parent handler on change
    />
  );
};

export default SearchBar;
