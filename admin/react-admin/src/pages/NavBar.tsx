import React from "react";
import { useNavigate } from "react-router-dom";

export const NavBar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        {/* <li>
          <button
            className={activeTab === "lecturer" ? "active" : ""}
            onClick={() => setActiveTab("lecturer")}
          >
            Lecturers
          </button>
        </li> */}
        <li>
          <button
            className={activeTab === "candidate" ? "active" : ""}
            onClick={() => setActiveTab("candidate")}
          >
            Candidates
          </button>
        </li>
        <li>
          <button
            className={activeTab === "course" ? "active" : ""}
            onClick={() => setActiveTab("course")}
          >
            Courses
          </button>
        </li>
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
