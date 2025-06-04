// src/components/PreviousRoles.tsx
import React, { useEffect, useState } from "react";
import { Course } from "../../types/Course";
import { PreviousRolesHeading, RolesTable } from "./element";
import { getCurrentUser } from "../../util/localStorage";
import { applicationApi } from "../../services/applicationApi";
import { Application } from "../../types/Application";
import { ErrorMessage } from "../../components/ActivityStatus/ErrorMessage";
import { Role } from "../../types/Role";

const PreviousRoles: React.FC<any> = ({}) => {
  const [allCourse, setAllCourse] = useState<Course[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState<string>("");

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

  useEffect(() => {
    fetchApplicationsByCandidateId();
  }, []);

  return (
    <div className="previous-roles">
      <PreviousRolesHeading>Applied Roles</PreviousRolesHeading>

      {applications.length === 0 ? (
        <p>You haven't had any previous roles.</p>
      ) : (
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
              {applications.map((application) => {
                return (
                  <tr key={application.id}>
                    <td>{application.role.name}</td>
                    <td>{application.course?.code}</td>
                    <td>
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
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default PreviousRoles;
