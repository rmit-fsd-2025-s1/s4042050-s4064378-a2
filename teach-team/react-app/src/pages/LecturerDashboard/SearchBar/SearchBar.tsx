import React from "react";
import { Input } from "../styles/Shared";

interface Props {
  onChange: (value: string) => void;
  value: string;
  
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      value={value}
      placeholder="Search by tutor course, name,skills, availability, ..."
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
