import React from "react";
import { SortOption } from "../../../types/sortTypes";
import { Select } from "../styles/Shared"; // Styled dropdown component

// Props expected from the parent component
interface Props {
  onChange: (value: SortOption) => void; // Callback when selection changes
  selectedCourseId: string; // Current selected course ID (to determine option disabling)
  disabled: boolean; // Whether the whole dropdown is disabled
  value: SortOption; // Current selected sorting option
}

// Component for sorting tutor applications by either availability or course
// Note: "Sort by Course" is disabled if a specific course is selected
const SortByCourseOrAvailability: React.FC<Props> = ({
  value,
  onChange,
  disabled,
  selectedCourseId,
}) => {
  return (
    <Select
      value={value} // Current selected value
      onChange={(e) => onChange(e.target.value as SortOption)} // Trigger parent callback on change
      disabled={disabled} // Disable entire dropdown if needed
    >
      {/* Option to sort tutors by their availability */}
      <option value="availability">Sort by Availability</option>

      {/* Option to sort by course, only enabled when 'All Courses' is selected */}
      <option value="course" disabled={selectedCourseId !== "all"}>
        Sort by Course
      </option>
    </Select>
  );
};

export default SortByCourseOrAvailability;
