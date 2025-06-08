import { useState } from "react";
import { Page } from "../App"; // Enum or type representing page routes

import { LogoutButton } from "./Buttons/LogoutButton"; // Reusable logout button
import { DashboardRightSide, DashboardWrapper } from "./element"; // Styled layout components
import Avatar, { genConfig } from "react-nice-avatar"; // Avatar renderer and generator
import { AvatarConfigProps } from "./Avatar/avatarConfig"; // Type defining avatar configuration

/**
 * Dashboard component that displays a header and provides navigation functionality.
 *
 * @param {string} header - The title/text to display in the dashboard header
 * @param {(page: Page) => void} navigateTo - Callback function for navigating to different pages
 * @param {AvatarConfigProps} avatarConfig - Configuration for the user's avatar appearance
 * @returns {JSX.Element} The Dashboard component UI
 */
export const Dashboard = ({
  header,
  navigateTo,
  avatarConfig,
}: {
  header: string; // Text shown at top of dashboard
  navigateTo: (page: Page) => void; // Function to navigate between pages
  avatarConfig: AvatarConfigProps; // Avatar style settings passed from user state
}) => {
  // Logout function clears local storage and returns to landing page
  const onLogout = () => {
    localStorage.clear();
    navigateTo("landing");
  };

  // State to hold generated avatar config using `react-nice-avatar`
  const [generatedConfig, setX] = useState(genConfig(avatarConfig));

  return (
    <DashboardWrapper>
      <div>
        <h1>{header}</h1> {/* Dashboard header/title */}
      </div>

      <DashboardRightSide>
        {/* Logout button */}
        <LogoutButton
          onClick={() => {
            onLogout();
          }}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        {/* Avatar display section */}
        <div>
          {/* Render generated avatar */}
          <Avatar
            style={{ width: "60px", height: "60px" }}
            {...generatedConfig}
          />

          {/* Render a styled background to visualize avatar config props */}
          <div
            className={`avatar ${avatarConfig.shape}`}
            style={{
              backgroundColor: avatarConfig.bgColor, // Avatar background
              backgroundImage: avatarConfig.isGradient
                ? `linear-gradient(45deg, ${avatarConfig.bgColor}, #FFFFFF)` // Optional gradient
                : undefined,
            }}
          />
        </div>
      </DashboardRightSide>
    </DashboardWrapper>
  );
};
