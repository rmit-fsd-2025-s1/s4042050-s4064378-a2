// src/components/PreviousRoles.tsx
import React, { useState } from "react";
import { Course, TutorRole } from "../../types/Tutor";
import { PreviousRolesHeading, RolesTable } from "./element";
import { getAllCourses } from "../../util/getAllCourses";

/**
 * Displays a tutor's previous teaching roles and positions.
 *
 * @param roles - Array of the tutor's previous roles and their details
 */
interface PreviousRolesProps {
  roles: TutorRole[];
}

const PreviousRoles: React.FC<PreviousRolesProps> = ({ roles }) => {
  const [allCourse, setAllCourse] = useState<Course[]>(getAllCourses());

  return (
    <div className="previous-roles">
      <PreviousRolesHeading>Applied Roles</PreviousRolesHeading>

      {roles.length === 0 ? (
        <p>You haven't had any previous roles.</p>
      ) : (
        <RolesTable>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Semester</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => {
              const course = allCourse.find(
                (course) => course.id === role.courseId
              );
              if (!course) return <></>;

              return (
                <tr key={course.id}>
                  <td>{course?.code}</td>
                  <td>
                    {course!.name.charAt(0).toUpperCase() +
                      course!.name.slice(1)}
                  </td>
                  <td>{course?.semester}</td>
                  <td>{role.role === "tutor" ? "Tutor" : "Lab Assistant"}</td>
                </tr>
              );
            })}
          </tbody>
        </RolesTable>
      )}
    </div>
  );
};

export default PreviousRoles;
