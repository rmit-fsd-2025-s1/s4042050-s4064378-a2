import React, { useState, useEffect } from "react";
import { Candidate } from "../../types/Candidate";
import { Course } from "../../types/Course";
import PreviousRoles from "./CandidatePreviousRoles";
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

export type CandidateTabType = "apply" | "profile" | "roles";

/**
 * Dashboard view for candidates with navigation and user info.
 *
 * @param currentUser - Currently logged in user (null if not authenticated)
 * @param navigateTo - Function to navigate between dashboard pages
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
  const [candidateProfile, setCandidateProfile] = useState<Candidate | null>(
    null
  );
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<CandidateTabType>("profile");
  const [openPopup, setOpenpopup] = useState(isSuccessLogin);
  console.log(candidateProfile);

  // useEffect(() => {
  //   // Mock API call to fetch candidate profile
  //   const fetchCandidateProfile = async () => {
  //     if (currentUser) {
  //       let candidate: Candidate | null = getCandidateByEmail(currentUser.email);
  //       if (!candidate) {
  //         candidate = {
  //           ...currentUser,
  //           id: Date.now.toString(),
  //           availability: "part-time",
  //           skills: [],
  //           credentials: [],
  //           appliedRoles: [],
  //         };
  //         addCandidate(candidate);
  //       }
  //       setCandidateProfile(candidate);
  //     }
  //   };

  //   // Mock API call to fetch available courses
  //   const fetchCourses = async () => {
  //     // In a real application, this would be an API call
  //     setCourses(mockCourses);
  //   };

  //   fetchCandidateProfile();
  //   fetchCourses();
  // }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.candidate) {
      // const newCandidate = currentUser.candidate;
      // newCandidate.user = omit(currentUser, ["candidate"]);
      setCandidateProfile(currentUser.candidate);
    }
  }, [currentUser]);

  // const fetchCandidateData = async (user_id: number) => {
  //   try {
  //     const candidateData = await candidateApi.getCandidateByUserId(user_id);
  //     setCandidateProfile(candidateData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleApplyForRole = (
    courseId: string,
    role: "candidate" | "lab-assistant"
  ) => {
    // In a real application, this would be an API call
    console.log(`Applied for ${role} role in course ${courseId}`);

    // Update local state to show the application
    // if (candidateProfile) {
    //   const course = courses.find((c) => c.id === courseId);
    //   if (course) {
    //     const newRole: CandidateRole = {
    //       courseId,
    //       status: "pending",
    //       rank: 0,
    //       role,
    //     };

    //     // const updateProfile: Candidate = {
    //     //   ...candidateProfile,
    //     //   appliedRoles: candidateProfile.appliedRoles
    //     //     ? [...candidateProfile.appliedRoles, newRole]
    //     //     : [newRole],
    //     // };

    //     // setCandidateProfile(updateProfile);
    //     // updateCandidate(updateProfile);
    //   }
    // }
  };

  const updateProfile = (updatedProfile: Partial<Candidate>) => {
    // update candidate profile
    if (candidateProfile) {
      setCandidateProfile({ ...candidateProfile, ...updatedProfile });
      // updateCandidate({ ...candidateProfile, ...updatedProfile });
    }
  };

  return (
    <CandidateDashboardWrapper>
      <Dashboard
        header="Candidate Dashboard"
        navigateTo={navigateTo}
        avatarConfig={currentUser?.avatarConfig || DEFAULT_AVATAR_CONFIG}
      />
      {/* <NavBar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      <main>
        {currentUser && currentUser.candidate && (
          <ProfileInformation
            currentUser={currentUser}
            onUpdate={updateProfile}
          />
        )}
        {/* <PreviousRoles roles={[]} /> */}

        {/* {activeTab === "apply" && (
          <CandidateApplication
            courses={courses}
            onApply={handleApplyForRole}
            candidateProfile={candidateProfile}
          />
        )}

        {activeTab === "roles" && candidateProfile && (
          <PreviousRoles roles={[]} />
        )}

        {activeTab === "profile" && candidateProfile && (
          <ProfileInformation
            profile={candidateProfile}
            onUpdate={updateProfile}
          />
        )} */}
      </main>
      <Popup
        message={"Welcome to the Teach Team"}
        isOpen={openPopup}
        setIsOpen={setOpenpopup}
      />
    </CandidateDashboardWrapper>
  );
};

export default CandidateDashboard;
