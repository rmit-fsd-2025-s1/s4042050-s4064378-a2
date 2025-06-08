import React, { useEffect, useState } from "react";
import "./CandidateTable.css";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_CANDIDATES,
  UPDATE_CANDIDATE_ACTIVE,
} from "../graphql/queiris";

interface Candidate {
  id: number;
  name: string;
  createdAt: string;
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
  const [updateStatus] = useMutation(UPDATE_CANDIDATE_ACTIVE);

  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    if (data) {
      setCandidates(data.allCandidates.candidates);
    }
  }, [data]);

  const toggleActiveStatus = async (candidate: Candidate) => {
    try {
      const result = await updateStatus({
        variables: {
          id: candidate.id,
          active: !candidate.active,
        },
      });
      setCandidates(result.data.updateCandidateActive.candidates);
    } catch (error) {
      console.error("Error updating status:", error);
    }
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
      <div style={{ maxHeight: "500px", overflow: "auto" }}>
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
                      onChange={() => toggleActiveStatus(candidate)}
                    />
                    <span className="slider"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateTable;
