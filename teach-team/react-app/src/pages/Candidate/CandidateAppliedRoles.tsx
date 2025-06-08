// src/components/PreviousRoles.tsx
import React, { useEffect, useState } from "react";
import { Course } from "../../types/Course";
import { PreviousRolesHeading, RolesTable } from "./element";
import { getCurrentUser } from "../../util/localStorage";
import { applicationApi } from "../../services/applicationApi";
import { Application } from "../../types/Application";
import { ErrorMessage } from "../../components/ActivityStatus/ErrorMessage";
import { Role } from "../../types/Role";

/**
 * PreviousRoles Component
 *
 * Displays a table of all roles previously applied for by the current candidate.
 * Shows course details, role name, and application status for each application.
 *
 * @component
 * @example
 * return <PreviousRoles />
 */
const PreviousRoles: React.FC<any> = ({}) => {
  // State management
  const [allCourse, setAllCourse] = useState<Course[]>([]); // Available courses (currently unused)
  const [applications, setApplications] = useState<Application[]>([]); // Candidate's applications
  const [error, setError] = useState<string>(""); // Error message state

  /**
   * Fetches all applications for the current candidate
   * @async
   * @function
   * @throws Will set error state if API call fails
   */
  const fetchApplicationsByCandidateId = async () => {
    try {
      const applicationsResult =
        await applicationApi.getApplicationsByCandidateId(
          getCurrentUser()!.candidate!.id
        );

      setApplications(applicationsResult);
    } catch (error) {
      setError(String(error));
    }
  };

  // Fetch applications on component mount
  useEffect(() => {
    fetchApplicationsByCandidateId();
  }, []);

  return (
    <div className="previous-roles">
      {/* Component heading */}
      <PreviousRolesHeading>Applied Roles</PreviousRolesHeading>

      {/* Conditional rendering based on applications */}
      {applications.length === 0 ? (
        // Empty state message
        <p>You haven't had any previous roles.</p>
      ) : (
        // Applications table
        <div>
          <RolesTable>
            <thead>
              <tr>
                <th>Role</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through each application to create table rows */}
              {applications.map((application) => {
                return (
                  <tr key={application.id}>
                    <td>{application.role.name}</td>
                    <td>{application.course?.code}</td>
                    <td>
                      {/* Format course name with capitalized first letter */}
                      {application.course!.name.charAt(0).toUpperCase() +
                        application.course!.name.slice(1)}
                    </td>
                    <td>{application.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </RolesTable>
        </div>
      )}
      {/* Error message display */}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default PreviousRoles;
