import React from "react";
import { SortOption } from "../../../types/sortTypes";
import { Select } from "../styles/Shared";

interface Props {
  onChange: (value: SortOption) => void;
  selectedCourseId: string;
  disabled: boolean;
  value: SortOption;
 
}
//This option is disable if one if the corse is selected in the course filter
const SortByCourseOrAvailability: React.FC<Props> = ({ value, onChange, disabled, selectedCourseId }) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      disabled={disabled}
    >
      <option value="availability">Sort by Availability</option>
      <option value="course" disabled={selectedCourseId !== "all"}>
        Sort by Course
      </option>
    </Select>

  );
};

export default SortByCourseOrAvailability;
