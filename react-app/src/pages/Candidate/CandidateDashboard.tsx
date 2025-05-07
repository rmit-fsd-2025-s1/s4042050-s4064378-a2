import React, { useState, useEffect } from "react";
import { Course, Candidate, CandidateRole } from "../../types/Candidate";
import PreviousRoles from "./CandidatePreviousRoles";
import ProfileInformation from "./ProfileInformation";
import { CandidateDashboardWrapper } from "./element";
import { mockCourses } from "../../mockData/mockData";
import { Dashboard } from "../../components/DashBoard";
import { User } from "../../types/User";

import { Page } from "../../App";
import { NavBar } from "./NavBar";
import CandidateApplication from "./CandidateApplication";

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
}: {
  currentUser: User | null;
  navigateTo: (page: Page) => void;
}) => {
  const [candidateProfile, setCandidateProfile] = useState<Candidate | null>(
    null
  );
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<CandidateTabType>("profile");

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

  const handleApplyForRole = (
    courseId: string,
    role: "candidate" | "lab-assistant"
  ) => {
    // In a real application, this would be an API call
    console.log(`Applied for ${role} role in course ${courseId}`);

    // Update local state to show the application
    if (candidateProfile) {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        const newRole: CandidateRole = {
          courseId,
          status: "pending",
          rank: 0,
          role,
        };

        const updateProfile: Candidate = {
          ...candidateProfile,
          appliedRoles: candidateProfile.appliedRoles
            ? [...candidateProfile.appliedRoles, newRole]
            : [newRole],
        };

        setCandidateProfile(updateProfile);
        // updateCandidate(updateProfile);
      }
    }
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
      <Dashboard header="Candidate Dashboard" navigateTo={navigateTo} />
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === "apply" && (
          <CandidateApplication
            courses={courses}
            onApply={handleApplyForRole}
            candidateProfile={candidateProfile}
          />
        )}

        {activeTab === "roles" && candidateProfile && (
          <PreviousRoles roles={candidateProfile.appliedRoles || []} />
        )}

        {activeTab === "profile" && candidateProfile && (
          <ProfileInformation
            profile={candidateProfile}
            onUpdate={updateProfile}
          />
        )}
      </main>
    </CandidateDashboardWrapper>
  );
};

export default CandidateDashboard;
