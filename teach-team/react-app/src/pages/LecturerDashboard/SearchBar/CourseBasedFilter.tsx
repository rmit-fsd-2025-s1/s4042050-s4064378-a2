import React, { useEffect, useState } from "react";
import { Select } from "../styles/Shared";
import axios from "axios";
import { getCurrentUser } from "../../../util/localStorage"; 

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

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

const CourseBasedFilter: React.FC<Props> = ({ value, onChange, disabled }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const currentUser = getCurrentUser();
        const userId = currentUser?.id;

        if (!userId) {
          console.error("User ID not found in current user");
          return;
        }

        const response = await axios.get(
          `${BASE_URL}/teach_team/courses/by-user/${userId}`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error loading courses by user ID:", error);
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
