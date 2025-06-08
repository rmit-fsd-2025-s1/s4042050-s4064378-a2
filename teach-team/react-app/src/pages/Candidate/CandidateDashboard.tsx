import React, { useState, useEffect } from "react";
import { Candidate } from "../../types/Candidate";
import { Course } from "../../types/Course";
import PreviousRoles from "./CandidateAppliedRoles";
import ProfileInformation from "./ProfileInformation";
import { CandidateDashboardWrapper } from "./element";
import { Dashboard } from "../../components/DashBoard";
import { User } from "../../types/User";

import { Page } from "../../App";
import { NavBar } from "./NavBar";
import CandidateApplication from "./CandidateApplication";
import { Popup } from "../../components/Popup";
import { omit } from "lodash";
import { DEFAULT_AVATAR_CONFIG } from "../../components/Avatar/avatarConfig";

// Define the types of tabs available in the candidate dashboard
export type CandidateTabType = "apply" | "profile" | "roles";

/**
 * Dashboard view for candidates with navigation and user info.
 *
 * @param currentUser - Currently logged in user (null if not authenticated)
 * @param navigateTo - Function to navigate between dashboard pages
 * @param isSuccessLogin - Flag to indicate if login was successful (shows welcome popup)
 */
const CandidateDashboard = ({
  currentUser,
  navigateTo,
  isSuccessLogin = false,
}: {
  currentUser: User | null;
  navigateTo: (page: Page) => void;
  isSuccessLogin?: boolean;
}) => {
  // State for storing candidate profile data
  const [candidateProfile, setCandidateProfile] = useState<Candidate | null>(
    null
  );
  // State for storing courses (currently unused in the component)
  const [courses, setCourses] = useState<Course[]>([]);
  // State for tracking the active tab
  const [activeTab, setActiveTab] = useState<CandidateTabType>("profile");
  // State for controlling the welcome popup visibility
  const [openPopup, setOpenpopup] = useState(isSuccessLogin);

  // Effect to initialize candidate profile when currentUser changes
  useEffect(() => {
    if (currentUser && currentUser.candidate) {
      // const newCandidate = currentUser.candidate;
      // newCandidate.user = omit(currentUser, ["candidate"]);
      setCandidateProfile(currentUser.candidate);
    }
  }, [currentUser]);

  /**
   * Updates the candidate profile with new data
   * @param updatedProfile - Partial candidate object with updated fields
   */
  const updateProfile = (updatedProfile: Partial<Candidate>) => {
    // update candidate profile
    if (candidateProfile) {
      setCandidateProfile({ ...candidateProfile, ...updatedProfile });
      // updateCandidate({ ...candidateProfile, ...updatedProfile });
    }
  };

  return (
    <CandidateDashboardWrapper>
      {/* Main dashboard component with header and navigation */}
      <Dashboard
        header="Candidate Dashboard"
        navigateTo={navigateTo}
        avatarConfig={currentUser?.avatarConfig || DEFAULT_AVATAR_CONFIG}
      />
      {/* Navigation bar for switching between tabs */}
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {/* Application tab content */}
        {activeTab === "apply" && <CandidateApplication />}

        {/* Roles tab content - shows previous applications */}
        {activeTab === "roles" && candidateProfile && (
          <PreviousRoles roles={[]} />
        )}

        {/* Profile tab content - shows and allows editing profile information */}
        {activeTab === "profile" && currentUser && currentUser.candidate && (
          <ProfileInformation
            currentUser={currentUser}
            onUpdate={updateProfile}
          />
        )}
      </main>
      {/* Welcome popup shown after successful login */}
      <Popup
        message={"Welcome to the Teach Team"}
        isOpen={openPopup}
        setIsOpen={setOpenpopup}
      />
    </CandidateDashboardWrapper>
  );
};

export default CandidateDashboard;
