import React, { useEffect, useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { User } from "./types/User";
import { App } from "./elements";
import { RegisterPage } from "./pages/RegisterPage";
import CandidateDashboard from "./pages/Candidate/CandidateDashboard";
// import {
//   getCurrentPage,
//   getCurrentUser,
//   setCurrentPageToLocalStorage,
//   setCurrentUserToLocalStorage,
// } from "./util/localStorage";

export type Page = "login" | "register" | "candidate" | "lecturer";

const TechTeam = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<
    boolean | undefined
  >(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    // setCurrentPageToLocalStorage(page);
  };

  const setUser = (user: User) => {
    // setCurrentUserToLocalStorage(user);
    setCurrentUser(user);
  };

  // useEffect(() => {
  //   if (!currentUser) {
  //     const user = getCurrentUser();

  //     if (user) {
  //       setCurrentUser(() => user);
  //     }
  //   }

  //   console.log(currentPage, currentUser);
  //   if (!currentPage) {
  //     const page = getCurrentPage();
  //     if (page) {
  //       setCurrentPage(page);
  //     }
  //   }
  // }, [currentPage, currentUser]);

  // useEffect(() => {
  //   addMockDataToLocalStorage();
  // }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return (
          <LoginPage
            setCurrentUser={setUser}
            navigateTo={navigateTo}
            registrationSuccess={registrationSuccess}
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
          />
        );
      // case "lecturer":
      //   return <LecturerPage
      //           navigateTo={navigateTo} />;
      default:
        return (
          <LoginPage
            setCurrentUser={setUser}
            navigateTo={navigateTo}
            registrationSuccess={registrationSuccess}
            setRegistrationSuccess={setRegistrationSuccess}
          />
        );
    }
  };

  return <App>{renderPage()}</App>;
};

export default TechTeam;
