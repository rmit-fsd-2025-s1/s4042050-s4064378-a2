import React from "react";
import { mockCourses } from "../../../mockData/mockData";
import { Select } from "../styles/Shared";

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

//Drop down  for courses
const CourseBasedFilter: React.FC<Props> = ({ value, onChange, disabled }) => {
  return (
    <Select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
     
    >
      <option value="all">All Courses</option>
      {mockCourses.map((course) => (
        <option key={course.id} value={course.id}>
          {course.name} ({course.code})
        </option>
      ))}
    </Select>

  );
};

export default CourseBasedFilter;
