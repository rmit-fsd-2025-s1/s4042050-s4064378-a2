import React, { useState } from "react";
import "./CandidateTable.css";
import { useQuery } from "@apollo/client";
import { GET_ALL_CANDIDATES } from "../graphql/queiris";

// interface Candidate {
//   id: number;
//   name: string;
//   joinedDate: Date;
//   active: boolean;
// }

interface Candidate {
  id: number;
  name: string;
  joinedDate: string;
  active: boolean;
}

interface AllCandidatesResponse {
  allCandidates: {
    success: boolean;
    message: string;
    candidates: Candidate[];
  };
}

const CandidateTable: React.FC = () => {
  const { loading, error, data } =
    useQuery<AllCandidatesResponse>(GET_ALL_CANDIDATES);

  console.log(data);
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "John Doe",
      joinedDate: String(new Date("2023-10-15")),
      active: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      joinedDate: String(new Date("2023-09-20")),
      active: false,
    },
    {
      id: 3,
      name: "Bob Johnson",
      joinedDate: String(new Date("2023-11-05")),
      active: true,
    },
  ]);

  const toggleActiveStatus = (id: number): void => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id
          ? { ...candidate, active: !candidate.active }
          : candidate
      )
    );
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="candidate-table-container">
      <h2>Candidate Management</h2>
      <table className="candidate-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Joined Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate: Candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.name}</td>
              <td>{formatDate(new Date())}</td>
              <td>
                <span
                  className={`status-badge ${
                    candidate.active ? "active" : "inactive"
                  }`}
                >
                  {candidate.active ? "Active" : "Blocked"}
                </span>
              </td>
              <td>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={candidate.active}
                    onChange={() => toggleActiveStatus(candidate.id)}
                  />
                  <span className="slider"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;
