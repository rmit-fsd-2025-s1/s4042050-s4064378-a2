import React, { useState, useEffect } from "react";

// Component imports
import { Dashboard } from "./Dashboard";
import { MainPageWrapper } from "./element";
import { NavBar } from "./NavBar";
import CandidateTable from "./CandidateTable";
import ReportsPage from "./reports/ReportsPage";
import { CourseList } from "./CourseList";
import { useNavigate } from "react-router-dom";

// Type definition for candidate tab options
export type CandidateTabType = "apply" | "profile" | "roles";

/**
 * MainPage component - The primary layout container for the application after login.
 *
 * @param isSuccessLogin - Optional boolean flag indicating successful login (default: false)
 *                       Used to control welcome popup display
 */
const MainPage = ({ isSuccessLogin = false }: { isSuccessLogin?: boolean }) => {
  // State for managing the currently active tab
  const [activeTab, setActiveTab] = useState<string>("candidate");

  // State for controlling the welcome popup visibility
  const [openPopup, setOpenpopup] = useState(isSuccessLogin);

  // Navigation hook for routing
  const navigate = useNavigate();

  // Effect to check authentication status on component mount
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") !== "true") {
      navigate("/"); // Redirect to root if not authenticated
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <MainPageWrapper>
      {/* Dashboard component - typically shows user info and quick stats */}
      <Dashboard />

      {/* Navigation bar for switching between main sections */}
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content area that changes based on active tab */}
      <main>
        {/* Candidate management view */}
        {activeTab === "candidate" && <CandidateTable />}

        {/* Course management view */}
        {activeTab === "course" && <CourseList />}

        {/* Reports view */}
        {activeTab === "report" && <ReportsPage />}
      </main>

      {/* Welcome popup (currently commented out) */}
      {/* <Popup
        message={"Welcome to the Teach Team"}
        isOpen={openPopup}
        setIsOpen={setOpenpopup}
      /> */}
    </MainPageWrapper>
  );
};

export default MainPage;
