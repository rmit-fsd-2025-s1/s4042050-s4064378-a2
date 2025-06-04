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
 * Displays available courses and allows candidates to apply for positions.
 *
 * @param courses - List of available courses to apply for
 * @param onApply - Callback when applying to a course (returns course ID and role)
 * @param candidateProfile - Current candidate's profile data (null if not loaded)
 */

interface CandidateApplicationProps {
  courses: Course[];
  onApply: (courseId: string, role: "tutor" | "lab-assistant") => void;
  candidateProfile: Candidate | null;
}

const CandidateApplication: React.FC<CandidateApplicationProps> = ({
  // courses,
  onApply,
  candidateProfile,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedAvailavility, setSelectedAvailability] = useState<
    "part-time" | "full-time"
  >("part-time");
  const [error, setError] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter.name;

    if (submitter !== "apply") return;

    // input validation
    if (!selectedCourse) {
      setError("Please select a course");
      return;
    }

    let alreadyApplied = applications.some(
      (application) =>
        application.course.id === +selectedCourse &&
        application.role.id === +selectedRole
    );

    if (alreadyApplied) {
      setError("You have already applied for this role in the selected course");
      return;
    }

    try {
      const application = await applicationApi.create({
        availability: selectedAvailavility,
        credentials,
        previousRoles: previousRoles,
        status: "pending",
        role: roles.find((r) => r.id === +selectedRole),
        course: courses.find((c) => c.id === +selectedCourse),
        candidate: getCurrentUser()?.candidate,
        skills,
      });

      // Reset form
      setIsPopupOpen(true);
      setPopupMessage("Application Submitted Successfully!");
      setSelectedCourse("");
      setSelectedRole("");
      setPreviousRoles([]);
      setCredentials([]);
      setSkills([]);
      setError("");
    } catch (error) {
      setError(String(error));
    }
  };

  const fetchAllCourses = async () => {
    try {
      const coursesResult = await courseApi.getAllCourses();
      setCourses(coursesResult);
    } catch (error) {
      setError(String(error));
    }
  };

  const fetchAllRoles = async () => {
    try {
      const rolesResult = await rolesApi.getAll();
      setRoles(rolesResult);
    } catch (error) {
      setError(String(error));
    }
  };

  const fetchApplicationsByCandidateId = async () => {
    try {
      const applicationsResult =
        await applicationApi.getApplicationsByCandidateId(
          getCurrentUser()!.candidate!.id
        );

      console.log("applicationsResult", applicationsResult);
      setApplications(applicationsResult);
    } catch (error) {
      setError(String(error));
    }
  };

  const handleRoleChange = (index: number, field: string, value: string) => {
    const updated = [...previousRoles];
    updated[index][field as keyof (typeof updated)[0]] = value;
    setPreviousRoles(updated);
  };

  const handleAddRole = () => {
    setPreviousRoles([...previousRoles, { course: "", role: "" }]);
  };

  const removeRoles = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    setPreviousRoles((prevRoles) => prevRoles.filter((val, i) => i !== index));
  };

  const removeCredentials = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    setCredentials((prev) => prev.filter((val, i) => i !== index));
  };

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

  const handleCredentialChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...credentials];
    updated[index][field as keyof (typeof updated)[0]] = value;
    setCredentials(updated);
  };

  const handleAddCredential = () => {
    setCredentials([...credentials, { degree: "", institution: "", year: "" }]);
  };

  useEffect(() => {
    fetchAllCourses();
    fetchAllRoles();
    fetchApplicationsByCandidateId();
  }, []);

  return (
    <div>
      <CandidateApplicationHeading>
        Apply for Tutor/Lab Assistant Roles
      </CandidateApplicationHeading>
      <CandidateApplicationSubHeading>
        Select from available courses for the current semester
      </CandidateApplicationSubHeading>

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
              <option key={course.id} value={course.id}>
                {course.code} -{" "}
                {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
              </option>
            ))}
          </select>
        </FormGroupWrapper>

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
                      setSkills((sk) => sk.filter((s, i) => i !== idx));
                    }}
                  >
                    x
                  </Button>
                </ListItem>
              ))}
            </div>
          </FieldGroup>
        </FormGroupWrapper>

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
                  max={new Date().getFullYear() + 5} // Allows some future years
                  value={cred.year || ""} // Handles undefined/null cases
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

        {error && <ErrorMessage message={error} />}

        <SubmitButton name="apply" type="submit">
          Apply
        </SubmitButton>
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

export default CandidateApplication;
