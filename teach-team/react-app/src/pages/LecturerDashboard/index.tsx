import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tutor, TutorApplication } from "../../types/Tutor";
import TutorList from "./TutorListcom";
import SearchSortBar from "./SearchBar/index";
import { Page } from "./styles/Layout";
import { Dashboard } from "../../components/DashBoard";
import { getCurrentUser } from "../../util/localStorage";
import { DEFAULT_AVATAR_CONFIG } from "../../components/Avatar/avatarConfig";
import { filterTutorsBySelectionType } from "../../util/tutorSelection";
import SelectionSummaryView from "./SelectionSummery/SelectionSummaryView";

/**
 * LecturerPage Component
 *
 * Architectural Note:
 * This component serves as the top-level container for the lecturer dashboard.
 * It is responsible for orchestrating data retrieval, processing, and delegation to visual components.
 * 
 * The code follows a container-presentational separation pattern:
 * - This component handles all data-fetching logic and state management.
 * - Child components like TutorList and SelectionSummaryView handle only visual representation.
 * 
 * This separation improves maintainability, allows easy testing of business logic,
 * and enables future expansion of the UI without modifying core logic.
 */

export const LecturerPage = ({ navigateTo }: { navigateTo: (page: any) => void }) => {
  const [filteredTutorApps, setFilteredTutorApps] = useState<TutorApplication[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [viewMode, setViewMode] = useState("all");
  const [showSummary, setShowSummary] = useState(false);
  const user = getCurrentUser();

  /**
   * Fetch tutor applications based on currently logged-in lecturer.
   * This function encapsulates the business logic of making API calls,
   * separated from any rendering logic.
   */
  const fetchTutors = async () => {
    try {
      const currentUser = getCurrentUser();
      const userId = currentUser?.id;

      if (!userId) {
        console.error("User ID not found in current user");
        return;
      }

      const res = await axios.get(`http://localhost:3001/teach_team/applications/by-lecturer/${userId}`);
      setTutors(res.data);
    } catch (error) {
      console.error("Error fetching tutor applications by user ID:", error);
    }
  };

  // Load tutor data once on component mount
  useEffect(() => {
    fetchTutors();
  }, []);

  /**
   * Group data for selection summary visualization.
   * This logic is computed at the container level and passed down to child components,
   * adhering to the single-responsibility principle.
   */
  const most = filterTutorsBySelectionType(tutors, "most");
  const least = filterTutorsBySelectionType(tutors, "least");
  const unselected = filterTutorsBySelectionType(tutors, "unselected");

  return (
    <Page>
      <Dashboard
        header={"Lecturer Dashboard"}
        navigateTo={navigateTo}
        avatarConfig={user?.avatarConfig || DEFAULT_AVATAR_CONFIG}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button onClick={() => setShowSummary(true)}>View Selection Summary</button>
      </div>

      <SearchSortBar
        TutorApplicants={tutors}
        onFilteredchangedList={setFilteredTutorApps}
        onViewModeChange={setViewMode}
      />

      {/* Pass down refresh function to child to allow re-fetching after updates */}
      <TutorList tutors={filteredTutorApps} refreshTutors={fetchTutors} />

      {/* Conditionally render modal for summary statistics */}
      {showSummary && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <button
              style={{ float: "right", background: "transparent", fontSize: "1.2rem" }}
              onClick={() => setShowSummary(false)}
            >
              ❌
            </button>
            <h2>Selection Summary</h2>
            <SelectionSummaryView most={most} least={least} unselected={unselected} />
          </div>
        </div>
      )}
    </Page>
  );
};

// UI-only modal styling - kept separate from component logic
const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "10px",
  maxWidth: "700px",
  width: "90%",
  maxHeight: "80vh",
  overflowY: "auto",
};
