// Import React and routing dependencies
import React from "react";
import { useNavigate } from "react-router-dom";

// NavBar component definition with TypeScript props
export const NavBar = ({
  activeTab, // Currently active tab
  setActiveTab, // Function to update active tab
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // Render navigation bar
  return (
    <nav>
      {/* Unordered list for navigation items */}
      <ul>
        {/* Candidates tab */}
        <li>
          <button
            // Apply 'active' class if this tab is currently selected
            className={activeTab === "candidate" ? "active" : ""}
            // Set this tab as active when clicked
            onClick={() => setActiveTab("candidate")}
          >
            Candidates
          </button>
        </li>

        {/* Courses tab */}
        <li>
          <button
            className={activeTab === "course" ? "active" : ""}
            onClick={() => setActiveTab("course")}
          >
            Courses
          </button>
        </li>

        {/* Reports tab */}
        <li>
          <button
            className={activeTab === "report" ? "active" : ""}
            onClick={() => {
              setActiveTab("report");
            }}
          >
            Reports
          </button>
        </li>
      </ul>
    </nav>
  );
};
