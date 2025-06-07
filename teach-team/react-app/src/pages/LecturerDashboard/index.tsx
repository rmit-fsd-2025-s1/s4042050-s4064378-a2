import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tutor, TutorApplication } from "../../types/Tutor";
import TutorList from "./TutorListcom";
import SearchSortBar from "./SearchBar/index";
import SelectionSummaryContainer from "./SelectionSummery/SelectionSummaryContainer";
import { Page } from "./styles/Layout";
import { Dashboard } from "../../components/DashBoard";
import { getCurrentUser } from "../../util/localStorage";
import { DEFAULT_AVATAR_CONFIG } from "../../components/Avatar/avatarConfig";

// Optional: import your modal styles or use Material UI/Bootstrap if preferred

export const LecturerPage = ({
  navigateTo,
}: {
  navigateTo: (page: any) => void;
}) => {
  const [filteredTutorApps, setFilteredTutorApps] = useState<TutorApplication[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [viewMode, setViewMode] = useState("all");
  const [showSummary, setShowSummary] = useState(false); // NEW
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

  return (
    <Page>
      <Dashboard
        header={"Lecturer Dashboard"}
        navigateTo={navigateTo}
        avatarConfig={user?.avatarConfig || DEFAULT_AVATAR_CONFIG}
      />

      {/* NEW BUTTON TO OPEN POPUP */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button onClick={() => setShowSummary(true)}>View Selection Summary</button>
      </div>

      <SearchSortBar
        TutorApplicants={tutors}
        onFilteredchangedList={setFilteredTutorApps}
        onViewModeChange={setViewMode}
      />

      <TutorList tutors={filteredTutorApps} />

      {/* NEW MODAL/POPUP */}
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
            <SelectionSummaryContainer applicants={tutors} />
          </div>
        </div>
      )}
    </Page>
  );
};

// Basic Modal Styles (replace with your CSS/styled-components if needed)
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
