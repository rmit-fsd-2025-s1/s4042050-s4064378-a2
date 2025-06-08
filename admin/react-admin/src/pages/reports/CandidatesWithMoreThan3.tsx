import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CANDIDATES_WITH_MORE_THAN_3_COURSES } from "../../graphql/queiris";
import "./CandidatesWithMoreThan3Courses.css"; // External CSS file for styling

// React functional component to render report of candidates accepted into more than 3 courses
const CandidatesWithMoreThan3Courses: React.FC = () => {
  // Run the GraphQL query to fetch candidates with >3 accepted courses
  const { data, loading, error } = useQuery(GET_CANDIDATES_WITH_MORE_THAN_3_COURSES, {
    fetchPolicy: "no-cache", // Always fetch fresh data (avoid cache)
  });

  // Display loading message while waiting for response
  if (loading) return <p>Loading report...</p>;

  // Display error message if the query fails
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="report-container">
      {/* Report title */}
      <h2 className="report-heading">Candidates with More Than 3 Accepted Courses</h2>

      {/* Loop through each candidate and render their data */}
      {data.candidatesWithMoreThan3Courses.map((candidate: any) => (
        <div key={candidate.email} className="candidate-section">
          {/* Candidate name and email */}
          <h3 className="candidate-title">
            {candidate.name} <span style={{ fontWeight: "normal" }}>({candidate.email})</span>
          </h3>

          {/* Table listing courses where this candidate was accepted */}
          <table className="report-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Role</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {/* Render one row per accepted course for the candidate */}
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
