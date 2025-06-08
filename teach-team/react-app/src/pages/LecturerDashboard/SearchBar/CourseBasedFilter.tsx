import React, { useEffect, useState } from "react";
import { Select } from "../styles/Shared"; // Styled dropdown component
import axios from "axios";
import { getCurrentUser } from "../../../util/localStorage"; // Utility to get the logged-in user

// Interface representing a course object
interface Course {
  id: number;
  code: string;
  name: string;
}

// Props expected from parent component
interface Props {
  value: string; // Currently selected course id
  onChange: (value: string) => void; // Handler when selection changes
  disabled: boolean; // Whether the dropdown is disabled
}

// Read base URL from environment variable
const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

// Dropdown filter component for selecting course
const CourseBasedFilter: React.FC<Props> = ({ value, onChange, disabled }) => {
  const [courses, setCourses] = useState<Course[]>([]); // Local state to store fetched courses

  // Fetch course list based on current user on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const currentUser = getCurrentUser(); // Get currently logged-in user
        const userId = currentUser?.id;

        if (!userId) {
          console.error("User ID not found in current user");
          return;
        }

        // Fetch courses associated with the user
        const response = await axios.get(`${BASE_URL}/courses/by-user/${userId}`);
        setCourses(response.data); // Update state with fetched courses
      } catch (error) {
        console.error("Error loading courses by user ID:", error);
      }
    };

    fetchCourses(); // Invoke fetch logic
  }, []); // Empty dependency array means this runs once on mount

  return (
    <Select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)} // Call parent's onChange when user selects a course
    >
      {/* Default option to show all courses */}
      <option value="all">All Courses</option>

      {/* Dynamically populate dropdown with fetched courses */}
      {courses.map((course) => (
        <option key={course.id} value={course.id.toString()}>
          {course.name} ({course.code})
        </option>
      ))}
    </Select>
  );
};

export default CourseBasedFilter;
