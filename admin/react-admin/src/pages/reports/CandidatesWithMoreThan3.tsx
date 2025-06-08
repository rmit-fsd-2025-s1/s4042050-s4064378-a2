// src/pages/Reports/CandidatesWithMoreThan3Courses.tsx
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CANDIDATES_WITH_MORE_THAN_3_COURSES } from "../../graphql/queiris";

const CandidatesWithMoreThan3Courses: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CANDIDATES_WITH_MORE_THAN_3_COURSES);

  if (loading) return <p>Loading report...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Candidates with More Than 3 Accepted Courses</h2>
      {data.candidatesWithMoreThan3Courses.map((candidate: any) => (
        <div key={candidate.email} style={{ marginBottom: "2rem" }}>
          <h3>{candidate.name} ({candidate.email})</h3>
          <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th>Course Name</th>
                <th>Role</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {candidate.courses.map((c: any, index: number) => (
                <tr key={`${candidate.email}-${c.courseName}-${index}`}>
                  <td>{c.courseName}</td>
                  <td>{c.role}</td>
                  <td>{c.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CandidatesWithMoreThan3Courses;
