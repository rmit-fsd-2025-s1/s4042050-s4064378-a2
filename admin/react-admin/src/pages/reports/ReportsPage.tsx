// src/pages/Reports/ReportsPage.tsx
import React, { useState } from "react";
import CandidatesByCourse from "./CandidatesByCourse"; // Report for candidates grouped by course
import CandidatesWithMoreThan3 from "./CandidatesWithMoreThan3"; // Report for candidates accepted into more than 3 courses
import UnselectedCandidates from "./UnselectedCandidates"; // Report for candidates not selected for any course

// React component to toggle and display different reports
const ReportsPage: React.FC = () => {
  // State to track which report is currently selected
  const [selectedReport, setSelectedReport] = useState("byCourse");

  // Function to render the appropriate report based on selectedReport
  const renderReport = () => {
    switch (selectedReport) {
      case "byCourse":
        return <CandidatesByCourse />;
      case "moreThan3":
        return <CandidatesWithMoreThan3 />;
      case "unselected":
        return <UnselectedCandidates />;
      default:
        return null; // Fallback if no valid report selected
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      {/* Page heading */}
      <h2>Reports</h2>

      {/* Buttons to select different report views */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setSelectedReport("byCourse")}
          style={{ marginRight: "1rem" }}
        >
          Candidates by Course
        </button>
        <button
          onClick={() => setSelectedReport("moreThan3")}
          style={{ marginRight: "1rem" }}
        >
          More Than 3 Courses
        </button>
        <button onClick={() => setSelectedReport("unselected")}>
          Unselected Candidates
        </button>
      </div>

      {/* Render the selected report */}
      {renderReport()}
    </div>
  );
};

export default ReportsPage;
