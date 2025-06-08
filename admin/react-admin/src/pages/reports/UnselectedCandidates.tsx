import React from "react";
import { useQuery } from "@apollo/client";
import { GET_UNSELECTED_CANDIDATES } from "../../graphql/queiris";
import "./UnselectedCandidates.css"; // External stylesheet for styling

// Functional component to display candidates who were not selected for any role
const UnselectedCandidates: React.FC = () => {
  // Run GraphQL query to fetch unselected candidates
  const { data, loading, error } = useQuery(GET_UNSELECTED_CANDIDATES, {
    fetchPolicy: "no-cache", // Always get fresh data from server
  });

  // Show loading text while data is being fetched
  if (loading) return <p>Loading report...</p>;

  // Show error message if the query fails
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      {/* Report title */}
      <h2>Unselected Candidates</h2>

      {/* Iterate through each unselected candidate */}
      {data.unselectedCandidates.map((candidate: any) => (
        <div key={candidate.id} className="section">
          {/* Candidate name and email */}
          <h3 className="candidate-header">
            {candidate.name} ({candidate.email})
          </h3>

          {/* Table showing the courses the candidate applied for but was not selected */}
          <table className="report-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Role</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {/* Render each unselected application for the candidate */}
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
