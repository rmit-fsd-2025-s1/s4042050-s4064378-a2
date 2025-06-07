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

export type Page = "login" | "register" | "candidate" | "lecturer" | "landing";

const TechTeam = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<
    boolean | undefined
  >(false);
  const [isSuccessLogin, setIsSuccessLogin] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setCurrentPageToLocalStorage(page);
  };

  const setUser = (user: User) => {
    setCurrentUserToLocalStorage(user);
    setCurrentUser(user);
  };

  useEffect(() => {
    if (!currentUser) {
      const user = getCurrentUser();

      if (user) {
        setCurrentUser(() => user);
      }
    }

    if (!currentPage) {
      const page = getCurrentPage();
      if (page) {
        if (page === "login" || page === "register") {
          setCurrentPage("landing");
        } else {
          setCurrentPage(page);
        }
      }
    }
  }, [currentPage, currentUser]);

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return (
          <>
            <LoginPage
              setCurrentUser={setUser}
              navigateTo={navigateTo}
              registrationSuccess={registrationSuccess}
              setIsSuccessLogin={setIsSuccessLogin}
              setRegistrationSuccess={setRegistrationSuccess}
            />
            <div>test</div>
          </>
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
        return <TeachTeamLanding navigateTo={navigateTo} />;
    }
  };

  return <App>{renderPage()}</App>;
};

export default TechTeam;
