import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CANDIDATES_BY_COURSE } from "../../graphql/queiris";
import "./CandidatesByCourse.css"; // External CSS for styling

// React functional component to display accepted candidates grouped by course
const CandidatesByCourse: React.FC = () => {
  // Apollo GraphQL query to fetch candidates grouped by course
  const { data, loading, error } = useQuery(GET_CANDIDATES_BY_COURSE, {
    fetchPolicy: "no-cache", // Ensures fresh data is fetched every time
  });

  // Display loading message while fetching data
  if (loading) return <p>Loading candidates...</p>;

  // Display error message if query fails
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      {/* Header */}
      <h2 style={{ marginBottom: "1.5rem" }}>Candidates by Course</h2>

      {/* Iterate over each course report */}
      {data.candidatesByCourse.map((report: any, index: number) => (
        <div className="course-section" key={`${report.courseName}-${index}`}>
          {/* Display course name */}
          <h3 className="course-title">{report.courseName}</h3>

          {/* Display the number of accepted candidates */}
          <p className="candidate-count">
            {report.candidates.length} candidate
            {report.candidates.length !== 1 ? "s" : ""} accepted
          </p>

          {/* Conditional rendering if no accepted candidates are found */}
          {report.candidates.length === 0 ? (
            <p>No accepted candidates for this course.</p>
          ) : (
            // Render table of accepted candidates
            <table className="candidate-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {/* Iterate over each candidate in the course */}
                {report.candidates.map((c: any, idx: number) => (
                  <tr key={`${c.id}-${c.role}-${idx}`}>
                    <td>{c.id}</td>
                    <td>{c.firstName}</td>
                    <td>{c.email}</td>
                    <td>{c.role}</td>
                    <td>{c.availability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default CandidatesByCourse;
