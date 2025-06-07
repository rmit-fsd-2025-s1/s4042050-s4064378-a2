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

export const LecturerPage = ({ navigateTo }: { navigateTo: (page: any) => void }) => {
  const [filteredTutorApps, setFilteredTutorApps] = useState<TutorApplication[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [viewMode, setViewMode] = useState("all");
  const [showSummary, setShowSummary] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get("http://localhost:3001/teach_team/applications");
        setTutors(res.data);
      } catch (error) {
        console.error("Error fetching tutor applications:", error);
      }
    };

    fetchTutors();
  }, []);

  // Pre-process grouped data for visual summary (used in modal)
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

      <TutorList tutors={filteredTutorApps} />

      {/* Modal for Visual Summary */}
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

// Modal Styles
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
