// src/pages/Reports/ReportsPage.tsx
import React, { useState } from "react";
import CandidatesByCourse from "./CandidatesByCourse";
import CandidatesWithMoreThan3 from "./CandidatesWithMoreThan3";
import UnselectedCandidates from "./UnselectedCandidates";

const ReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState("byCourse");

  const renderReport = () => {
    switch (selectedReport) {
      case "byCourse":
        return <CandidatesByCourse />;
      case "moreThan3":
        return <CandidatesWithMoreThan3 />;
      case "unselected":
        return <UnselectedCandidates />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Reports</h2>
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

      {renderReport()}
    </div>
  );
};

export default ReportsPage;
