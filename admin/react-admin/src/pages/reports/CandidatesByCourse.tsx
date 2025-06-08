import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CANDIDATES_BY_COURSE } from "../../graphql/queiris";
import "./CandidatesByCourse.css";

const CandidatesByCourse: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CANDIDATES_BY_COURSE, {
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>Loading candidates...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: "1.5rem" }}>Candidates by Course</h2>

      {data.candidatesByCourse.map((report: any, index: number) => (
        <div className="course-section" key={`${report.courseName}-${index}`}>
          <h3 className="course-title">{report.courseName}</h3>
          <p className="candidate-count">
            {report.candidates.length} candidate{report.candidates.length !== 1 ? "s" : ""} accepted
          </p>

          {report.candidates.length === 0 ? (
            <p>No accepted candidates for this course.</p>
          ) : (
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
