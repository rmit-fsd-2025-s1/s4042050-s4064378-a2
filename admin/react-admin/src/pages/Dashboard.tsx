import { useEffect, useState } from "react";
// import { setCurrentUserToLocalStorage } from "../util/localStorage";
import {
  DashboardRightSide,
  DashboardWrapper,
  LogoutButtonWrapper,
} from "./element";
import { useNavigate } from "react-router-dom";

/**
 * Dashboard component that displays a header and provides navigation functionality.
 *
 * @param {string} header - The title/text to display in the dashboard header
 * @param {(page: Page) => void} navigateTo - Callback function for navigating to different pages
 * @returns {JSX.Element} The Dashboard component UI
 */

export const Dashboard = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <DashboardWrapper>
      <div>
        <h1>Admin Dashboard</h1>
      </div>
      <DashboardRightSide>
        <LogoutButton
          onClick={() => {
            onLogout();
          }}
        />
      </DashboardRightSide>
    </DashboardWrapper>
  );
};

const LogoutButton = ({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return <LogoutButtonWrapper {...props}>Log out</LogoutButtonWrapper>;
};
