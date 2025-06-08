// src/pages/Reports/UnselectedCandidates.tsx
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_UNSELECTED_CANDIDATES } from "../../graphql/queiris";

const UnselectedCandidates: React.FC = () => {
  const { data, loading, error } = useQuery(GET_UNSELECTED_CANDIDATES, {
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>Loading report...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Unselected Candidates</h2>

      {data.unselectedCandidates.map((candidate: any) => (
        <div key={candidate.id} style={{ marginBottom: "2rem" }}>
          <h3>
            {candidate.name} ({candidate.email})
          </h3>

          <table
            border={1}
            cellPadding={8}
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th>Course Name</th>
                <th>Role</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {candidate.applications.map((app: any, idx: number) => (
                <tr key={idx}>
                  <td>{app.courseName}</td>
                  <td>{app.role}</td>
                  <td>{app.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default UnselectedCandidates;
