// Import React hooks and necessary dependencies
import React, { useEffect, useState } from "react";
import "./styles.css";
import { useMutation, useQuery } from "@apollo/client";
// Import GraphQL queries and mutations
import {
  GET_ALL_CANDIDATES,
  UPDATE_CANDIDATE_ACTIVE,
} from "../graphql/queiris";

// Define TypeScript interfaces for type safety
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

// Main CandidateTable component
const CandidateTable: React.FC = () => {
  // Fetch all candidates using GraphQL query
  const { loading, error, data } =
    useQuery<AllCandidatesResponse>(GET_ALL_CANDIDATES);
  // Mutation for updating candidate active status
  const [updateStatus] = useMutation(UPDATE_CANDIDATE_ACTIVE);

  // Local state to store candidates
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  // Update local state when data is fetched
  useEffect(() => {
    if (data) {
      setCandidates(data.allCandidates.candidates);
    }
  }, [data]);

  // Function to toggle candidate active status
  const toggleActiveStatus = async (candidate: Candidate) => {
    try {
      // Execute the mutation with new status
      const result = await updateStatus({
        variables: {
          id: candidate.id,
          active: !candidate.active,
        },
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Helper function to format dates
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Render the component
  return (
    <div className="candidate-table-container">
      <h2>Candidate Management</h2>

      {/* Scrollable container for the table */}
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
            {/* Map through candidates to render table rows */}
            {candidates.map((candidate: Candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.id}</td>
                <td>{candidate.name}</td>
                {/* Display formatted date */}
                <td>{formatDate(new Date())}</td>
                <td>
                  {/* Status badge with dynamic class */}
                  <span
                    className={`status-badge ${
                      candidate.active ? "active" : "inactive"
                    }`}
                  >
                    {candidate.active ? "Active" : "Blocked"}
                  </span>
                </td>
                <td>
                  {/* Toggle switch for active/inactive status */}
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

// Export the component
export default CandidateTable;
