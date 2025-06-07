import React, { useState, useEffect } from "react";

// import CandidateApplication from "./CandidateApplication";
// import { Popup } from "../../components/Popup";

import { Dashboard } from "./Dashboard";
import { MainPageWrapper } from "./element";
import { NavBar } from "./NavBar";

export type CandidateTabType = "apply" | "profile" | "roles";

/**
 * Dashboard view for candidates with navigation and user info.
 *
 * @param currentUser - Currently logged in user (null if not authenticated)
 * @param navigateTo - Function to navigate between dashboard pages
 */

const MainPage = ({ isSuccessLogin = false }: { isSuccessLogin?: boolean }) => {
  //   const [candidateProfile, setCandidateProfile] = useState<Candidate | null>(
  //     null
  //   );
  //   const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [openPopup, setOpenpopup] = useState(isSuccessLogin);

  //   useEffect(() => {
  //     if (currentUser && currentUser.candidate) {
  //       // const newCandidate = currentUser.candidate;
  //       // newCandidate.user = omit(currentUser, ["candidate"]);
  //       setCandidateProfile(currentUser.candidate);
  //     }
  //   }, [currentUser]);

  const handleApplyForRole = (
    courseId: string,
    role: "tutor" | "lab-assistant"
  ) => {};

  //   const updateProfile = (updatedProfile: Partial<Candidate>) => {
  //     // update candidate profile
  //     if (candidateProfile) {
  //       setCandidateProfile({ ...candidateProfile, ...updatedProfile });
  //       // updateCandidate({ ...candidateProfile, ...updatedProfile });
  //     }
  //   };

  return (
    <MainPageWrapper>
      <Dashboard />
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === "lecturer" && <div>Lecture</div>}

        {activeTab === "candidate" && <div>candidate</div>}

        {activeTab === "course" && <div>Courses</div>}
        {activeTab === "report" && <div>Reports</div>}
      </main>
      {/* <Popup
        message={"Welcome to the Teach Team"}
        isOpen={openPopup}
        setIsOpen={setOpenpopup}
      /> */}
    </MainPageWrapper>
  );
};

export default MainPage;
