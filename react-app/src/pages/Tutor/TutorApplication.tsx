import React, { useState } from "react";
import { Course, Tutor } from "../../types/Tutor";
import {
  CoursesList,
  CurrentSemesterCourses,
  FormGroupWrapper,
  RadioGroup,
  SubmitButton,
  TutorApplicationHeading,
  TutorApplicationSubHeading,
} from "./element";
import { ErrorMessage } from "../../components/ActivityStatus/ErrorMessage";
import { Popup } from "../../components/Popup";

/**
 * Displays available courses and allows tutors to apply for positions.
 *
 * @param courses - List of available courses to apply for
 * @param onApply - Callback when applying to a course (returns course ID and role)
 * @param tutorProfile - Current tutor's profile data (null if not loaded)
 */

interface TutorApplicationProps {
  courses: Course[];
  onApply: (courseId: string, role: "tutor" | "lab-assistant") => void;
  tutorProfile: Tutor | null;
}

const TutorApplication: React.FC<TutorApplicationProps> = ({
  courses,
  onApply,
  tutorProfile,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<"tutor" | "lab-assistant">(
    "tutor"
  );
  const [error, setError] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // input validation
    if (!selectedCourse) {
      setError("Please select a course");
      return;
    }

    onApply(selectedCourse, selectedRole);

    setIsPopupOpen(true);
    setPopupMessage("Course Added Successfully!");

    // Reset form
    setSelectedCourse("");
    setError("");
  };

  return (
    <div>
      <TutorApplicationHeading>
        Apply for Tutor/Lab Assistant Roles
      </TutorApplicationHeading>
      <TutorApplicationSubHeading>
        Select from available courses for the current semester
      </TutorApplicationSubHeading>

      <form onSubmit={handleSubmit}>
        <FormGroupWrapper>
          <label htmlFor="course">Course:</label>
          <select
            id="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option
                key={course.id}
                value={course.id}
                disabled={Boolean(
                  tutorProfile?.appliedRoles?.find(
                    (d) => d.courseId === course.id
                  )
                )}
              >
                {course.code} -{" "}
                {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
              </option>
            ))}
          </select>
        </FormGroupWrapper>

        <FormGroupWrapper>
          <label htmlFor="role">Role:</label>
          <RadioGroup>
            <label>
              <input
                type="radio"
                name="role"
                value="tutor"
                checked={selectedRole === "tutor"}
                onChange={() => setSelectedRole("tutor")}
              />
              Tutor
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="lab-assistant"
                checked={selectedRole === "lab-assistant"}
                onChange={() => setSelectedRole("lab-assistant")}
              />
              Lab Assistant
            </label>
          </RadioGroup>
        </FormGroupWrapper>

        {error && <ErrorMessage message={error} />}

        <SubmitButton type="submit">Apply</SubmitButton>
      </form>

      <CurrentSemesterCourses>
        <h3>Available Courses</h3>
        <CoursesList>
          {courses.map((course) => (
            <li key={course.id}>
              <strong>{course.code}</strong> -{" "}
              {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
            </li>
          ))}
        </CoursesList>
      </CurrentSemesterCourses>
      <Popup
        isOpen={isPopupOpen}
        message={popupMessage}
        setIsOpen={setIsPopupOpen}
      />
    </div>
  );
};

export default TutorApplication;
