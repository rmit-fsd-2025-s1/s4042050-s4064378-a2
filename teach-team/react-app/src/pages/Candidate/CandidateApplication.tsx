import React, { useEffect, useState } from "react";
import { Candidate } from "../../types/Candidate";
import { Course } from "../../types/Course";
import {
  CoursesList,
  CurrentSemesterCourses,
  FormGroupWrapper,
  RadioGroup,
  SubmitButton,
  CandidateApplicationHeading,
  CandidateApplicationSubHeading,
} from "./element";
import { ErrorMessage } from "../../components/ActivityStatus/ErrorMessage";
import { Popup } from "../../components/Popup";
import { courseApi } from "../../services/courseApi";
import styled from "styled-components";
import { applicationApi } from "../../services/applicationApi";
import { rolesApi } from "../../services/rolesApi";
import { Role } from "../../types/Role";
import { getCurrentUser } from "../../util/localStorage";
import { Application } from "../../types/Application";

// Styled Components
const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  width: 200px !important;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 5px;
`;

const Button = styled.button<{ warning?: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.warning ? "#e74c3c" : "#3498db")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background-color: ${(props) => (props.warning ? "#c0392b" : "#2980b9")};
  }
`;

const ListItem = styled.div`
  margin-top: 0.25rem;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  width: fit-content;
  margin-right: 5px;
`;

/**
 * CandidateApplication Component
 *
 * A form component that allows candidates to apply for tutor/lab assistant positions.
 * Handles course selection, role preference, availability, skills, and academic credentials.
 * Manages form state, validation, and submission to the backend API.
 *

 */

