import React, { useEffect, useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { User } from "./types/User";
import { App } from "./elements";
import { RegisterPage } from "./pages/RegisterPage";
import { LecturerPage } from "./pages/LecturerDashboard";
import CandidateDashboard from "./pages/Candidate/CandidateDashboard";
import {
  getCurrentPage,
  getCurrentUser,
  setCurrentPageToLocalStorage,
  setCurrentUserToLocalStorage,
} from "./util/localStorage";
import { TeachTeamLanding } from "./pages/LandingPage";

// Define the possible page types in the application
export type Page = "login" | "register" | "candidate" | "lecturer" | "landing";

// Main component for the TechTeam application
const TechTeam = () => {
  // State for managing the current authenticated user
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // State for managing the current active page
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  // State to track if registration was successful
  const [registrationSuccess, setRegistrationSuccess] = useState<
    boolean | undefined
  >(false);
  // State to track if login was successful
  const [isSuccessLogin, setIsSuccessLogin] = useState(false);

  // Function to navigate between pages and persist the current page in localStorage
  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setCurrentPageToLocalStorage(page);
  };

  // Function to set the current user and persist it in localStorage
  const setUser = (user: User) => {
    setCurrentUserToLocalStorage(user);
    setCurrentUser(user);
  };

  // Effect hook to initialize user and page from localStorage when component mounts
  useEffect(() => {
    // Check if there's a user in localStorage and set it to state
    if (!currentUser) {
      const user = getCurrentUser();

      if (user) {
        setCurrentUser(() => user);
      }
    }

    // Check if there's a page in localStorage and set it to state
    if (!currentPage) {
      const page = getCurrentPage();
      if (page) {
        // Redirect login/register pages to landing page if found in localStorage
        if (page === "login" || page === "register") {
          setCurrentPage("landing");
        } else {
          setCurrentPage(page);
        }
      }
    }
  }, [currentPage, currentUser]);

  // Function to render the appropriate page component based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return (
          <LoginPage
            setCurrentUser={setUser}
            navigateTo={navigateTo}
            registrationSuccess={registrationSuccess}
            setIsSuccessLogin={setIsSuccessLogin}
            setRegistrationSuccess={setRegistrationSuccess}
          />
        );
      case "register":
        return (
          <RegisterPage
            navigateTo={navigateTo}
            setRegistrationSuccess={setRegistrationSuccess}
          />
        );
      case "candidate":
        return (
          <CandidateDashboard
            currentUser={currentUser}
            navigateTo={navigateTo}
            isSuccessLogin={isSuccessLogin}
          />
        );
      case "lecturer":
        return <LecturerPage navigateTo={navigateTo} />;
      case "landing":
        return <TeachTeamLanding navigateTo={navigateTo} />;
      default:
        // Default to landing page if no page is specified
        return <TeachTeamLanding navigateTo={navigateTo} />;
    }
  };

  // Render the application with the current page component
  return <App>{renderPage()}</App>;
};

export default TechTeam;
