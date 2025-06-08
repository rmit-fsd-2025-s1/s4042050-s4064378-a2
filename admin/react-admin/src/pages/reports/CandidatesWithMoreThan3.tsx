import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CANDIDATES_WITH_MORE_THAN_3_COURSES } from "../../graphql/queiris";
import "./CandidatesWithMoreThan3Courses.css";

const CandidatesWithMoreThan3Courses: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CANDIDATES_WITH_MORE_THAN_3_COURSES, {
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>Loading report...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="report-container">
      <h2 className="report-heading">Candidates with More Than 3 Accepted Courses</h2>

      {data.candidatesWithMoreThan3Courses.map((candidate: any) => (
        <div key={candidate.email} className="candidate-section">
          <h3 className="candidate-title">
            {candidate.name} <span style={{ fontWeight: "normal" }}>({candidate.email})</span>
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
