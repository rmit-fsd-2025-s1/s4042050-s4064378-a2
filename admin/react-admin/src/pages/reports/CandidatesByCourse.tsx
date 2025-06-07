// src/pages/Reports/CandidatesByCourse.tsx
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CANDIDATES_BY_COURSE } from "../../graphql/queiris";

const CandidatesByCourse: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CANDIDATES_BY_COURSE);

  if (loading) return <p>Loading candidates...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Candidates by Course</h2>
      {data.candidatesByCourse.map((report: any) => (
        <div key={report.courseName} style={{ marginBottom: "2rem" }}>
          <h3>{report.courseName}</h3>
          <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {report.candidates.map((c: any) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.firstName}</td>
                  <td>{c.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CandidatesByCourse;