const CandidateApplication: React.FC = () => {
  // Form state management
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedAvailavility, setSelectedAvailability] = useState<
    "part-time" | "full-time"
  >("part-time");
  const [error, setError] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Data state management
  const [courses, setCourses] = useState<Course[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [previousRoles, setPreviousRoles] = useState([
    { course: "", role: "" },
  ]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [credentials, setCredentials] = useState([
    { degree: "", institution: "", year: "" },
  ]);

  /**
   * Handles form submission for application
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter.name;

    if (submitter !== "apply") return;

    // Input validation
    if (!selectedCourse) {
      setError("Please select a course");
      return;
    }

    // Check for duplicate applications
    const alreadyApplied = applications.some(
      (application) =>
        application.course.id === +selectedCourse &&
        application.role.id === +selectedRole
    );

    if (alreadyApplied) {
      setError("You have already applied for this role in the selected course");
      return;
    }

    try {
      // Submit application to API
      await applicationApi.create({
        availability: selectedAvailavility,
        credentials,
        previousRoles,
        status: "pending",
        role: roles.find((r) => r.id === +selectedRole),
        course: courses.find((c) => c.id === +selectedCourse),
        candidate: getCurrentUser()?.candidate,
        skills,
      });

      // Refresh applications
      fetchApplicationsByCandidateId();

      // Reset form and show success message
      setIsPopupOpen(true);
      setPopupMessage("Application Submitted Successfully!");
      resetForm();
    } catch (error) {
      setError(String(error));
    }
  };

  /**
   * Resets all form fields to their initial state
   */
  const resetForm = () => {
    setSelectedCourse("");
    setSelectedRole("");
    setPreviousRoles([]);
    setCredentials([]);
    setSkills([]);
    setError("");
    setNewSkill("");
  };

  /**
   * Fetches all available courses from API
   */
  const fetchAllCourses = async () => {
    try {
      const coursesResult = await courseApi.getAllCourses();
      setCourses(coursesResult);
    } catch (error) {
      setError(String(error));
    }
  };

  /**
   * Fetches all available roles from API
   */
  const fetchAllRoles = async () => {
    try {
      const rolesResult = await rolesApi.getAll();
      setRoles(rolesResult);
    } catch (error) {
      setError(String(error));
    }
  };

  /**
   * Fetches all applications for the current candidate
   */
  const fetchApplicationsByCandidateId = async () => {
    try {
      const currentUser = getCurrentUser();
      if (!currentUser?.candidate?.id) return;

      const applicationsResult =
        await applicationApi.getApplicationsByCandidateId(
          currentUser.candidate.id
        );
      setApplications(applicationsResult);
    } catch (error) {
      setError(String(error));
    }
  };

  /**
   * Handles changes to previous roles fields
   * @param {number} index - Index of the role being edited
   * @param {string} field - Field name being changed
   * @param {string} value - New field value
   */
  const handleRoleChange = (index: number, field: string, value: string) => {
    const updated = [...previousRoles];
    updated[index][field as keyof (typeof updated)[0]] = value;
    setPreviousRoles(updated);
  };

  /**
   * Adds a new empty previous role field
   */
  const handleAddRole = () => {
    setPreviousRoles([...previousRoles, { course: "", role: "" }]);
  };

  /**
   * Removes a previous role field
   * @param {React.MouseEvent} e - Click event
   * @param {number} index - Index of role to remove
   */
  const removeRoles = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    setPreviousRoles((prevRoles) => prevRoles.filter((_, i) => i !== index));
  };

  /**
   * Removes a credential field
   * @param {React.MouseEvent} e - Click event
   * @param {number} index - Index of credential to remove
   */
  const removeCredentials = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    setCredentials((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Adds a new skill to the skills list
   */
  const handleAddSkill = () => {
    const skill = newSkill.trim().toLowerCase();
    if (!skill) {
      setError("Empty Skill");
      return;
    }
    if (skills.includes(skill)) {
      setError("Duplicate entry");
      return;
    }
    setSkills([...skills, skill]);
    setNewSkill("");
    setError("");
  };

  /**
   * Handles changes to credential fields
   * @param {number} index - Index of the credential being edited
   * @param {string} field - Field name being changed
   * @param {string} value - New field value
   */
  const handleCredentialChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...credentials];
    updated[index][field as keyof (typeof updated)[0]] = value;
    setCredentials(updated);
  };

  /**
   * Adds a new empty credential field
   */
  const handleAddCredential = () => {
    setCredentials([...credentials, { degree: "", institution: "", year: "" }]);
  };

  // Fetch initial data on component mount
  useEffect(() => {
    fetchAllCourses();
    fetchAllRoles();
    fetchApplicationsByCandidateId();
  }, []);

  return (
    <div>
      {/* Application Header */}
      <CandidateApplicationHeading>
        Apply for Tutor/Lab Assistant Roles
      </CandidateApplicationHeading>
      <CandidateApplicationSubHeading>
        Select from available courses for the current semester
      </CandidateApplicationSubHeading>

      {/* Main Application Form */}
      <form onSubmit={handleSubmit}>
        {/* Course Selection */}
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
              <option key={course.id} value={course.id}>
                {course.code} -{" "}
                {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
              </option>
            ))}
          </select>
        </FormGroupWrapper>

        {/* Role Selection */}
        <FormGroupWrapper>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            required
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </FormGroupWrapper>

        {/* Availability Selection */}
        <FormGroupWrapper>
          <label htmlFor="availability">Availability:</label>
          <RadioGroup>
            <label>
              <input
                type="radio"
                name="availability"
                value="availability"
                checked={selectedAvailavility === "part-time"}
                onChange={() => setSelectedAvailability("part-time")}
              />
              Part Time
            </label>
            <label>
              <input
                type="radio"
                name="availability"
                value="availability"
                checked={selectedAvailavility === "full-time"}
                onChange={() => setSelectedAvailability("full-time")}
              />
              Full Time
            </label>
          </RadioGroup>
        </FormGroupWrapper>

        {/* Previous Roles Section */}
        <FormGroupWrapper>
          <label htmlFor="role">Previous Roles:</label>
          {previousRoles.map((role, index) => (
            <FieldGroup key={index}>
              <div>
                <Input
                  placeholder="Course"
                  value={role.course}
                  onChange={(e) =>
                    handleRoleChange(index, "course", e.target.value)
                  }
                  required
                />
                <Input
                  placeholder="Role"
                  value={role.role}
                  onChange={(e) =>
                    handleRoleChange(index, "role", e.target.value)
                  }
                  required
                />
                <Button warning onClick={(e) => removeRoles(e, index)}>
                  Remove
                </Button>
              </div>
            </FieldGroup>
          ))}
          <Button type="button" onClick={handleAddRole}>
            Add Another Role
          </Button>
        </FormGroupWrapper>

        {/* Skills Section */}
        <FormGroupWrapper>
          <h2>Skills</h2>
          <FieldGroup>
            <div>
              <Input
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddSkill())
                }
              />
              <Button type="button" onClick={handleAddSkill}>
                +
              </Button>
            </div>
            <div style={{ display: "flex" }}>
              {skills.map((skill, idx) => (
                <ListItem key={idx}>
                  {skill}&nbsp;&nbsp;
                  <Button
                    style={{ padding: "5px" }}
                    warning
                    onClick={(e) => {
                      e.preventDefault();
                      setSkills((sk) => sk.filter((_, i) => i !== idx));
                    }}
                  >
                    x
                  </Button>
                </ListItem>
              ))}
            </div>
          </FieldGroup>
        </FormGroupWrapper>

        {/* Academic Credentials Section */}
        <FormGroupWrapper>
          <h2>Academic Credentials</h2>
          {credentials.map((cred, index) => (
            <FieldGroup key={index}>
              <div>
                <Input
                  placeholder="Degree"
                  value={cred.degree}
                  onChange={(e) =>
                    handleCredentialChange(index, "degree", e.target.value)
                  }
                  required
                />
                <Input
                  placeholder="Institution"
                  value={cred.institution}
                  onChange={(e) =>
                    handleCredentialChange(index, "institution", e.target.value)
                  }
                  required
                />
                <Input
                  type="number"
                  placeholder="Year"
                  min="1900"
                  max={new Date().getFullYear() + 5}
                  value={cred.year || ""}
                  onChange={(e) =>
                    handleCredentialChange(index, "year", e.target.value)
                  }
                  required
                />
                <Button warning onClick={(e) => removeCredentials(e, index)}>
                  Remove
                </Button>
              </div>
            </FieldGroup>
          ))}
          <Button type="button" onClick={handleAddCredential}>
            Add Another Credential
          </Button>
        </FormGroupWrapper>

        {/* Error Display */}
        {error && <ErrorMessage message={error} />}

        {/* Submit Button */}
        <SubmitButton name="apply" type="submit">
          Apply
        </SubmitButton>
      </form>

      {/* Available Courses List */}
      <CurrentSemesterCourses>
        <h3>Available Courses</h3>
        <CoursesList>
          {courses.map((course) => (
            <li key={course.id}>
              <strong>{course.code}</strong> - {course.name}
            </li>
          ))}
        </CoursesList>
      </CurrentSemesterCourses>

      {/* Success Popup */}
      <Popup
        isOpen={isPopupOpen}
        message={popupMessage}
        setIsOpen={setIsPopupOpen}
      />
    </div>
  );
};

export default CandidateApplication;
