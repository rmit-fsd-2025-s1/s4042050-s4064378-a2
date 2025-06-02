import { useState } from "react";
import { Page } from "../App";
// import { setCurrentUserToLocalStorage } from "../util/localStorage";
import { LogoutButton } from "./Buttons/LogoutButton";
import { DashboardRightSide, DashboardWrapper } from "./element";
import Avatar, { genConfig } from "react-nice-avatar";
import { AvatarConfigProps } from "./Avatar/avatarConfig";

/**
 * Dashboard component that displays a header and provides navigation functionality.
 *
 * @param {string} header - The title/text to display in the dashboard header
 * @param {(page: Page) => void} navigateTo - Callback function for navigating to different pages
 * @returns {JSX.Element} The Dashboard component UI
 */

export const Dashboard = ({
  header,
  navigateTo,
  avatarConfig,
}: {
  header: string;
  navigateTo: (page: Page) => void;
  avatarConfig: AvatarConfigProps;
}) => {
  const onLogout = () => {
    // setCurrentUserToLocalStorage(null);
    navigateTo("login");
  };
  const [generatedConfig, setX] = useState(genConfig(avatarConfig));

  return (
    <DashboardWrapper>
      <div>
        <h1>{header}</h1>
      </div>
      <DashboardRightSide>
        <LogoutButton
          onClick={() => {
            onLogout();
          }}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div>
          <Avatar
            style={{ width: "60px", height: "60px" }}
            {...generatedConfig}
          />

          <div
            className={`avatar ${avatarConfig.shape}`}
            style={{
              backgroundColor: avatarConfig.bgColor,
              backgroundImage: avatarConfig.isGradient
                ? `linear-gradient(45deg, ${avatarConfig.bgColor}, #FFFFFF)`
                : undefined,
            }}
          />
        </div>
      </DashboardRightSide>
    </DashboardWrapper>
  );
};
