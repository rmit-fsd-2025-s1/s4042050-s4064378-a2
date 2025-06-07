import React, { useEffect, useState } from "react";
import { Select } from "../styles/Shared";
import axios from "axios";

interface Course {
  id: number;
  code: string;
  name: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const CourseBasedFilter: React.FC<Props> = ({ value, onChange, disabled }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/teach_team/courses`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error loading courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">All Courses</option>
      {courses.map((course) => (
        <option key={course.id} value={course.id.toString()}>
          {course.name} ({course.code})
        </option>
      ))}
    </Select>
  );
};

export default CourseBasedFilter;
