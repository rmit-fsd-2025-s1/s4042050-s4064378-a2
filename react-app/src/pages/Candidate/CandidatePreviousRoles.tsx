// src/components/PreviousRoles.tsx
import React, { useState } from "react";
import { Course } from "../../types/Course";
import { PreviousRolesHeading, RolesTable } from "./element";
// import { getAllCourses } from "../../util/getAllCourses";

/**
 * Displays a candidate's previous teaching roles and positions.
 *
 * @param roles - Array of the candidate's previous roles and their details
 */
// interface PreviousRolesProps {
//   roles: CandidateRole[];
// }

const PreviousRoles: React.FC<any> = ({ roles }) => {
  const [allCourse, setAllCourse] = useState<Course[]>([]);

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
            {roles.map((role: { courseId: string; role: string }) => {
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
                  <td>
                    {role.role === "candidate" ? "Candidate" : "Lab Assistant"}
                  </td>
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
