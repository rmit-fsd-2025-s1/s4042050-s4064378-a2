import React from "react";
import { useQuery } from "@apollo/client";
import { GET_UNSELECTED_CANDIDATES } from "../../graphql/queiris";
import "./UnselectedCandidates.css";

const UnselectedCandidates: React.FC = () => {
  const { data, loading, error } = useQuery(GET_UNSELECTED_CANDIDATES, {
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>Loading report...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h2>Unselected Candidates</h2>

      {data.unselectedCandidates.map((candidate: any) => (
        <div key={candidate.id} className="section">
          <h3 className="candidate-header">
            {candidate.name} ({candidate.email})
          </h3>

          <table className="report-table">
            <thead>
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
